/**
 * PayHere server-to-server payment notification.
 * PayHere POSTs here after every payment event (success / failed / cancelled).
 * https://support.payhere.lk/api-&-mobile-sdk/payhere-checkout#3-server-notification
 */
interface Env {
  PAYHERE_MERCHANT_SECRET: string;
  RESEND_API_KEY?: string;
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const onRequestOptions: PagesFunction = () =>
  new Response(null, { status: 204, headers: CORS });

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body    = await context.request.text();
    const params  = new URLSearchParams(body);

    const merchantId     = params.get('merchant_id')   ?? '';
    const orderId        = params.get('order_id')       ?? '';
    const payhereAmount  = params.get('payhere_amount') ?? '';
    const payhereCurrency= params.get('payhere_currency')?? '';
    const statusCode     = params.get('status_code')    ?? '';
    const md5sig         = params.get('md5sig')         ?? '';

    const secret = context.env.PAYHERE_MERCHANT_SECRET ?? '';

    // Verify signature:  MD5(merchant_id + order_id + payhere_amount + payhere_currency + MD5(secret).toUpperCase()) == md5sig
    const secretHash = md5(secret).toUpperCase();
    const expected   = md5(merchantId + orderId + payhereAmount + payhereCurrency + secretHash);

    if (expected.toLowerCase() !== md5sig.toLowerCase()) {
      console.error('PayHere notify: signature mismatch', { orderId, expected, md5sig });
      return new Response('HASH_MISMATCH', { status: 400 });
    }

    // status_code: 2 = success, 0 = pending, -1 = cancelled, -2 = failed, -3 = chargedback
    const statusMap: Record<string, string> = { '-1':'cancelled', '-2':'failed', '-3':'chargedback', '0':'pending' };
    const status = statusCode === '2' ? 'success' : (statusMap[statusCode] ?? 'unknown');

    console.log('PayHere notify:', { orderId, status, payhereAmount, payhereCurrency });

    // Optionally send an admin alert for successful payments
    if (statusCode === '2' && context.env.RESEND_API_KEY) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'TILERSHUB Orders <orders@tilershub.lk>',
          to: 'tilershub@gmail.com',
          subject: `Payment Received — ${orderId} — ${payhereCurrency} ${payhereAmount}`,
          html: `<p>PayHere payment confirmed for order <strong>${orderId}</strong>.</p>
                 <p>Amount: <strong>${payhereCurrency} ${payhereAmount}</strong></p>
                 <p>Status: <strong>Success</strong></p>`,
        }),
      }).catch(e => console.error('PayHere notify email failed:', e));
    }

    return new Response('OK', { status: 200 });

  } catch (err) {
    console.error('payhere-notify error:', err);
    return new Response('ERROR', { status: 500 });
  }
};

