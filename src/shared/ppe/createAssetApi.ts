import { supabase } from "@/shared/lib/supabase";
import type { BaseAssetItem } from "./types";

const GROUP_SELECT = `
  *,
  asset_groups (
    id,
    name
  )
`;

export function createAssetApi<
  TItem extends BaseAssetItem,
  TInput extends Record<string, unknown>,
>(
  table: string,
  mapRow: (row: Record<string, unknown>) => TItem,
) {
  return {
    async fetchAll(): Promise<TItem[]> {
      const { data, error } = await supabase
        .from(table)
        .select(GROUP_SELECT)
        .is("deleted_at", null);

      if (error) {
        throw new Error(error.message);
      }

      return (data ?? []).map((row) =>
        mapRow(row as Record<string, unknown>),
      );
    },

    async createMany(items: TInput[]): Promise<TItem[]> {
      if (items.length === 0) {
        return [];
      }

      const { data, error } = await supabase
        .from(table)
        .insert(items as Record<string, unknown>[])
        .select(GROUP_SELECT);

      if (error) {
        throw new Error(error.message);
      }

      return (data ?? []).map((row) =>
        mapRow(row as Record<string, unknown>),
      );
    },

    async update(id: number, item: TInput): Promise<TItem> {
      const { data, error } = await supabase
        .from(table)
        .update(item as Record<string, unknown>)
        .eq("id", id)
        .select(GROUP_SELECT)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return mapRow(data as Record<string, unknown>);
    },

    async remove(id: number): Promise<void> {
      const { error } = await supabase
        .from(table)
        .update({
          deleted_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },
  };
}