import AssetPage from "@/shared/ppe/AssetPage";
import { waterSupplyModule } from "@/shared/ppe/modules/waterSupply";

export default function FloodControlPage() {
  return <AssetPage module={waterSupplyModule} />;
}
