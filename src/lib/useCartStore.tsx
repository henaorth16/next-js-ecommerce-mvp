import { create } from 'zustand'
import { persist, PersistStorage } from 'zustand/middleware'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type CartStore = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const storage: PersistStorage<CartStore> = {
  getItem: (name) => {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem(name)
      return value ? JSON.parse(value) : null
    }
    return null
  },
  setItem: (name, value) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(name, JSON.stringify(value))
    }
  },
  removeItem: (name) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(name)
    }
  },
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id)
          return existingItem
            ? { cart: state.cart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) }
            : { cart: [...state.cart, { ...item, quantity: 1 }] }
        }),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)),
      })),
      clearCart: () => set({ cart: [] }),
      getTotalItems: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      storage,
    }
  )
)
