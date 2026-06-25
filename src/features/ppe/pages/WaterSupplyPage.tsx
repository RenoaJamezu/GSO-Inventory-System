import AssetPage from "@/shared/ppe/AssetPage";
import { waterSupplyModule } from "@/shared/ppe/modules/waterSupply";

export default function WaterControlPage() {
  return <AssetPage module={waterSupplyModule} />;
}
