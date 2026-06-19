import { create } from "zustand";
import * as roadNetworkApi from "@/features/road_network/roadNetwork.api";
import type {
  RoadNetworkActionResult,
  RoadNetworkInput,
  RoadNetworkItem,
} from "./roadNetwork.type";

interface RoadNetworkState {
  roadNetworkItems: RoadNetworkItem[];
  loadRoadNetwork: () => Promise<RoadNetworkActionResult>;
  addRoadNetwork: (
    item: RoadNetworkInput,
  ) => Promise<RoadNetworkActionResult<RoadNetworkItem>>;
  updateRoadNetwork: (
    id: number,
    item: RoadNetworkInput,
  ) => Promise<RoadNetworkActionResult<RoadNetworkItem>>;
  deleteRoadNetwork: (id: number) => Promise<RoadNetworkActionResult>;
}

export const useRoadNetworkStore = create<RoadNetworkState>((set) => ({
  roadNetworkItems: [],

  loadRoadNetwork: async () => {
    try {
      const items = await roadNetworkApi.fetchRoadNetwork();
      set({ roadNetworkItems: items });
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load road network records.";
      console.error("Error loading road network data:", message);
      return { success: false, error: message };
    }
  },

  addRoadNetwork: async (item) => {
    try {
      const nextItem = await roadNetworkApi.createRoadNetwork(item);
      set((state) => ({
        roadNetworkItems: [...state.roadNetworkItems, nextItem],
      }));
      return { success: true, data: nextItem };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to add road network record.";
      console.error("Error adding road network data:", message);
      return { success: false, error: message };
    }
  },

  updateRoadNetwork: async (id, item) => {
    try {
      const nextItem = await roadNetworkApi.updateRoadNetwork(id, item);
      set((state) => ({
        roadNetworkItems: state.roadNetworkItems.map((row) =>
          row.id === id ? nextItem : row,
        ),
      }));
      return { success: true, data: nextItem };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update road network record.";
      console.error("Error updating road network data:", message);
      return { success: false, error: message };
    }
  },

  deleteRoadNetwork: async (id) => {
    try {
      await roadNetworkApi.deleteRoadNetwork(id);
      set((state) => ({
        roadNetworkItems: state.roadNetworkItems.filter((row) => row.id !== id),
      }));
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete road network record.";
      console.error("Error deleting road network data:", message);
      return { success: false, error: message };
    }
  },
}));
