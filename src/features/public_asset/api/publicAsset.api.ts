import { supabase } from "@/shared/lib/supabase";

export async function fetchPublicAsset(
  table: string,
  id: string,
) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}