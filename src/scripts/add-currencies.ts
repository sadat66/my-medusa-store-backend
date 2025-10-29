import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import { updateStoresWorkflow } from "@medusajs/medusa/core-flows";

export default async function addCurrencies({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const storeModuleService = container.resolve(Modules.STORE);

  logger.info("Adding BDT currency support to store...");
  
  // Get the current store
  const [store] = await storeModuleService.listStores();
  
  if (!store) {
    logger.error("No store found. Please create a store first.");
    return;
  }

  // Always start with EUR (default) and USD, then add BDT
  const updatedCurrencies = [
    {
      currency_code: "eur",
      is_default: true,
    },
    {
      currency_code: "usd",
      is_default: false,
    },
    {
      currency_code: "bdt",
      is_default: false,
    },
  ];

  logger.info("Setting supported currencies: EUR (default), USD, BDT");

  // Update the store with all currencies
  await storeModuleService.updateStores(
    store.id,
    {
      supported_currencies: updatedCurrencies,
    }
  );

  logger.info("✅ BDT currency has been successfully enabled in the store.");
  logger.info(`Supported currencies: ${updatedCurrencies.map(c => c.currency_code.toUpperCase()).join(", ")}`);
}

