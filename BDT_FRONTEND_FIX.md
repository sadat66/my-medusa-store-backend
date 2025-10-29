# BDT Frontend Fix - Complete Guide

## Problem
BDT currency is not showing on the frontend even though:
- ✅ BDT is added to store's supported currencies
- ✅ Bangladesh region is created
- ❌ Products don't have BDT prices

## Why It's Not Showing

In Medusa, for a currency to display on the frontend:
1. ✅ Currency must be added to store (DONE)
2. ✅ Region with that currency must exist (DONE)
3. ❌ Products must have prices in that currency (MISSING)

The frontend fetches products with prices filtered by region. If products don't have BDT prices, they won't show the BDT currency on the storefront, even if the region and store support it.

## Solution

### Step 1: Ensure Bangladesh Region Exists
```bash
npm run add-bdt-region
```

### Step 2: Enable BDT in Store Configuration
```bash
npm run add-currencies
```

### Step 3: Add BDT Prices to Products
```bash
npm run add-bdt-prices
```

This script will:
- Find all products in your store
- For each variant, check if it has USD or EUR prices
- Add BDT prices based on approximate conversion rates:
  - 1 USD ≈ 110 BDT
  - 1 EUR ≈ 120 BDT
- Skip variants that already have BDT prices

### Step 4: Update Shipping Options (Optional)
Update shipping options to support BDT by adding BDT prices to shipping options in the admin panel.

## How to Verify

### 1. Check Products Have BDT Prices
You can verify through the Admin API:
```bash
# List products and check variant prices
curl http://localhost:9000/store/products
```

### 2. Access Bangladesh Region on Frontend
Visit: `http://localhost:3000/bd` (or whatever your frontend URL is)

If you set up Bangladesh region with country code "bd", the frontend should:
- Display BDT prices
- Show products with BDT currency
- Use BDT for all pricing calculations

### 3. Check Region Configuration
```bash
curl http://localhost:9000/store/regions
```

Look for a region with:
- `currency_code: "bdt"`
- `countries` array containing `"bd"`

## Troubleshooting

### Products Still Not Showing BDT?

1. **Check if Bangladesh region exists:**
   ```bash
   curl http://localhost:9000/store/regions
   ```
   You should see a region with currency_code "bdt" and country "bd"

2. **Verify products have BDT prices:**
   ```bash
   curl http://localhost:9000/store/products/[product_id]
   ```
   Check if variants have prices with `currency_code: "bdt"`

3. **Check middleware region detection:**
   The storefront uses middleware to detect country and set region. Make sure your middleware is detecting Bangladesh (bd) correctly.

4. **Clear cache and restart:**
   ```bash
   # Stop your servers
   # Clear Next.js cache
   rm -rf .next
   # Restart both servers
   cd my-medusa-store && npm run dev
   cd my-medusa-store-storefront && npm run dev
   ```

## Complete Setup Checklist

- [ ] Run `npm run add-currencies` (enable BDT in store)
- [ ] Run `npm run add-bdt-region` (create Bangladesh region)
- [ ] Run `npm run add-bdt-prices` (add BDT prices to products)
- [ ] Verify region exists with `curl http://localhost:9000/store/regions`
- [ ] Visit frontend with country code for Bangladesh (e.g., `/bd`)
- [ ] Check that prices show in BDT

## Additional Notes

### Manual Price Adjustment
After running `add-bdt-prices`, you may want to adjust prices manually in the admin panel to reflect accurate market rates.

### Currency Display
The currency code will appear as "৳" or "BDT" depending on your formatting. The money formatting utility (`src/lib/util/money.ts`) handles this.

### Region Detection
The storefront uses the URL path `/[countryCode]` to detect the region. Make sure:
- Bangladesh is detected via country code `bd`
- The middleware maps `bd` to the Bangladesh region


