import { implementedPpeModules } from "@/shared/ppe/modules";
import type { PublicAssetConfig } from "./publicAssetConfig.types";

export type { PublicField, PublicAssetConfig } from "./publicAssetConfig.types";

export const publicAssetConfig: Record<string, PublicAssetConfig> =
  Object.fromEntries(
    implementedPpeModules.map((module) => [
      module.publicSlug,
      {
        table: module.table,
        title: module.labels.publicTitle,
        fields: module.publicFields,
      },
    ]),
  );
