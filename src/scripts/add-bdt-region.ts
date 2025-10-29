import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils";
import { createRegionsWorkflow } from "@medusajs/medusa/core-flows";

export default async function addBDTRegion({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("Creating Bangladesh region with BDT currency...");

  try {
    // Create a region for Bangladesh with BDT currency
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Bangladesh",
            currency_code: "bdt",
            countries: ["bd"], // Bangladesh country code
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });

    const region = regionResult[0];
    logger.info(`✅ Successfully created region: ${region.name} (${region.id})`);
    logger.info(`   Currency: ${region.currency_code.toUpperCase()}`);
    logger.info(`   Countries: Bangladesh (bd)`);

    return region;
  } catch (error: any) {
    logger.error(`❌ Error creating region: ${error.message}`);
    throw error;
  }
}

