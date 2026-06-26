import { create } from "zustand";
import type { ActionResult, BaseAssetItem } from "./types";

type AssetApi<
  TItem extends BaseAssetItem,
  TInput extends Record<string, unknown>,
> = {
  fetchAll: () => Promise<TItem[]>;
  createMany: (items: TInput[]) => Promise<TItem[]>;
  update: (id: number, item: TInput) => Promise<TItem>;
  remove: (id: number) => Promise<void>;
};

type AssetStore<
  TItem extends BaseAssetItem,
  TInput extends Record<string, unknown>,
> = {
  items: TItem[];

  load: () => Promise<ActionResult>;

  addMany: (items: TInput[]) => Promise<ActionResult<TItem[]>>;

  update: (id: number, item: TInput) => Promise<ActionResult<TItem>>;

  remove: (id: number) => Promise<ActionResult>;
};

export function createAssetStore<
  TItem extends BaseAssetItem,
  TInput extends Record<string, unknown>,
>(api: AssetApi<TItem, TInput>, entityLabel: string) {
  return create<AssetStore<TItem, TInput>>((set) => ({
    items: [],

    load: async () => {
      try {
        const items = await api.fetchAll();

        set({
          items,
        });

        return {
          success: true,
        };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : `Failed to load ${entityLabel} records.`;

        console.error(`Error loading ${entityLabel} data:`, message);

        return {
          success: false,
          error: message,
        };
      }
    },

    addMany: async (items) => {
      try {
        const createdItems = await api.createMany(items);

        set((state) => ({
          items: [...state.items, ...createdItems],
        }));

        return {
          success: true,
          data: createdItems,
        };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : `Failed to add ${entityLabel} records.`;

        console.error(`Error adding ${entityLabel} data:`, message);

        return {
          success: false,
          error: message,
        };
      }
    },

    update: async (id, item) => {
      try {
        const updated = await api.update(id, item);

        set((state) => ({
          items: state.items.map((row) => (row.id === id ? updated : row)),
        }));

        return {
          success: true,
          data: updated,
        };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : `Failed to update ${entityLabel} record.`;

        console.error(`Error updating ${entityLabel} data:`, message);

        return {
          success: false,
          error: message,
        };
      }
    },

    remove: async (id) => {
      try {
        await api.remove(id);

        set((state) => ({
          items: state.items.filter((row) => row.id !== id),
        }));

        return {
          success: true,
        };
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : `Failed to delete ${entityLabel} record.`;

        console.error(`Error deleting ${entityLabel} data:`, message);

        return {
          success: false,
          error: message,
        };
      }
    },
  }));
}
