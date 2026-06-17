import StatCard from "./StatCard";

type SummaryCardProps = {
  totalDataLabel: string;
  totalData: number;
  totalAmountLabel: string;
  totalAmount: number;
};

export default function SummaryCardProps({
  totalDataLabel,
  totalData,
  totalAmountLabel,
  totalAmount,
}: SummaryCardProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 uppercase">
      <StatCard 
        label={totalDataLabel} 
        value={totalData} 
      />
      <StatCard 
        label={totalAmountLabel} 
        value={totalAmount.toLocaleString()} 
      />
    </div>
  );
}
