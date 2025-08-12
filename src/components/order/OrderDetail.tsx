"use client"
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { updateCart } from "@/utils/cart";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

function OrderDetail({ cartProp }: { cartProp: any }) {
    let [cart,setCart] = useState(cartProp);
  return (
    <div className="col-md-4">
      <h3 className="text-2xl font-bold mb-10">Order Summary</h3>
      <div className="space-y-2">
        <div className="lg:col-span-2 space-y-4 overflow-auto h-[30vh]">
          {cart.map((item: any) => (
            <div
              key={item.id}
              className="bg-background border border-white/10 rounded-lg p-6"
            >
              <div className="flex space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img
                    src={item.products.image?.[0] || "/default.png"}
                    alt={item.products.name}
                    className="object-cover rounded-lg"
                    sizes="96px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="text-white font-semibold hover:text-gray-300 transition-colors">
                      {item.products.name}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm">
                    {item.products.category.replace("-", " ").toUpperCase()}
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-white/20 rounded-lg">
                      <button
                        onClick={() => {
                          setCart(
                            cart.map((c:any) =>
                              c.id === item.id
                                ? {
                                    ...c,
                                    quantity: Math.max(c.quantity - 1, 0),
                                  }
                                : c
                            )
                          );
                          updateCart(item.id, {
                            quantity: Math.max(item.quantity - 1, 0),
                          });
                        }}
                        className="p-2 text-white hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 text-white min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          setCart(
                            cart.map((c:any) =>
                              c.id === item.id
                                ? {
                                    ...c,
                                    quantity: Math.max(c.quantity + 1, 0),
                                  }
                                : c
                            )
                          );
                          updateCart(item.id, {
                            quantity: Math.max(item.quantity + 1, 0),
                          });
                        }}
                        className="p-2 text-white hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-4">
                  <p className="text-xl font-bold text-white">
                    ${item.products.price.toFixed(2)}
                  </p>

                  <p className="text-sm text-gray-400">
                    Subtotal: $
                    {(item.products.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>৳1500</span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
