import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product, User } from "./types";

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // User (will be replaced with Supabase Auth)
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Products (simulated database)
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, "id" | "created_at">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // User state
      user: {
        id: "string",
        email: "string",
        is_admin: true,
        created_at: "string",
        updated_at: "string",
      },
      login: (email, password) => {
        // Simple hardcoded admin login (will be replaced with Supabase Auth)
        if (email === "admin@cyclepro.com" && password === "admin123") {
          set({ user: { id: "1", email, is_admin: true } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),

      // Products state
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: (productData) => {
        const product: Product = {
          ...productData,
          id: Date.now(), // Will be handled by Supabase
          created_at: new Date().toISOString(),
        };
        set({ products: [...get().products, product] });
      },
      updateProduct: (product) => {
        set({
          products: get().products.map((p) =>
            p.id === product.id ? product : p
          ),
        });
      },
      deleteProduct: (productId) => {
        set({ products: get().products.filter((p) => p.id !== productId) });
      },
      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },
      getProductsByCategory: (category) => {
        return get().products.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
      },
      searchProducts: (query) => {
        const products = get().products;
        const lowercaseQuery = query.toLowerCase();
        return products.filter((p) => {
          const detail = p.detail as any;
          return (
            p.name.toLowerCase().includes(lowercaseQuery) ||
            (p.description &&
              p.description.toLowerCase().includes(lowercaseQuery)) ||
            p.category.toLowerCase().includes(lowercaseQuery) ||
            (detail?.brand &&
              detail.brand.toLowerCase().includes(lowercaseQuery))
          );
        });
      },
    }),
    {
      name: "cyclepro-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
      }),
    }
  )
);

export default useStore;
