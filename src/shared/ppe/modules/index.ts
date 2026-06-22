import type { PpeModule } from "../createPpeModule";
import type { BaseAssetItem } from "../types";

export { pendingPpeModules } from "./pendingModules";

import { landModule } from "./land";
import { otherLandModule } from "./otherLandImprovement";
import { roadNetworkModule } from "./roadNetwork";
import { floodControlModule } from "./floodControl";
import { waterSupplyModule } from "./waterSupply";
import { powerSupplyModule } from "./powerSupply";
import { pPMModule } from "./pPM";

export const implementedPpeModules = [
  landModule,
  otherLandModule,
  roadNetworkModule,
  floodControlModule,
  waterSupplyModule,
  powerSupplyModule,
  pPMModule,
] as const;

export type ImplementedPpeModule = (typeof implementedPpeModules)[number];

export function getImplementedModuleByRoute(route: string) {
  return implementedPpeModules.find((module) => module.route === route) as
    | PpeModule<BaseAssetItem, Record<string, unknown>>
    | undefined;
}

export function getImplementedModuleByKey(moduleKey: string) {
  return implementedPpeModules.find(
    (module) => module.moduleKey === moduleKey,
  ) as PpeModule<BaseAssetItem, Record<string, unknown>> | undefined;
}

// To add a new PPE module:
// 1. Create Supabase table (with group_id FK to asset_groups, deleted_at for soft delete)
// 2. Copy src/shared/ppe/modules/land.ts → yourModule.ts
// 3. Define schema, fields, tableColumns, publicFields, and mapRow for your columns
// 4. Import and append your module to implementedPpeModules below
// 5. Add a lazy route in src/app/routes.tsx pointing to a thin page wrapper
// 6. moduleKey must match GROUP_MODULE_MAP in src/shared/config/groupModuleMap.ts
