"use client";

import { AdPlan } from "@/types";

export function AdPlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: AdPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`border rounded-xl p-4 text-left w-full transition-colors ${
        selected ? "border-teal-600 ring-2 ring-teal-100" : "hover:border-gray-300"
      }`}
    >
      <p className="font-semibold">{plan.label}</p>
      <p className="text-sm text-muted-foreground mt-1">노출 {plan.exposureMultiplier}배 증가</p>
      <p className="text-lg font-bold mt-2">{plan.costChn} CHN</p>
    </button>
  );
}