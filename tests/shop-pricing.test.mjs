import {test} from 'node:test';
import assert from 'node:assert/strict';
import {resolveShopPricing} from '../src/lib/shop-pricing.mjs';
const product={sale_price_lkr:32928,sale_availability:'made_to_order'};
test('base price is retained for a product without variants',()=>assert.deepEqual(resolveShopPricing(product,[]),product));
test('visible price reflects the cheapest selectable finish',()=>assert.equal(resolveShopPricing(product,[{price_lkr:33928,availability:'made_to_order',stock_quantity:null}]).sale_price_lkr,33928));
test('unavailable cheaper variants do not advertise an unavailable price',()=>assert.equal(resolveShopPricing(product,[{price_lkr:100,availability:'in_stock',stock_quantity:0},{price_lkr:33928,availability:'in_stock',stock_quantity:2}]).sale_price_lkr,33928));
test('all unavailable variants produce an out-of-stock product',()=>assert.equal(resolveShopPricing(product,[{price_lkr:33928,availability:'out_of_stock',stock_quantity:null}]).sale_availability,'out_of_stock'));
