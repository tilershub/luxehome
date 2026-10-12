import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';

// Exercise the real form handler with isolated DOM/database/analytics adapters.
// No real lead, WhatsApp message or analytics event is sent.
const source = readFileSync(new URL('../src/components/luxe/InspectionBookingForm.astro', import.meta.url), 'utf8');
const script = source.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/^\s*import .*;$/gm, '');
const js = ts.transpile(script, { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None });
function setup(insert, track = () => {}) {
  const elements = new Map();
  function element(id) {
    if (!elements.has(id)) elements.set(id, {
      hidden: id === 'inspection-success', disabled: id === 'inspection-submit', children: [], attrs: {},
      setAttribute(k,v) { this.attrs[k] = v; }, removeAttribute(k) { delete this.attrs[k]; },
      addEventListener(k,fn) { this[k] = fn; }, querySelectorAll() { return []; }, querySelector() { return null; },
      reportValidity() { return true; }, focus() {}, scrollIntoView() {},
    });
    return elements.get(id);
  }
  const data = { name: 'Test', phone: '+94770000000', location: 'Test town', bathroom_scope: 'One bathroom', budget_direction: 'Need budget guidance', project_timing: 'Within 1–3 months' };
  runInNewContext(js, {
    document: { getElementById: element },
    window: { location: { search: '', href: 'https://luxehome.lk/book-site-inspection' }, luxeTrack: track },
    FormData: class { get(k) { return data[k] ?? null; } },
    URLSearchParams, crypto: { randomUUID: () => 'isolated-test-event' },
    createClient: () => ({ from: () => ({ insert }) }), LUXE_SUPABASE_URL: '', LUXE_SUPABASE_KEY: '',
    fetch: async () => ({}), console: { error() {}, warn() {} },
  });
  return { element, submit: () => element('inspection-request-form').submit({ preventDefault() {} }) };
}
test('confirmed save stays visible when analytics throws', async () => {
  const ui = setup(async () => ({ error: null }), () => { throw new Error('blocked tracker'); });
  assert.equal(ui.element('inspection-submit').disabled, false);
  await ui.submit();
  assert.equal(ui.element('inspection-success').hidden, false);
  assert.equal(ui.element('inspection-request-form').hidden, true);
  assert.match(ui.element('inspection-whatsapp-backup').href, /^https:\/\/wa.me\/94774503744\?text=/);
});
test('double submission produces only one save while pending', async () => {
  let resolve, saves = 0;
  const ui = setup(() => { saves++; return new Promise(r => { resolve = r; }); });
  const pending = ui.submit();
  await ui.submit();
  assert.equal(saves, 1);
  resolve({ error: null });
  await pending;
});
test('failed save keeps enquiry editable and permits retry without tracking a lead', async () => {
  let tracked = 0;
  const ui = setup(async () => ({ error: new Error('offline') }), () => { tracked++; });
  await ui.submit();
  assert.equal(ui.element('inspection-success').hidden, true);
  assert.equal(ui.element('inspection-submit').disabled, false);
  assert.equal(ui.element('inspection-error').hidden, false);
  assert.equal(tracked, 0);
  assert.equal(ui.element('inspection-request-form').attrs['aria-busy'], undefined);
});
