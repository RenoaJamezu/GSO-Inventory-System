import { useEffect, useState } from "react";
import { supabase } from "@/shared/lib/supabase";
import { useNavigate } from "react-router-dom";
import { getProfile } from "@/features/auth/api/profile.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import PageLoader from "@/shared/components/ui/PageLoader";

export default function CreateProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingProfile, setCheckingProfile] = useState(true);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const checkExistingProfile = async () => {
      if (!user) {
        setCheckingProfile(false);
        return;
      }

      const profile = await getProfile(user.id);
      if (profile) {
        navigate("/home", { replace: true });
        return;
      }

      setCheckingProfile(false);
    };

    checkExistingProfile();
  }, [user, navigate]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError("You must be signed in to create a profile.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("profile").insert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      // TODO: assign via Supabase RLS or admin panel
      role: "admin",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/home");
  };

  if (checkingProfile) {
    return <PageLoader message="Checking profile..." />;
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-4xl border border-white/70 bg-white/80 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          Account setup
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Create your profile
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Add your name so the dashboard can identify your account properly.
        </p>

        <form onSubmit={handleCreate} className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                required
              />
            </div>
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
            {loading ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
    </main>
  );
}
