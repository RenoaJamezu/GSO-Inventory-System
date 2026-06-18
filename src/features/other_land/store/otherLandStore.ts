import { create } from "zustand";
import * as otherLandApi from "@/features/other_land/api/otherLand.api";
import type {
  OtherLandActionResult,
  OtherLandInput,
  OtherLandItem,
} from "@/features/other_land/types/otherLand.types";

interface OtherLandState {
  otherLandItems: OtherLandItem[];
  loadOtherLand: () => Promise<OtherLandActionResult>;
  addOtherLand: (
    item: OtherLandInput,
  ) => Promise<OtherLandActionResult<OtherLandItem>>;
  updateOtherLand: (
    id: number,
    item: OtherLandInput,
  ) => Promise<OtherLandActionResult<OtherLandItem>>;
  deleteOtherLand: (id: number) => Promise<OtherLandActionResult>;
}

export const useOtherLandStore = create<OtherLandState>((set) => ({
  otherLandItems: [],

  loadOtherLand: async () => {
    try {
      const items = await otherLandApi.fetchOtherLand();
      set({ otherLandItems: items });
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load other land improvement records.";
      console.error("Error loading other land improvement data:", message);
      return { success: false, error: message };
    }
  },
  
    addOtherLand: async (item) => {
      try {
        const nextItem = await otherLandApi.createOtherLand(item);
        set((state) => ({ otherLandItems: [...state.otherLandItems, nextItem] }));
        return { success: true, data: nextItem };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to add land record.";
        console.error("Error adding land data:", message);
        return { success: false, error: message };
      }
    },

  updateOtherLand: async (id, item) => {
    try {
      const nextItem = await otherLandApi.updateOtherLand(id, item);
      set((state) => ({
        otherLandItems: state.otherLandItems.map((row) =>
          row.id === id ? nextItem : row,
        ),
      }));
      return { success: true, data: nextItem };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update land record.";
      console.error("Error updating land data:", message);
      return { success: false, error: message };
    }
  },

  deleteOtherLand: async (id) => {
    try {
      await otherLandApi.deleteOtherLand(id);
      set((state) => ({
        otherLandItems: state.otherLandItems.filter((row) => row.id !== id),
      }));
      return { success: true };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete land record.";
      console.error("Error deleting land data:", message);
      return { success: false, error: message };
    }
  },
}));
