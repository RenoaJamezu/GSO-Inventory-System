import { create } from "zustand";
import { supabase } from "../utils/supabase";

export interface LandItem {
  id: number;
  lot_no: string;
  location: string;
  description: string;
  carrying_amount: number;
  land_title: string;
  remarks: string;
  land: string;
  land_improvements: string;
}

export type LandInput = {
  id?: number | null;
  lot_no?: string | null;
  location?: string | null;
  description?: string | null;
  carrying_amount?: number | null;
  land_title?: string | null;
  remarks?: string | null;
  land?: string | null;
  land_improvements?: string | null;
};

interface LandState {
  landItems: LandItem[];
  setLand: (items: LandItem[]) => void;
  loadLand: () => Promise<void>;
  addLand: (item: LandInput) => Promise<LandItem | null>;
  updateLand: (id: number, item: LandInput) => Promise<LandItem | null>;
  deleteLand: (id: number) => Promise<boolean>;
}

function normalizeLandItem(item: LandInput): LandItem {
  return {
    id: Number(item.id ?? Date.now()),
    lot_no: item.lot_no ?? "",
    location: item.location ?? "",
    description: item.description ?? "",
    carrying_amount: Number(item.carrying_amount ?? 0),
    land_title: item.land_title ?? "",
    remarks: item.remarks ?? "",
    land: item.land ?? "",
    land_improvements: item.land_improvements ?? "",
  };
}

export const useLandStore = create<LandState>((set) => ({
  landItems: [],
  setLand: (items) => set({ landItems: items }),
  loadLand: async () => {
    const { data, error } = await supabase.from("land").select("*");

    if (error) {
      console.error("Error loading land data:", error);
      return;
    }

    set({
      landItems: (data ?? []).map((item) => normalizeLandItem(item as LandInput)),
    });
  },
  addLand: async (item) => {
    const payload = normalizeLandItem(item);
    const { id: ignoredId, ...insertPayload } = payload;
    void ignoredId;

    const { data, error } = await supabase
      .from("land")
      .insert(insertPayload)
      .select("*")
      .single();

    if (error) {
      console.error("Error adding land data:", error);
      return null;
    }

    const nextItem = normalizeLandItem(data as LandInput);

    set((state) => ({ landItems: [...state.landItems, nextItem] }));

    return nextItem;
  },
  updateLand: async (id, item) => {
    const payload = normalizeLandItem({ ...item, id });
    const { id: ignoredId, ...updatePayload } = payload;
    void ignoredId;

    const { data, error } = await supabase
      .from("land")
      .update(updatePayload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating land data:", error);
      return null;
    }

    const nextItem = normalizeLandItem(data as LandInput);

    set((state) => ({
      landItems: state.landItems.map((row) => (row.id === id ? nextItem : row)),
    }));

    return nextItem;
  },
  deleteLand: async (id) => {
    const { error } = await supabase.from("land").delete().eq("id", id);

    if (error) {
      console.error("Error deleting land data:", error);
      return false;
    }

    set((state) => ({
      landItems: state.landItems.filter((row) => row.id !== id),
    }));

    return true;
  },
}));