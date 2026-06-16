import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[18rem_1fr]">
      <Sidebar />
      <main className="min-h-screen px-4 py-25 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}