/* ── Pure-JS MD5 (same as payhere-init.ts) ── */
function md5(input: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function rotL(n: number, s: number): number { return (n << s) | (n >>> (32 - s)); }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(rotL(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b ^ c ^ d,         a, b, x, s, t); }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(c ^ (b | ~d),      a, b, x, s, t); }

  const utf8 = unescape(encodeURIComponent(input));
  const bytes: number[] = [];
  for (let i = 0; i < utf8.length; i++) bytes.push(utf8.charCodeAt(i));

  const origLen = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  for (let i = 0; i < 8; i++) bytes.push((origLen >>> (i * 8)) & 0xff);

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;

  for (let o = 0; o < bytes.length; o += 64) {
    const M: number[] = [];
    for (let j = 0; j < 16; j++) {
      M[j] = bytes[o + j*4] | (bytes[o + j*4+1] << 8) | (bytes[o + j*4+2] << 16) | (bytes[o + j*4+3] << 24);
    }
    let [a, b, c, d] = [a0, b0, c0, d0];

    a=ff(a,b,c,d,M[0],7,-680876936);  d=ff(d,a,b,c,M[1],12,-389564586); c=ff(c,d,a,b,M[2],17,606105819);   b=ff(b,c,d,a,M[3],22,-1044525330);
    a=ff(a,b,c,d,M[4],7,-176418897);  d=ff(d,a,b,c,M[5],12,1200080426);  c=ff(c,d,a,b,M[6],17,-1473231341); b=ff(b,c,d,a,M[7],22,-45705983);
    a=ff(a,b,c,d,M[8],7,1770035416);  d=ff(d,a,b,c,M[9],12,-1958414417); c=ff(c,d,a,b,M[10],17,-42063);     b=ff(b,c,d,a,M[11],22,-1990404162);
    a=ff(a,b,c,d,M[12],7,1804603682); d=ff(d,a,b,c,M[13],12,-40341101);  c=ff(c,d,a,b,M[14],17,-1502002290);b=ff(b,c,d,a,M[15],22,1236535329);

    a=gg(a,b,c,d,M[1],5,-165796510);  d=gg(d,a,b,c,M[6],9,-1069501632);  c=gg(c,d,a,b,M[11],14,643717713);  b=gg(b,c,d,a,M[0],20,-373897302);
    a=gg(a,b,c,d,M[5],5,-701558691);  d=gg(d,a,b,c,M[10],9,38016083);    c=gg(c,d,a,b,M[15],14,-660478335); b=gg(b,c,d,a,M[4],20,-405537848);
    a=gg(a,b,c,d,M[9],5,568446438);   d=gg(d,a,b,c,M[14],9,-1019803690); c=gg(c,d,a,b,M[3],14,-187363961);  b=gg(b,c,d,a,M[8],20,1163531501);
    a=gg(a,b,c,d,M[13],5,-1444681467);d=gg(d,a,b,c,M[2],9,-51403784);    c=gg(c,d,a,b,M[7],14,1735328473);  b=gg(b,c,d,a,M[12],20,-1926607734);

    a=hh(a,b,c,d,M[5],4,-378558);     d=hh(d,a,b,c,M[8],11,-2022574463); c=hh(c,d,a,b,M[11],16,1839030562); b=hh(b,c,d,a,M[14],23,-35309556);
    a=hh(a,b,c,d,M[1],4,-1530992060); d=hh(d,a,b,c,M[4],11,1272893353);  c=hh(c,d,a,b,M[7],16,-155497632);  b=hh(b,c,d,a,M[10],23,-1094730640);
    a=hh(a,b,c,d,M[13],4,681279174);  d=hh(d,a,b,c,M[0],11,-358537222);  c=hh(c,d,a,b,M[3],16,-722521979);  b=hh(b,c,d,a,M[6],23,76029189);
    a=hh(a,b,c,d,M[9],4,-640364487);  d=hh(d,a,b,c,M[12],11,-421815835); c=hh(c,d,a,b,M[15],16,530742520);  b=hh(b,c,d,a,M[2],23,-995338651);

    a=ii(a,b,c,d,M[0],6,-198630844);  d=ii(d,a,b,c,M[7],10,1126891415);  c=ii(c,d,a,b,M[14],15,-1416354905);b=ii(b,c,d,a,M[5],21,-57434055);
    a=ii(a,b,c,d,M[12],6,1700485571); d=ii(d,a,b,c,M[3],10,-1894986606); c=ii(c,d,a,b,M[10],15,-1051523);   b=ii(b,c,d,a,M[1],21,-2054922799);
    a=ii(a,b,c,d,M[8],6,1873313359);  d=ii(d,a,b,c,M[15],10,-30611744);  c=ii(c,d,a,b,M[6],15,-1560198380); b=ii(b,c,d,a,M[13],21,1309151649);
    a=ii(a,b,c,d,M[4],6,-145523070);  d=ii(d,a,b,c,M[11],10,-1120210379);c=ii(c,d,a,b,M[2],15,718787259);   b=ii(b,c,d,a,M[9],21,-343485551);

    a0=safeAdd(a0,a); b0=safeAdd(b0,b); c0=safeAdd(c0,c); d0=safeAdd(d0,d);
  }

  const word2hex = (n: number) => {
    let s = '';
    for (let i = 0; i < 4; i++) s += ('0' + ((n >>> (i * 8)) & 0xff).toString(16)).slice(-2);
    return s;
  };
  return word2hex(a0) + word2hex(b0) + word2hex(c0) + word2hex(d0);
}
