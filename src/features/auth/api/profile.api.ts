import { supabase } from "@/shared/lib/supabase";

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(error);
  }

  return data;
};
