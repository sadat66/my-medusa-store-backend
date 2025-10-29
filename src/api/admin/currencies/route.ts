import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http";
import { retrieveCurrency } from "../../../workflows/retrieve-currency";
import { Modules } from "@medusajs/framework/utils";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    // Handle array of codes from admin UI (e.g., code[0]=eur&code[1]=usd)
    const { code, currency_code } = req.query;

    let currencyCodes: string[] = [];

    // Handle array format from admin UI
    if (code) {
      if (Array.isArray(code)) {
        currencyCodes = code.map(c => String(c).toLowerCase());
      } else {
        currencyCodes = [String(code).toLowerCase()];
      }
    }
    // Handle single code for backward compatibility
    else if (currency_code) {
      if (typeof currency_code === "string") {
        currencyCodes = [currency_code.toLowerCase()];
      } else if (Array.isArray(currency_code)) {
        currencyCodes = currency_code.map(c => String(c).toLowerCase());
      }
    }

    if (currencyCodes.length === 0) {
      // If no codes provided, return all available currencies
      const currencyModuleService = req.scope.resolve(Modules.CURRENCY);
      const currencies = await currencyModuleService.listCurrencies({});
      return res.json({ currencies });
    }

    // If single code, use the workflow
    if (currencyCodes.length === 1) {
      const { result } = await retrieveCurrency(req.scope).run({
        input: {
          currencyCode: currencyCodes[0],
        },
      });
      return res.json(result);
    }

    // If multiple codes, fetch all from currency module
    const currencyModuleService = req.scope.resolve(Modules.CURRENCY);
    const currencies = await currencyModuleService.listCurrencies({
      code: currencyCodes,
    });

    return res.json({ currencies });
  } catch (error: any) {
    return res.status(400).json({
      error: error?.message || "Failed to retrieve currencies",
    });
  }
}

