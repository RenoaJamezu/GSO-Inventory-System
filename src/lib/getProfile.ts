import { supabase } from "../utils/supabase";

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found
    console.error(error);
  }

  return data;
};