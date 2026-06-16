import { create } from "zustand";
import * as landApi from "@/features/land/api/land.api";
import type {
  LandActionResult,
  LandInput,
  LandItem,
} from "@/features/land/types/land.types";

interface LandState {
  landItems: LandItem[];
  loadLand: () => Promise<LandActionResult>;
  addLand: (item: LandInput) => Promise<LandActionResult<LandItem>>;
  updateLand: (id: number, item: LandInput) => Promise<LandActionResult<LandItem>>;
  deleteLand: (id: number) => Promise<LandActionResult>;
}

export const useLandStore = create<LandState>((set) => ({
  landItems: [],

  loadLand: async () => {
    try {
      const items = await landApi.fetchLand();
      set({ landItems: items });
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load land records.";
      console.error("Error loading land data:", message);
      return { success: false, error: message };
    }
  },

  addLand: async (item) => {
    try {
      const nextItem = await landApi.createLand(item);
      set((state) => ({ landItems: [...state.landItems, nextItem] }));
      return { success: true, data: nextItem };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to add land record.";
      console.error("Error adding land data:", message);
      return { success: false, error: message };
    }
  },

  updateLand: async (id, item) => {
    try {
      const nextItem = await landApi.updateLand(id, item);
      set((state) => ({
        landItems: state.landItems.map((row) => (row.id === id ? nextItem : row)),
      }));
      return { success: true, data: nextItem };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update land record.";
      console.error("Error updating land data:", message);
      return { success: false, error: message };
    }
  },

  deleteLand: async (id) => {
    try {
      await landApi.deleteLand(id);
      set((state) => ({
        landItems: state.landItems.filter((row) => row.id !== id),
      }));
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete land record.";
      console.error("Error deleting land data:", message);
      return { success: false, error: message };
    }
  },
}));
