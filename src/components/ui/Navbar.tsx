export default function Navbar() {
  return (
    <div className="mb-10 flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
          GSO Inventory
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
          Inventory workspace
        </h1>
      </div>
    </div>
  );
}