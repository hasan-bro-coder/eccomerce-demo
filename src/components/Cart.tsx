"use client";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { clearCart, removeCart, updateCart } from "@/utils/cart";
import { useEffect, useState } from "react";

export default function ClientSide({
  cartProp,
}: {
  cartProp: any[];
}) {
  const [cart, setCart] = useState<any[]>(cartProp);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(cart.reduce((ttl, item) => ttl + item.products.price * item.quantity, 0));
  }, [cart]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/products">
            <Button variant="ghost" className="text-white hover:text-gray-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-white mb-8">
          Your Cart ({cart.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
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
                  </div>

                  <div className="flex flex-col items-end space-y-4">
                    <p className="text-xl font-bold text-white">
                      ${item.products.price.toFixed(2)}
                    </p>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-white/20 rounded-lg">
                        <button
                          onClick={() => {
                            setCart(
                              cart.map((c) =>
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
                              cart.map((c) =>
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

                      <button
                        onClick={() => {
                          setCart(cart.filter((c) => c.id !== item.id));
                          removeCart(item.id);
                        }}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-400">
                      Subtotal: $
                      {(item.products.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Button
                onClick={clearCart}
                variant="outline"
                className="border-red-500/20 text-red-400 hover:bg-red-500/10"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-background border border-white/10 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Shipping:</span>
                <span className="text-white">
                  {total >= 100 ? "Free" : "$9.99"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Tax:</span>
                <span className="text-white">${(total * 0.08).toFixed(2)}</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-white">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-white">
                    $
                    {(total + (total >= 100 ? 0 : 9.99) + total * 0.08).toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full bg-white text-black hover:bg-gray-200">
                Proceed to Checkout
              </Button>
            </Link>

            {total < 100 && (
              <p className="text-sm text-gray-400 mt-4 text-center">
                Add ${(100 - total).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
