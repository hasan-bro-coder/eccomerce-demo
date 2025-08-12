"use server";

import { supabase } from "./supabase/client";
import { Product, Cart, User, CartIns, CartUpd } from "./types";
import { createClient } from "@/utils/supabase/server";

async function getCart() {
  const supabaseServer = await createClient();
  const { data: {user}, error: userError } = await supabaseServer.auth.getUser();
  if (user && user?.id) {
    let { data: cart, error: cartError } = await supabase
      .from("cart")
      .select(`
      *,
      products (
        *
      )
    `)
      .eq("user_id", user.id);

    if (cartError) {
      console.error("Error fetching cart items:", cartError);
      throw cartError;
    }
    return cart;
  } else if (userError) {
    console.error("Error fetching user:", userError);
    throw userError;
  }
  throw new Error("User not logged in");
}

async function updateCart(id: number, udata: CartUpd) {
  const supabaseServer = await createClient();
  const { data: {user}, error: userError } = await supabaseServer.auth.getUser();
  if (user?.id) {
    const { data, error: updateError } = await supabase
      .from("cart")
      .update(udata)
      .eq("id", id)
      .eq("user_id", user?.id)
      .select();

    if (updateError) {
      console.error("Error updating cart item:", updateError);
      throw updateError;
    }
    return data;
  } else if (userError) {
    console.error("Error fetching user:", userError);
    throw userError;
  }
  throw new Error("User not logged in");
}

async function addCart(product: string, quantity?: number) {
  const supabaseServer = await createClient();
  const { data: {user}, error: userError } = await supabaseServer.auth.getUser();
  if (user?.id) {
    const { data, error: insertError } = await supabase
      .from("cart")
      .insert([{ user_id: user?.id, quantity: quantity || 1, product }])
      .select();

    if (insertError) {
      console.error("Error adding cart item:", insertError);
      throw insertError;
    }
    return data;
  } else if (userError) {
    console.error("Error fetching user:", userError);
    throw userError;
  }
  throw new Error("User not logged in");
}

async function removeCart(id: number) {
  const { error } = await supabase.from("cart").delete().eq("id", id);
  if (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
}

async function clearCart() {
  const supabaseServer = await createClient();
  const { data: {user}, error: userError } = await supabaseServer.auth.getUser();
  if (user?.id) {
    const { error: deleteError } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Error clearing cart:", deleteError);
      throw deleteError;
    }
  } else if (userError) {
    console.error("Error fetching user:", userError);
    throw userError;
  }
  throw new Error("User not logged in");
}

