import { moduleKeyToRoute } from "../createPpeModule";
import type { PendingPpeModule } from "../types";

// Remaining PPE modules from GROUP_MODULE_MAP — add a full module config
// (copy land.ts as template) once the Supabase table is ready.
export const pendingPpeModules: PendingPpeModule[] = [
  {
    moduleKey: "welfare_goods_for_distribution_mdrrmf",
    route: moduleKeyToRoute("welfare_goods_for_distribution_mdrrmf"),
    accountTitle: "Welfare Goods for Distribution (MDRRMF)",
  },
  {
    moduleKey: "inventory_of_medical_supplies_mdrrmf",
    route: moduleKeyToRoute("inventory_of_medical_supplies_mdrrmf"),
    accountTitle: "Inventory of Medical Supplies (MDRRMF)",
  },
  {
    moduleKey: "drug_and_medicine_inventory",
    route: moduleKeyToRoute("drug_and_medicine_inventory"),
    accountTitle: "Drug and Medicine Inventory",
  },
  {
    moduleKey: "medical_dental_and_labaratory_supply_rhu",
    route: moduleKeyToRoute("medical_dental_and_labaratory_supply_rhu"),
    accountTitle: "Medical, Dental and Laboratory Supply (RHU)",
  },
];
