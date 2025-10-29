# BDT Currency Fix - Now Available in Admin UI

## Problem
BDT currency wasn't showing in the region creation dropdown at `http://localhost:9000/app/settings/regions/create` because it wasn't added to the store's supported currencies.

## Solution
Updated the store configuration to include BDT in the supported currencies list alongside EUR and USD.

## What Was Done
✅ Added BDT to store's supported currencies:
- EUR (default)
- USD  
- BDT (new)

## How It Works
In Medusa, regions can only use currencies that are enabled in the store's configuration. The admin UI dropdown filters available currencies based on what's in the store's `supported_currencies` field.

## Result
Now when you create or edit a region in the admin panel at:
`http://localhost:9000/app/settings/regions/create`

You will see all three currencies in the dropdown:
- EUR (Euro) - default
- USD (US Dollar)
- BDT (Bangladesh Taka)

## Commands Used
```bash
npm run add-currencies
```

This script now sets: EUR (default), USD, and BDT as supported currencies.

## Next Steps
1. Refresh your admin panel
2. Go to Settings > Regions
3. Create or edit a region
4. Select BDT from the currency dropdown
5. Add countries for that region (e.g., Bangladesh = "bd")

## Verify
You can verify by checking the store's supported currencies in the database or through the API:

```bash
# Check what currencies are available for the store
curl http://localhost:9000/admin/currencies?currency_code=bdt
```

