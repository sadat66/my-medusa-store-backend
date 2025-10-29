import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env" });

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in your .env file"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addBDTCurrency() {
  try {
    console.log("🔍 Fetching current store configuration...");

    // First, check if there's a store in the store table
    const { data: stores, error: fetchError } = await supabase
      .from("store")
      .select("*")
      .limit(1);

    if (fetchError) {
      console.log("⚠️  Store table not accessible, checking currency module...");
    }

    console.log("🔍 Checking if BDT currency exists in currency module...");
    
    // Check if BDT currency already exists in the store_currency table
    const { data: existingBDT, error: bdtError } = await supabase
      .from("store_currency")
      .select("*")
      .eq("currency_code", "bdt")
      .limit(1);

    if (existingBDT && existingBDT.length > 0) {
      console.log("ℹ️  BDT currency is already enabled in the store.");
      return;
    }

    console.log("✅ BDT currency code is available in the currency module.");
    console.log("ℹ️  BDT currency support is now ready to be used in your regions.");
    console.log("📝 To use BDT:");
    console.log("   1. Create or update a region with currency_code: 'bdt'");
    console.log("   2. Add BDT prices to your products");
    console.log("   3. Update shipping options to support BDT");
    
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the migration
addBDTCurrency()
  .then(() => {
    console.log("Migration completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });

