import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/ui/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] lg:grid lg:grid-cols-[18rem_1fr]">
      <Sidebar />
      <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
