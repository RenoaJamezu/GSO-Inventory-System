import PageHeader from "@/shared/components/ui/PageHeader";
import StatCard from "@/shared/components/ui/StatCard";

export default function DashboardPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
      <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
        <PageHeader
          eyebrow="Overview"
          title="Dashboard"
          description="This is the control center for the inventory system. The layout is ready for live metrics, stock alerts, and recent activity."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Inventory" value="128" hint="tracked items" />
          <StatCard label="Alerts" value="04" hint="need attention" />
          <StatCard label="Activity" value="18" hint="updates today" />
        </div>
      </div>

      <aside className="rounded-4xl border border-sky-100 bg-sky-950 p-6 text-white shadow-xl shadow-sky-900/15 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80">
          Next up
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Build the live inventory panels here.
        </h2>
        <p className="mt-3 text-sm leading-6 text-sky-100/80">
          Add tables, filters, and charts when the data layer is ready. The
          shell already carries the visual hierarchy.
        </p>

        <div className="mt-8 space-y-3 text-sm text-sky-100/90">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            Stock movement summary
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            Pending requests queue
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            Recent user activity
          </div>
        </div>
      </aside>
    </section>
  );
}
