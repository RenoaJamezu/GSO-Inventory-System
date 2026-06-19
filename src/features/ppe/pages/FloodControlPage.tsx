import AssetPage from "@/shared/ppe/AssetPage";
import { floodControlModule } from "@/shared/ppe/modules/floodControl";

export default function FloodControlPage() {
  return <AssetPage module={floodControlModule} />;
}
