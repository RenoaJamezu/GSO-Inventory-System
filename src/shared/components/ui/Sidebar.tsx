import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/shared/lib/supabase";
import { navItems } from "@/shared/config/navItems";

export default function Sidebar() {
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setMobileMenuOpen(false);
    navigate("/");
  };

  const baseClassName =
    "flex items-center rounded-2xl px-4 py-3 text-left text-sm font-semibold transition";
  const defaultClassName =
    "bg-white/70 text-slate-700 hover:bg-slate-100 hover:text-slate-900";
  const activeClassName = "bg-sky-600 text-white shadow-lg shadow-sky-600/20";

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `w-full ${baseClassName} ${isActive ? activeClassName : defaultClassName}`;

  const desktopLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `w-full ${baseClassName} ${isActive ? activeClassName : defaultClassName}`;

  return (
    <>
      <header className="relative z-30 border-b border-white/60 bg-white/85 px-4 py-3 shadow-sm shadow-slate-900/5 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-600">
              LGU Sibagat
            </p>
            <h2 className="truncate text-sm font-semibold text-slate-900">
              General Services Office
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
          >
            <span className="sr-only">Toggle navigation menu</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {mobileMenuOpen ? (
          <div
            id="mobile-navigation"
            className="absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-3xl border border-white/70 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur-xl"
          >
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileLinkClassName}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="mt-3 w-full rounded-2xl border border-rose-300 bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        ) : null}
      </header>

      <aside className="hidden h-screen min-h-0 w-full flex-col border-r border-white/60 bg-white/70 px-5 py-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl lg:flex">
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
              className={desktopLinkClassName}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="w-full rounded-2xl border border-rose-300 bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
}
