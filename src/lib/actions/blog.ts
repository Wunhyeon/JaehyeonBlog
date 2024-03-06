"use server";

import { createClient } from "@/utils/supabase/server";
import { Database } from "@/lib/types/supabase";

const getDB = async () => {
  return await createClient();
};

/**
 * 카테고리 목록
 */
export const getCategory = async () => {
  const supabase = await getDB();
  return await supabase
    .from("content_category")
    .select("*,content_category(*)")
    .is("parents_id", null);
};
