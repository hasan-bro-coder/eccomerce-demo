// "use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCart, getCartTotal } from "@/utils/cart";
import Cart from "@/components/Cart";

// import useStore from '@/utils/store';
// import { getCart } from '@/utils/store';

export default async function CartPage() {
  // console.log(
  let cart = await getCart() || []

  // const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore();
  const total = await getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
            <div className="bg-background rounded-lg p-12">
              <div className="text-gray-400 mb-6">Your cart is empty</div>
              <Link
                href="/products"
                className="border-red-600 text-red-400 hover:bg-red-900"
              >
                <Button className="w-full bg-white text-gray-950 hover:bg-gray-200">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }


    return <Cart cartProp={cart}></Cart>;
}


