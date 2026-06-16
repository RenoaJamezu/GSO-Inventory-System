import StatCard from "@/shared/components/ui/StatCard";

type LandSummaryCardsProps = {
  landCount: number;
  totalCarryingAmount: number;
};

export default function LandSummaryCards({
  landCount,
  totalCarryingAmount,
}: LandSummaryCardsProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <StatCard label="Total records" value={landCount} />
      <StatCard
        label="Total carrying amount"
        value={totalCarryingAmount.toLocaleString()}
      />
    </div>
  );
}
