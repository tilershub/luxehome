/** Resolve the displayed price from selectable variants, never an unavailable base option. */
export function resolveShopPricing(product, variants = []) {
  if (!variants.length) return product;
  const available = variants.filter(v => v.active !== false && v.availability !== 'out_of_stock' && v.stock_quantity !== 0 && Number(v.price_lkr) > 0);
  const priced = available.length ? available : variants.filter(v => Number(v.price_lkr) > 0);
  return {
    ...product,
    sale_price_lkr: priced.length ? Math.min(...priced.map(v => Number(v.price_lkr))) : product.sale_price_lkr,
    sale_availability: available.length ? (available.some(v => v.availability === 'in_stock') ? 'in_stock' : 'made_to_order') : 'out_of_stock',
  };
}
