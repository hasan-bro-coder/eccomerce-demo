"use server";

import { supabase } from "@/utils/supabase/client";
import { Product, ProductIns } from "@/utils/types";

export async function get() {
  let { data, error } = await supabase.from("products").select("*");
  console.log(error);
  return data || [];
}

export async function del(id: number) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  console.log(error);
}

export async function upd(id: number, inp: ProductIns) {
  const { data, error } = await supabase
    .from("products")
    .update(inp)
    .eq("id", id)
    .select();

  console.log(error,data);
}

export async function add(inp: ProductIns) {
  const { data, error } = await supabase
    .from("products")
    .insert([inp])
    .select();
  console.log(error);
}
