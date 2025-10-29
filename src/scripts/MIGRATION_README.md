# Add BDT Currency Migration

This script adds BDT (Bangladesh Taka) currency support to your Medusa store by updating the store configuration in Supabase.

## Prerequisites

1. Make sure you have the Supabase credentials in your `.env` file:
   ```env
   SUPABASE_URL=your-supabase-project-url
   SUPABASE_SERVICE_KEY=your-supabase-service-key
   ```

## How to Run the Migration

### Option 1: Using the npm script
```bash
npm run migrate:bdt
```

### Option 2: Direct execution
```bash
npx ts-node ./src/scripts/add-bdt-currency-migration.ts
```

## What the Script Does

1. Connects to your Supabase database using the service key
2. Fetches the current store configuration
3. Checks if BDT currency is already enabled
4. If not enabled, adds BDT to the supported currencies list
5. Updates the store configuration in the database

## Notes

- The script will skip execution if BDT is already enabled
- This does not affect your existing currencies (EUR, USD)
- You may need to add BDT prices to your products separately

## Troubleshooting

### Error: SUPABASE_URL or SUPABASE_SERVICE_KEY not found
Make sure your `.env` file is in the root directory (`my-medusa-store/.env`) and contains both variables.

### Error: No store found
Run the seed script first:
```bash
npm run seed
```

### Error: Failed to update store
Check your Supabase service key has the necessary permissions to update the store table.

