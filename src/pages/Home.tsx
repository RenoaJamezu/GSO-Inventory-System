export default function Home() {
  return (
    <section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
        Home
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        Welcome back
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        Use this screen as the landing page for the inventory workspace. The
        sidebar buttons now switch the main content without leaving the layout.
      </p>
    </section>
  );
}