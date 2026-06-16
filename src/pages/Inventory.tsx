export default function Inventory() {
  return (
    <div className="space-y-6">
      <section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          Inventory
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Inventory workspace
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          This is the page for your item list, stock counts, and filters. Add
          the table or cards here when you are ready to connect live inventory
          data.
        </p>
      </section>
    </div>
  );
}
