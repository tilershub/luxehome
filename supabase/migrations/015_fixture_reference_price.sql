-- The walk-in design page shows a reference price against each fixture.
-- Free text so units stay flexible ("LKR 96,000", "LKR 58,000 / m²").
alter table lx_design_fixtures add column if not exists reference_price_label text;
