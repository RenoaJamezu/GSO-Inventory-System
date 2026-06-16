import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import AppLayout from "@/layouts/AppLayout";
import PageLoader from "@/shared/components/ui/PageLoader";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const CreateProfilePage = lazy(
  () => import("@/features/auth/pages/CreateProfilePage"),
);
const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage"),
);
const InventoryPage = lazy(
  () => import("@/features/inventory/pages/InventoryPage"),
);
const LandPage = lazy(() => import("@/features/land/pages/LandPage"));

// NEW: public QR landing page (NO layout, NO auth)
const LandPublicPage = lazy(
  () => import("@/features/land/pages/LandPublicPage"),
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* public auth */}
        <Route path="/" element={<LoginPage />} />

        {/* PUBLIC QR ACCESS */}
        <Route path="/land/:id" element={<LandPublicPage />} />

        {/* protected system */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-profile" element={<CreateProfilePage />} />

          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/ppe/land" element={<LandPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
