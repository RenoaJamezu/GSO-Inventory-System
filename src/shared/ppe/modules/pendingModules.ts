import { moduleKeyToRoute } from "../createPpeModule";
import type { PendingPpeModule } from "../types";

// Remaining PPE modules from GROUP_MODULE_MAP — add a full module config
// (copy land.ts as template) once the Supabase table is ready.
export const pendingPpeModules: PendingPpeModule[] = [
  {
    moduleKey: "water_supply_system",
    route: moduleKeyToRoute("water_supply_system"),
    accountTitle: "Water Supply System",
  },
  {
    moduleKey: "power_supply_system",
    route: moduleKeyToRoute("power_supply_system"),
    accountTitle: "Power Supply System",
  },
  {
    moduleKey: "park_plazas_and_monument",
    route: moduleKeyToRoute("park_plazas_and_monument"),
    accountTitle: "Park, Plazas and Monument",
  },
  {
    moduleKey: "buildings",
    route: moduleKeyToRoute("buildings"),
    accountTitle: "Buildings",
  },
  {
    moduleKey: "other_structure",
    route: moduleKeyToRoute("other_structure"),
    accountTitle: "Other Structure",
  },
  {
    moduleKey: "hospital_and_health_center",
    route: moduleKeyToRoute("hospital_and_health_center"),
    accountTitle: "Hospital and Health Center",
  },
  {
    moduleKey: "markets",
    route: moduleKeyToRoute("markets"),
    accountTitle: "Markets",
  },
  {
    moduleKey: "other_infrastructure_asset",
    route: moduleKeyToRoute("other_infrastructure_asset"),
    accountTitle: "Other Infrastructure Asset",
  },
  {
    moduleKey: "construction_in_progress_infrastructure_asset",
    route: moduleKeyToRoute("construction_in_progress_infrastructure_asset"),
    accountTitle: "Construction in Progress - Infrastructure Asset",
  },
  {
    moduleKey: "construction_in_progress_building_and_other_structure",
    route: moduleKeyToRoute(
      "construction_in_progress_building_and_other_structure",
    ),
    accountTitle: "Construction in Progress - Building and Other Structure",
  },
  {
    moduleKey: "office_equipment",
    route: moduleKeyToRoute("office_equipment"),
    accountTitle: "Office Equipment",
  },
  {
    moduleKey: "furniture_and_fixtures",
    route: moduleKeyToRoute("furniture_and_fixtures"),
    accountTitle: "Furniture and Fixtures",
  },
  {
    moduleKey: "information_technology_equipment",
    route: moduleKeyToRoute("information_technology_equipment"),
    accountTitle: "Information Technology Equipment",
  },
  {
    moduleKey: "agricultural_and_forestry_equipment",
    route: moduleKeyToRoute("agricultural_and_forestry_equipment"),
    accountTitle: "Agricultural and Forestry Equipment",
  },
  {
    moduleKey: "communication_equipment",
    route: moduleKeyToRoute("communication_equipment"),
    accountTitle: "Communication Equipment",
  },
  {
    moduleKey: "construction_and_heavy_equipment",
    route: moduleKeyToRoute("construction_and_heavy_equipment"),
    accountTitle: "Construction and Heavy Equipment",
  },
  {
    moduleKey: "disaster_and_rescue_equipment",
    route: moduleKeyToRoute("disaster_and_rescue_equipment"),
    accountTitle: "Disaster and Rescue Equipment",
  },
  {
    moduleKey: "medical_equipment",
    route: moduleKeyToRoute("medical_equipment"),
    accountTitle: "Medical Equipment",
  },
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
