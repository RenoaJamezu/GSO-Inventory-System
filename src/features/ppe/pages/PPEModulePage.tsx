import AssetPage from "@/shared/ppe/AssetPage";
import {
  getImplementedModuleBySlug,
} from "@/shared/ppe/modules";
import { Navigate, useParams } from "react-router-dom";

export default function PPEModulePage() {
  const { slug } = useParams();

  const module = slug ? getImplementedModuleBySlug(slug) : undefined;
  
  if (!module) {
    return <Navigate to="404" replace />;
  }

  return <AssetPage module={module} />;
}
