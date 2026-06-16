export default function Dashboard() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
      <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          Overview
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          This is the control center for the inventory system. The layout is
          ready for live metrics, stock alerts, and recent activity.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Inventory</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">128</p>
            <p className="mt-1 text-sm text-slate-500">tracked items</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Alerts</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">04</p>
            <p className="mt-1 text-sm text-slate-500">need attention</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Activity</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">18</p>
            <p className="mt-1 text-sm text-slate-500">updates today</p>
          </div>
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