import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../lib/getProfile";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const user = data.user;

    if (!user) return;

    // check if profile exists
    const profile = await getProfile(user.id);

    if (!profile) {
      navigate("/create-profile");
    } else {
      navigate("/home");
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-4xl border border-white/70 bg-white/70 shadow-2xl shadow-slate-900/10 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
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
              Sign in to manage records, review workspaces, and continue where
              your team left off.
            </p>
          </div>

          <div className="relative mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-200">Secure access</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Sign in with your Supabase credentials and jump straight into
                the dashboard.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium text-slate-200">
                Profile-aware flow
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Users without a profile are routed into profile setup
                automatically.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="w-full max-w-md rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
                Welcome back
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Login to continue
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Access your inventory dashboard with a clean, focused sign-in
                screen.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  required
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}