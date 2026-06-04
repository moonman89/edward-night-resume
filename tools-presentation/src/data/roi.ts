export type RoiDefaults = {
  teamSize: number;
  hourlyCost: number;
  hoursSavedPerWeek: number;
  monthlyCostPerSeat: number;
};

export const roiDefaults: RoiDefaults = {
  teamSize: 5,
  hourlyCost: 75,
  hoursSavedPerWeek: 5,
  monthlyCostPerSeat: 20,
};

export const roiDisclaimer =
  "Example assumptions only — adjust inputs to match your team. Actual savings vary by workflow, codebase, and adoption.";

export type RoiResult = {
  monthlyToolCost: number;
  monthlyHoursSaved: number;
  monthlyValueSaved: number;
  netRoi: number;
  roiMultiple: number;
  hoursToPayback: number;
};

export function calculateRoi(
  teamSize: number,
  hourlyCost: number,
  hoursSavedPerWeek: number,
  monthlyCostPerSeat: number,
): RoiResult {
  const weeksPerMonth = 4.33;
  const monthlyToolCost = teamSize * monthlyCostPerSeat;
  const monthlyHoursSaved = teamSize * hoursSavedPerWeek * weeksPerMonth;
  const monthlyValueSaved = monthlyHoursSaved * hourlyCost;
  const netRoi = monthlyValueSaved - monthlyToolCost;
  const roiMultiple =
    monthlyToolCost > 0 ? monthlyValueSaved / monthlyToolCost : 0;
  const hoursToPayback =
    hourlyCost > 0 ? monthlyToolCost / (teamSize * hourlyCost) : 0;

  return {
    monthlyToolCost,
    monthlyHoursSaved,
    monthlyValueSaved,
    netRoi,
    roiMultiple,
    hoursToPayback,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, decimals = 1): string {
  return value.toFixed(decimals);
}
