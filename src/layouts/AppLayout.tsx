import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/ui/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] lg:grid lg:grid-cols-[18rem_1fr]">
      <Sidebar />

      <main className="simple-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:h-screen lg:max-h-screen lg:overflow-hidden lg:px-8">
        <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col gap-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