async function getCartTotal() {
  const supabaseServer = await createClient();
  const { data: {user}, error: userError } = await supabaseServer.auth.getUser();
  if (user?.id) {
    let { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select("products(price), quantity")
      .eq("user_id", user.id);

    if (cartError) {
      console.error("Error fetching cart items:", cartError);
      throw cartError;
    }
    if (cartItems)
      return cartItems.reduce((total, item) => {
        return total + item.products.price * item.quantity;
      }, 0);
  } else if (userError) {
    console.error("Error fetching user:", userError);
    throw userError;
  }
  throw new Error("User not logged in");
}

export { addCart, getCart, removeCart, clearCart, updateCart, getCartTotal };

// if (user && user?.id) {
//   const { data, error } = await supabase
//     .from("cart")
//     .select("*")
//     .eq("user_id", user?.id);
// }

// interface StoreState {
//   cart: CartItem[];
// }

// const useStore = create<StoreState>()(
//   persist(
//     (set,get) => ({
//       cart: [],
//       addToCart: (product: Product, quantity = 1) => {
//         const { cart } = get();
//         const existingItem = cart.find((item) => item.id === product.id);

//         if (existingItem) {
//           set({
//             cart: cart.map((item) =>
//               item.id === product.id
//                 ? { ...item, quantity: item.quantity + quantity }
//                 : item
//             ),
//           });
//         } else {
//           set({ cart: [...cart, { ...product, quantity }] });
//         }
//       },
//       removeFromCart: (productId) => {
//         set({ cart: get().cart.filter((item) => item.id !== productId) });
//       },
//       updateQuantity: (productId, quantity) => {
//         if (quantity <= 0) {
//           get().removeFromCart(productId);
//           return;
//         }
//         set({
//           cart: get().cart.map((item) =>
//             item.id === productId ? { ...item, quantity } : item
//           ),
//         });
//       },
//       clearCart: () => set({ cart: [] }),
//       getCartTotal: () => {
//         return get().cart.reduce(
//           (total, item) => total + item.price * item.quantity,
//           0
//         );
//       },
//       getCartCount: () => {
//         return get().cart.reduce((count, item) => count + item.quantity, 0);
//       },
//       //       user: null,
//       //       fetchUserData: async () => {
//       //         const { data, error } = await supabase.auth.getUser();
//       //         if (error) {
//       //           console.error("Error fetching user data:", error);
//       //         } else {
//       //           set({ user: data.user });
//       //         }
//       //       },
//       //       fetchCartData: async () => {
//       //         const { data, error } = await supabase
//       //           .from("cart")
//       //           .select("*")
//       //           .eq("user_id", supabase.auth.user()?.id);

//       //         if (error) {
//       //           console.error("Error fetching cart data:", error);
//       //         } else {
//       //           set({ cart: data as CartItem[] });
//       //         }
//       //       },
//     }),
//     {
//       name: "cyclepro-store",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useStore;

// interface StoreState {
//   // Cart
//   cart: CartItem[];
//   addToCart: (product: Product, quantity?: number) => void;
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   clearCart: () => void;
//   getCartTotal: () => number;
//   getCartCount: () => number;

//   // User (will be replaced with Supabase Auth)
//   user: User | null;
//   login: (email: string, password: string) => boolean;
//   logout: () => void;

//   // Products (simulated database)
//   products: Product[];
//   setProducts: (products: Product[]) => void;
//   addProduct: (product: Omit<Product, "id" | "created_at">) => void;
//   updateProduct: (product: Product) => void;
//   deleteProduct: (productId: number) => void;
//   getProductById: (id: number) => Product | undefined;
//   getProductsByCategory: (category: string) => Product[];
//   searchProducts: (query: string) => Product[];
// }

// const useStore = create<StoreState>()(
//   persist(
//     (set, get) => ({
//       // Cart state
//       cart: [],
//       addToCart: (product, quantity = 1) => {
//         const { cart } = get();
//         const existingItem = cart.find((item) => item.id === product.id);

//         if (existingItem) {
//           set({
//             cart: cart.map((item) =>
//               item.id === product.id
//                 ? { ...item, quantity: item.quantity + quantity }
//                 : item
//             ),
//           });
//         } else {
//           set({ cart: [...cart, { ...product, quantity }] });
//         }
//       },
//       removeFromCart: (productId) => {
//         set({ cart: get().cart.filter((item) => item.id !== productId) });
//       },
//       updateQuantity: (productId, quantity) => {
//         if (quantity <= 0) {
//           get().removeFromCart(productId);
//           return;
//         }
//         set({
//           cart: get().cart.map((item) =>
//             item.id === productId ? { ...item, quantity } : item
//           ),
//         });
//       },
//       clearCart: () => set({ cart: [] }),
//       getCartTotal: () => {
//         return get().cart.reduce(
//           (total, item) => total + item.price * item.quantity,
//           0
//         );
//       },
//       getCartCount: () => {
//         return get().cart.reduce((count, item) => count + item.quantity, 0);
//       },

//       // User state
//       user: {
//         id: "string",
//         email: "string",
//         is_admin: true,
//         created_at: "string",
//         updated_at: "string",
//       },
//       login: (email, password) => {
//         // Simple hardcoded admin login (will be replaced with Supabase Auth)
//         if (email === "admin@cyclepro.com" && password === "admin123") {
//           set({ user: { id: "1", email, is_admin: true } });
//           return true;
//         }
//         return false;
//       },
//       logout: () => set({ user: null }),

//       // Products state
//       products: [],
//       setProducts: (products) => set({ products }),
//       addProduct: (productData) => {
//         const product: Product = {
//           ...productData,
//           id: Date.now(), // Will be handled by Supabase
//           created_at: new Date().toISOString(),
//         };
//         set({ products: [...get().products, product] });
//       },
//       updateProduct: (product) => {
//         set({
//           products: get().products.map((p) =>
//             p.id === product.id ? product : p
//           ),
//         });
//       },
//       deleteProduct: (productId) => {
//         set({ products: get().products.filter((p) => p.id !== productId) });
//       },
//       getProductById: (id) => {
//         return get().products.find((p) => p.id === id);
//       },
//       getProductsByCategory: (category) => {
//         return get().products.filter(
//           (p) => p.category.toLowerCase() === category.toLowerCase()
//         );
//       },
//       searchProducts: (query) => {
//         const products = get().products;
//         const lowercaseQuery = query.toLowerCase();
//         return products.filter((p) => {
//           const detail = p.detail as any;
//           return (
//             p.name.toLowerCase().includes(lowercaseQuery) ||
//             (p.description &&
//               p.description.toLowerCase().includes(lowercaseQuery)) ||
//             p.category.toLowerCase().includes(lowercaseQuery) ||
//             (detail?.brand &&
//               detail.brand.toLowerCase().includes(lowercaseQuery))
//           );
//         });
//       },
//     }),
//     {
//       name: "cyclepro-store",
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         cart: state.cart,
//         user: state.user,
//       }),
//     }
//   )
// );

// export default useStore;
