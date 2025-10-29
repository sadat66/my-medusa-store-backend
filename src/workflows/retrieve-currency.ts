import {
  createWorkflow,
  WorkflowResponse,
  createStep,
  StepResponse,
  transform,
} from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";

const retrieveCurrencyStep = createStep(
  "retrieve-currency",
  async ({ currencyCode }: { currencyCode: string }, { container }) => {
    const currencyModuleService = container.resolve(Modules.CURRENCY);

    const currency = await currencyModuleService.retrieveCurrency(currencyCode);

    return new StepResponse({ currency });
  }
);

type Input = {
  currencyCode: string;
};

export const retrieveCurrency = createWorkflow(
  "retrieve-currency",
  (input: Input) => {
    const { currency } = retrieveCurrencyStep(input);

    const formattedOutput = transform(
      {
        input,
        currency,
      },
      (data) => {
        return {
          currency: data.currency,
          currencyCode: data.input.currencyCode,
        };
      }
    );

    return new WorkflowResponse(formattedOutput);
  }
);

