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
const PpeSummaryPage = lazy(
  () => import("@/features/ppe_summary/pages/PpeSummaryPage"),
);
const LandPage = lazy(() => import("@/features/ppe/pages/LandPage"));
const OtherLandPage = lazy(() => import("@/features/ppe/pages/OtherLandPage"));
const RoadNetworkPage = lazy(
  () => import("@/features/ppe/pages/RoadNetworkPage"),
);
const FloodControlPage = lazy(
  () => import("@/features/ppe/pages/FloodControlPage"),
);
const WaterSupplyPage = lazy(
  () => import("@/features/ppe/pages/WaterSupplyPage"),
);
const PowerSupplyPage = lazy(
  () => import("@/features/ppe/pages/PowerSupplyPage"),
);

// NEW: public QR landing page (NO layout, NO auth)
const PublicAssetPage = lazy(
  () => import("@/features/public_asset/pages/PublicAssetPage"),
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* public auth */}
        <Route path="/" element={<LoginPage />} />

        {/* PUBLIC QR ACCESS */}
        <Route path="/public/:entity/:id" element={<PublicAssetPage />} />

        {/* protected system */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create-profile" element={<CreateProfilePage />} />

          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/ppe-summary" element={<PpeSummaryPage />} />

            <Route path="/ppe/land" element={<LandPage />} />
            <Route
              path="/ppe/other-land-improvement"
              element={<OtherLandPage />}
            />
            <Route path="/ppe/road-network" element={<RoadNetworkPage />} />
            <Route path="/ppe/flood-control" element={<FloodControlPage />} />
            <Route path="/ppe/water-supply" element={<WaterSupplyPage />} />
            <Route path="/ppe/power-supply" element={<PowerSupplyPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
