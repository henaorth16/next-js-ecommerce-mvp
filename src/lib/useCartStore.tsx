import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

type CartItem = {
  id: string;
  imagePath: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const storage: PersistStorage<CartStore> = {
  getItem: (name) => {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    }
    return null;
  },
  setItem: (name, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },
  removeItem: (name) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(name);
    }
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          return existingItem
            ? {
                cart: state.cart.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              }
            : { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((item) => item.id !== id)
              : state.cart.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                ),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      getTotalItems: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage,
    }
  )
);
