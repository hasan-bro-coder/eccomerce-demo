"use server";
import { supabase } from "@/utils/supabase/client";
import { Cart, Tables } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/utils/supabase/server";

export async function submit(
  userdata: Tables<"order_details">,
  products: Cart[]
) {
  const { data: order,error: e } = await supabase
    .from("orders")
    .insert({
      user_id: (await (await createClient()).auth.getUser()).data.user?.id,
      state: "pending",
    })
    .select()
    .single();
    console.error(e);

  const { data: op,error: ope } = await supabase.from("order_products").insert(
    products.map((p) => {
      return {
        order_id: order?.id,
        product_id: p.product,
        quantity: p.quantity,
        price: 0,
      };
    })
  );
    console.error(ope);

    const { data: od, error: ode } = await supabase
      .from("order_details")
      .insert({order_id: order?.id,...userdata})
      .select()
      .single();
    console.error(ode);

  // 3. Update total amount
//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   await supabase
//     .from("orders")
//     .update({ total_amount: total })
//     .eq("id", order.id);
  //   const { data: od, error: ode } = await supabase
  //     .from("order_details")
  //     .insert([userdata])
  //     .select();
  //     console.error(ode);

  //   let order_product_id = uuidv4();
  //   const { data: op, error: ope } = await supabase
  //     .from("order_products")
  //     .insert(
  //       products.map((p) => {
  //         return {
  //           uid: order_product_id,
  //           product_id: p.product,
  //           quantity: p.quantity,
  //           price: 0,
  //         };
  //       })
  //     )
  //     .select();
  //     console.error(ope);

  //     const { data, error } = await supabase
  //   .from('orders')
  //   .insert([
  //     {
  //         state: "pending",
  //         products_id: order_product_id,
  //         details_id: od?.[0].uid,
  //         user_id: (await ((await createClient()).auth.getUser())).data.user?.id
  //     },
  //   ])
  //   .select()
  //   console.error(error);
}
