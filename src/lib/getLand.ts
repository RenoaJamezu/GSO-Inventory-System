import { supabase } from "../utils/supabase";

export const getLand = async () => {
  const { data, error } = await supabase.from("land").select("*");

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found
    console.error(error);
  }

  console.log("getLand:" ,data)

  return data;
};
