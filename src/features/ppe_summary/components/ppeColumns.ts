import type { Column } from "@/shared/components/ui/Table";
import type { PpeItem } from "../types/ppe.types";

export const ppeColumns: Column<PpeItem>[] = [
  {header: "NO", key: "id"},
  {header: "ACCOUNT TITLE", key: "account_title"},
  {header: "BOOK VALUE", key: "book_value"},
  {header: "PER INVENTORY REPORT", key: "per_inventory_report"},
  {header: "VARIANCE", key: "variance"},
]