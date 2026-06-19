import type { ZodType } from "zod";
import type { FieldConfig } from "@/shared/forms/types";

export interface BaseAssetItem {
  id: number;
  group_id: number | null;
  group_name: string | null;
}

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

export type PublicField = {
  label: string;
  key: string;
  format?: (value: unknown) => string;
};

export type TableColumnConfig<T extends BaseAssetItem> = {
  header: string;
  key: keyof T;
  format?: "currency";
};

export type PpeModuleLabels = {
  singular: string;
  plural: string;
  summaryTitle: string;
  addButton: string;
  addModal: string;
  editModal: string;
  description: string;
  publicTitle: string;
};

export type PpeModuleDefinition<
  TItem extends BaseAssetItem,
  TFormData extends Record<string, unknown>,
> = {
  moduleKey: string;
  table: string;
  route: string;
  publicSlug: string;
  labels: PpeModuleLabels;
  amountField: keyof TItem;
  deleteConfirmField: keyof TItem;
  qrLabelField: keyof TItem;
  searchFields: (keyof TItem)[];
  fields: FieldConfig[];
  schema: ZodType<TFormData>;
  emptyForm: TFormData;
  tableColumns: TableColumnConfig<TItem>[];
  publicFields: PublicField[];
  mapRow: (row: Record<string, unknown>) => TItem;
};

export type PpeSummaryRow = {
  id: number;
  account_title: string;
  book_value: string;
  per_inventory_report: number;
  variance: string;
  route: string;
};

export type PendingPpeModule = {
  moduleKey: string;
  route: string;
  accountTitle: string;
};
