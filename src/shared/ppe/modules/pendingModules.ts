import { moduleKeyToRoute } from "../createPpeModule";
import type { PendingPpeModule } from "../types";

// Remaining PPE modules from GROUP_MODULE_MAP — add a full module config
// (copy land.ts as template) once the Supabase table is ready.
export const pendingPpeModules: PendingPpeModule[] = [
  {
    moduleKey: "sports_equipment",
    route: moduleKeyToRoute("sports_equipment"),
    accountTitle: "Sports Equipment",
  },
  {
    moduleKey: "other_machineries_and_equipment",
    route: moduleKeyToRoute("other_machineries_and_equipment"),
    accountTitle: "Other Machineries and Equipment",
  },
  {
    moduleKey: "motor_vehicle",
    route: moduleKeyToRoute("motor_vehicle"),
    accountTitle: "Motor Vehicle",
  },
  {
    moduleKey: "other_transportation_equipment",
    route: moduleKeyToRoute("other_transportation_equipment"),
    accountTitle: "Other Transportation Equipment",
  },
  {
    moduleKey: "other_property_plant_and_equipment",
    route: moduleKeyToRoute("other_property_plant_and_equipment"),
    accountTitle: "Other Property, Plant and Equipment",
  },
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
