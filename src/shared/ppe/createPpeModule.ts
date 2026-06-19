import { createAssetApi } from "./createAssetApi";
import { createAssetStore } from "./createAssetStore";
import type { BaseAssetItem, PpeModuleDefinition } from "./types";
import type { StoreApi, UseBoundStore } from "zustand";
import type { ActionResult } from "./types";

type AssetStoreHook<
  TItem extends BaseAssetItem,
  TInput extends Record<string, unknown>,
> = UseBoundStore<
  StoreApi<{
    items: TItem[];
    load: () => Promise<ActionResult>;
    add: (item: TInput) => Promise<ActionResult<TItem>>;
    update: (id: number, item: TInput) => Promise<ActionResult<TItem>>;
    remove: (id: number) => Promise<ActionResult>;
  }>
>;

export type PpeModule<
  TItem extends BaseAssetItem = BaseAssetItem,
  TFormData extends Record<string, unknown> = Record<string, unknown>,
> = PpeModuleDefinition<TItem, TFormData> & {
  useStore: AssetStoreHook<TItem, TFormData>;
};

export function createPpeModule<
  TItem extends BaseAssetItem,
  TFormData extends Record<string, unknown>,
>(
  definition: PpeModuleDefinition<TItem, TFormData>,
): PpeModule<TItem, TFormData> {
  const api = createAssetApi<TItem, TFormData>(
    definition.table,
    definition.mapRow,
  );
  const useStore = createAssetStore<TItem, TFormData>(
    api,
    definition.labels.singular,
  );

  return {
    ...definition,
    useStore,
  };
}

export function moduleKeyToRoute(moduleKey: string): string {
  return `/ppe/${moduleKey.replace(/_/g, "-")}`;
}

export function moduleKeyToPublicSlug(moduleKey: string): string {
  return moduleKey.replace(/_/g, "-");
}
