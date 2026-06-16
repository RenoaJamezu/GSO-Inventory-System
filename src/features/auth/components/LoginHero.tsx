export default function LoginHero() {
  return (
    <section className="relative flex flex-col justify-between overflow-hidden bg-slate-950 px-8 py-10 text-white sm:px-10 lg:px-12 lg:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.18),transparent_32%)]" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300/80">
          GSO Inventory System
        </p>
        <h1 className="mt-6 max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">
          Keep inventory control crisp, fast, and easy to scan.
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
          Sign in to manage records, review workspaces, and continue where your
          team left off.
        </p>
      </div>

      <div className="relative mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
          <p className="text-sm font-medium text-slate-200">Secure access</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Sign in with your Supabase credentials and jump straight into the
            dashboard.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
          <p className="text-sm font-medium text-slate-200">Profile-aware flow</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Users without a profile are routed into profile setup automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
