import PageHeader from "@/shared/components/ui/PageHeader";
import StatCard from "@/shared/components/ui/StatCard";
import { usePpeSummary } from "@/shared/ppe/usePpeSummary";

export default function DashboardPage() {
  const { totalRecords } = usePpeSummary();

  const features = [
    { key: 1, detail: "Bulk add data for each account title" },
    { key: 2, detail: "Bulk qr download for each account title" },
    { key: 3, detail: "Improve public view for each information/inventory" },
    {
      key: 4,
      detail:
        "Field in the add data the amount must auto add comma if it reach thousands",
    },
    { key: 4, detail: "Drag and drop excel to auto import" },
  ];
  return (
    <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
      <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
        <PageHeader
          eyebrow="Overview"
          title="Dashboard"
          description="This is the control center for the inventory system. "
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-1">
          <StatCard
            label="Inventory"
            value={totalRecords}
            hint="tracked items"
          />
        </div>
      </div>

      <aside className="rounded-4xl border border-sky-100 bg-sky-950 p-6 text-white shadow-xl shadow-sky-900/15 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80">
          Next up
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Note: Future features to be added
        </h2>

        <div className="mt-8 space-y-3 text-sm text-sky-100/90">
          {features.map((feature) => (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              {feature.detail}
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
