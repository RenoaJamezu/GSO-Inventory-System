import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/shared/lib/supabase";
import { navItems } from "@/shared/config/navItems";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/");
  };

  const baseClassName =
    "flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-semibold transition";
  const defaultClassName =
    "bg-white/70 text-slate-700 hover:bg-slate-100 hover:text-slate-900";
  const activeClassName = "bg-sky-600 text-white shadow-lg shadow-sky-600/20";

  return (
    <aside className="flex min-h-screen w-full flex-col border-r border-white/60 bg-white/70 px-5 py-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
          LGU Sibagat
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          General Services Office
        </h2>
      </div>

      <nav className="space-y-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${baseClassName} ${isActive ? activeClassName : defaultClassName}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="w-full rounded-2xl border border-rose-300 bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
