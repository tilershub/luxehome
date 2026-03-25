interface Env {
  RESEND_API_KEY: string;
}

interface OrderItem {
  name: string;
  desc: string;
  price: number;
}

interface PayScheduleItem {
  label: string;
  pct: number;
  amount: number;
  desc: string;
}

interface OrderPayload {
  orderRef: string;
  orderDate: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  items: OrderItem[];
  total: number;
  paySchedule: PayScheduleItem[];
  paymentMethod?: 'payhere' | 'bank-transfer';
  paymentRef?: string | null;
}

function fmt(n: number): string {
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}

function buildCustomerEmail(o: OrderPayload): string {
  const itemRows = o.items.map(item => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e2da;">
        <div style="font-weight:600;color:#1e2820;font-size:14px;">${item.name}</div>
        <div style="color:#8c7b6e;font-size:12px;margin-top:3px;">${item.desc}</div>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e8e2da;text-align:right;font-weight:600;color:#1e2820;font-size:14px;white-space:nowrap;vertical-align:top;">
        ${fmt(item.price)}
      </td>
    </tr>
  `).join('');

  const scheduleRows = o.paySchedule.map((p, i) => `
    <tr style="${i === 0 ? 'background:#fdf6f0;' : ''}">
      <td style="padding:10px 14px;border-bottom:1px solid #e8e2da;">
        <div style="font-weight:${i === 0 ? '700' : '500'};color:${i === 0 ? '#3d4f42' : '#1e2820'};font-size:13px;">
          ${p.pct}% — ${p.label}${i === 0 ? '&nbsp; <span style="background:#3d4f42;color:#fff;font-size:10px;padding:2px 7px;border-radius:20px;letter-spacing:.06em;font-weight:700;">PAY NOW</span>' : ''}
        </div>
        <div style="color:#8c7b6e;font-size:11px;margin-top:3px;">${p.desc}</div>
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #e8e2da;text-align:right;font-weight:${i === 0 ? '700' : '600'};color:${i === 0 ? '#3d4f42' : '#1e2820'};font-size:13px;white-space:nowrap;vertical-align:top;">
        ${fmt(p.amount)}
      </td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>LUXEHOME Invoice — ${o.orderRef}</title>
</head>
<body style="margin:0;padding:20px 0;background:#f0ebe3;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">

    <!-- Header -->
    <div style="background:#1e2820;padding:32px 40px;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:#f5f0e8;letter-spacing:0.06em;">LUXEHOME</div>
      <div style="color:rgba(245,240,232,.45);font-size:11px;margin-top:5px;letter-spacing:.14em;text-transform:uppercase;">Bathroom Construction/Renovation — Invoice</div>
    </div>

    <!-- Order ref bar -->
    <div style="background:#3d4f42;padding:11px 40px;display:flex;justify-content:space-between;align-items:center;">
      <div style="color:#fff;font-size:14px;font-weight:700;letter-spacing:.04em;">${o.orderRef}</div>
      <div style="color:rgba(255,255,255,.8);font-size:12px;">${o.orderDate}</div>
    </div>

    <!-- Body -->
    <div style="padding:36px 40px;">

      <p style="margin:0 0 8px;color:#1e2820;font-size:16px;font-weight:600;">Dear ${o.name},</p>
      ${o.paymentMethod === 'payhere'
        ? `<p style="margin:0 0 12px;color:#5c5047;font-size:14px;line-height:1.75;">
              Thank you for your order with LUXEHOME. Your <strong style="color:#3d4f42;">10% advance payment has been received</strong> via PayHere — your booking is confirmed.
           </p>
           <div style="background:#f0fff0;border:1.5px solid #4caf50;border-radius:4px;padding:14px 20px;margin-bottom:24px;font-size:13px;color:#2e7d32;font-weight:600;">
             ✓ Payment confirmed — Reference: ${o.paymentRef || o.orderRef}
           </div>`
        : `<p style="margin:0 0 28px;color:#5c5047;font-size:14px;line-height:1.75;">
              Thank you for your order with LUXEHOME. Your order summary and invoice are below.
              To confirm your booking, please transfer the <strong style="color:#3d4f42;">10% deposit</strong> via bank transfer
              using the details in this email, then send payment proof to us.
           </p>`
      }

      <!-- Client details -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #e8e2da;border-radius:4px;overflow:hidden;">
        <tr style="background:#f5f0e8;">
          <td colspan="2" style="padding:9px 16px;font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#8c7b6e;">Your Details</td>
        </tr>
        <tr>
          <td style="padding:8px 16px;font-size:12px;color:#8c7b6e;width:130px;border-bottom:1px solid #f0ebe3;">Phone</td>
          <td style="padding:8px 16px;font-size:13px;color:#1e2820;font-weight:500;border-bottom:1px solid #f0ebe3;">${o.phone}</td>
        </tr>
        <tr>
          <td style="padding:8px 16px;font-size:12px;color:#8c7b6e;width:130px;">Location</td>
          <td style="padding:8px 16px;font-size:13px;color:#1e2820;font-weight:500;">${o.location}</td>
        </tr>
      </table>

      <!-- Order Summary -->
      <div style="font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#8c7b6e;margin-bottom:10px;">Order Summary</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;">
        ${itemRows}
        <tr>
          <td style="padding:14px 0 0;font-size:14px;font-weight:700;color:#1e2820;">Estimated Total</td>
          <td style="padding:14px 0 0;text-align:right;font-size:20px;font-weight:700;color:#3d4f42;">${fmt(o.total)}</td>
        </tr>
      </table>
      <p style="margin:4px 0 28px;font-size:11px;color:#b5a89a;line-height:1.5;">
        * Estimated cost — final price confirmed after site inspection.
      </p>

      <!-- Payment Schedule -->
      <div style="font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#8c7b6e;margin-bottom:10px;">Payment Schedule</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e2da;border-radius:4px;overflow:hidden;margin-bottom:28px;">
        ${scheduleRows}
      </table>

      <!-- Bank Transfer -->
      <div style="background:#1e2820;border-radius:6px;padding:26px;margin-bottom:28px;">
        <div style="font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#3d4f42;margin-bottom:16px;">Bank Transfer Details</div>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:6px 0;font-size:12px;color:rgba(245,240,232,.45);width:150px;">Bank</td>
            <td style="padding:6px 0;font-size:13px;color:#f5f0e8;font-weight:600;">Dialog Finance</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:rgba(245,240,232,.45);">Account Name</td>
            <td style="padding:6px 0;font-size:13px;color:#f5f0e8;font-weight:600;">LUXEHOME (Pvt) Ltd</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:rgba(245,240,232,.45);">Account Number</td>
            <td style="padding:6px 0;font-size:13px;color:#f5f0e8;font-weight:600;">001020003416</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-size:12px;color:rgba(245,240,232,.45);">Branch</td>
            <td style="padding:6px 0;font-size:13px;color:#f5f0e8;font-weight:600;">Head Office</td>
          </tr>
        </table>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.07);font-size:12px;color:rgba(245,240,232,.55);line-height:1.7;">
          After transferring the 10% deposit, send your payment proof to
          <strong style="color:#3d4f42;">luxehome@gmail.com</strong>
          or WhatsApp <strong style="color:#3d4f42;">+94 774 503 744</strong>
          with your order reference <strong style="color:#f5f0e8;">${o.orderRef}</strong>.
        </div>
      </div>

      <!-- Next Steps -->
      <div style="background:#f5f0e8;border-left:3px solid #3d4f42;padding:18px 22px;border-radius:0 4px 4px 0;margin-bottom:8px;">
        <div style="font-size:12px;font-weight:700;color:#1e2820;margin-bottom:8px;">What happens next?</div>
        <ol style="margin:0;padding-left:18px;font-size:13px;color:#5c5047;line-height:2;">
          <li>Transfer the 10% deposit (${fmt(o.paySchedule[0].amount)}) to the bank account above</li>
          <li>Send payment proof to <strong>luxehome@gmail.com</strong> or WhatsApp +94 774 503 744</li>
          <li>We confirm your booking and arrange a free site inspection</li>
          <li>Final price is agreed after the inspection — then we schedule a start date</li>
        </ol>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f5f0e8;padding:24px 40px;border-top:1px solid #e8e2da;text-align:center;">
      <div style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#1e2820;margin-bottom:5px;">LUXEHOME</div>
      <div style="font-size:12px;color:#8c7b6e;">luxehome.lk &nbsp;·&nbsp; +94 774 503 744 &nbsp;·&nbsp; luxehome@gmail.com</div>
      <div style="font-size:11px;color:#b5a89a;margin-top:6px;">Sri Lanka's trusted bathroom renovation specialists</div>
    </div>

  </div>
</body>
</html>`;
}

function buildAdminEmail(o: OrderPayload): string {
  const itemRows = o.items.map(item => `
    <tr>
      <td style="padding:9px 12px;border-bottom:1px solid #2e2e2e;font-size:13px;color:#e0e0e0;">${item.name}</td>
      <td style="padding:9px 12px;border-bottom:1px solid #2e2e2e;font-size:11px;color:#888;">${item.desc}</td>
      <td style="padding:9px 12px;border-bottom:1px solid #2e2e2e;font-size:13px;color:#3d4f42;text-align:right;font-weight:600;white-space:nowrap;">${fmt(item.price)}</td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>New Order ${o.orderRef}</title></head>
<body style="margin:0;padding:20px 0;background:#111;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#1e1e1e;border-radius:6px;overflow:hidden;">

    <!-- Header -->
    <div style="background:#3d4f42;padding:20px 32px;">
      <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:4px;">New Bathroom Construction/Renovation Order</div>
      <div style="font-size:20px;font-weight:700;color:#fff;">${o.orderRef}</div>
      <div style="font-size:12px;color:rgba(255,255,255,.7);margin-top:4px;">${o.orderDate}</div>
    </div>

    <div style="padding:28px 32px;">

      <!-- Customer -->
      <div style="margin-bottom:24px;">
        <div style="font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#666;margin-bottom:10px;">Customer Details</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2e2e2e;border-radius:4px;overflow:hidden;">
          <tr style="background:#252525;">
            <td style="padding:8px 14px;font-size:12px;color:#888;width:110px;border-bottom:1px solid #2e2e2e;">Name</td>
            <td style="padding:8px 14px;font-size:13px;color:#e0e0e0;font-weight:600;border-bottom:1px solid #2e2e2e;">${o.name}</td>
          </tr>
          <tr>
            <td style="padding:8px 14px;font-size:12px;color:#888;border-bottom:1px solid #2e2e2e;">Email</td>
            <td style="padding:8px 14px;font-size:13px;color:#3d4f42;border-bottom:1px solid #2e2e2e;">${o.email}</td>
          </tr>
          <tr style="background:#252525;">
            <td style="padding:8px 14px;font-size:12px;color:#888;border-bottom:1px solid #2e2e2e;">Phone</td>
            <td style="padding:8px 14px;font-size:13px;color:#e0e0e0;border-bottom:1px solid #2e2e2e;">${o.phone}</td>
          </tr>
          <tr>
            <td style="padding:8px 14px;font-size:12px;color:#888;">Location</td>
            <td style="padding:8px 14px;font-size:13px;color:#e0e0e0;">${o.location}</td>
          </tr>
        </table>
      </div>

      <!-- Order Items -->
      <div style="margin-bottom:24px;">
        <div style="font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#666;margin-bottom:10px;">Order Items</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2e2e2e;border-radius:4px;overflow:hidden;">
          ${itemRows}
          <tr style="background:#252525;">
            <td colspan="2" style="padding:12px 14px;font-size:14px;font-weight:700;color:#e0e0e0;">Estimated Total</td>
            <td style="padding:12px 14px;text-align:right;font-size:20px;font-weight:700;color:#3d4f42;white-space:nowrap;">${fmt(o.total)}</td>
          </tr>
        </table>
      </div>

      <!-- Deposit box -->
      <div style="background:#1e2820;border:1px solid ${o.paymentMethod === 'payhere' ? '#4caf50' : '#3d4f42'};border-radius:4px;padding:18px 22px;margin-bottom:20px;">
        <div style="font-size:10px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:${o.paymentMethod === 'payhere' ? '#4caf50' : '#3d4f42'};margin-bottom:6px;">
          ${o.paymentMethod === 'payhere' ? '✓ 10% DEPOSIT PAID ONLINE (PAYHERE)' : '10% Deposit Expected from Customer'}
        </div>
        <div style="font-size:26px;font-weight:700;color:#fff;margin-bottom:4px;">${fmt(o.paySchedule[0].amount)}</div>
        <div style="font-size:12px;color:#888;">
          ${o.paymentMethod === 'payhere'
            ? `Paid via PayHere · Ref: ${o.paymentRef || 'N/A'} · Booking is confirmed.`
            : 'Customer will bank transfer this amount to confirm the order. Watch for payment proof.'
          }
        </div>
      </div>

      <!-- Payment schedule -->
      <div style="font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#666;margin-bottom:10px;">Full Payment Schedule</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2e2e2e;border-radius:4px;overflow:hidden;">
        ${o.paySchedule.map((p, i) => `
          <tr style="${i === 0 ? 'background:#1e2820;' : i % 2 === 0 ? 'background:#252525;' : ''}">
            <td style="padding:9px 14px;font-size:12px;color:${i === 0 ? '#3d4f42' : '#888'};border-bottom:1px solid #2e2e2e;">${p.pct}% — ${p.label}</td>
            <td style="padding:9px 14px;font-size:12px;color:#666;border-bottom:1px solid #2e2e2e;">${p.desc}</td>
            <td style="padding:9px 14px;font-size:13px;font-weight:600;color:${i === 0 ? '#3d4f42' : '#e0e0e0'};text-align:right;border-bottom:1px solid #2e2e2e;white-space:nowrap;">${fmt(p.amount)}</td>
          </tr>
        `).join('')}
      </table>

    </div>

    <div style="padding:16px 32px;border-top:1px solid #2e2e2e;font-size:11px;color:#555;text-align:center;">
      LUXEHOME &nbsp;·&nbsp; luxehome.lk &nbsp;·&nbsp; Auto-generated order notification
    </div>

  </div>
</body>
</html>`;
}

export const onRequestOptions: PagesFunction = () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const data: OrderPayload = await context.request.json();

    // Basic validation
    if (!data.email || !data.name || !data.orderRef || !data.items?.length) {
      return new Response(JSON.stringify({ error: 'Invalid order data.' }), { status: 400, headers });
    }

    const key = context.env.RESEND_API_KEY;

    if (!key) {
      // Fallback: log the order and return success (for development / before API key is set)
      console.log('Order received (no RESEND_API_KEY set):', JSON.stringify(data, null, 2));
      return new Response(JSON.stringify({ success: true, note: 'Order logged. Add RESEND_API_KEY to send emails.' }), { status: 200, headers });
    }

    // Send customer invoice
    const customerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LUXEHOME <orders@luxehome.lk>',
        to: data.email,
        subject: `Your LUXEHOME Invoice — ${data.orderRef}`,
        html: buildCustomerEmail(data),
      }),
    });

    if (!customerRes.ok) {
      const errText = await customerRes.text();
      console.error('Resend customer email failed:', errText);
      return new Response(JSON.stringify({ error: 'Failed to send invoice. Please contact us directly.' }), { status: 500, headers });
    }

    // Send admin notification (non-blocking — don't fail the order if this fails)
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LUXEHOME Orders <orders@luxehome.lk>',
        to: 'luxehome@gmail.com',
        subject: `New Order ${data.orderRef} — ${data.name} — ${fmt(data.total)}`,
        html: buildAdminEmail(data),
      }),
    }).catch(e => console.error('Admin notification failed:', e));

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });

  } catch (err) {
    console.error('Order API error:', err);
    return new Response(JSON.stringify({ error: 'Internal error. Please try again or contact us on WhatsApp.' }), { status: 500, headers });
  }
};
