import { createContext, useContext, useReducer, useState } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const key = `${action.payload.id}__${action.payload.variant ?? ''}`
      const existing = state.items.find(i => i._key === key)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._key === key ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, _key: key, quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i._key !== action.key) }

    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i._key !== action.key) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i._key === action.key ? { ...i, quantity: action.quantity } : i
        ),
      }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0)

  function addItem(item) {
    dispatch({ type: 'ADD_ITEM', payload: item })
    setIsOpen(true)
  }

  function removeItem(key) {
    dispatch({ type: 'REMOVE_ITEM', key })
  }

  function updateQty(key, quantity) {
    dispatch({ type: 'UPDATE_QTY', key, quantity })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems,
      totalPrice,
      isOpen,
      setIsOpen,
      addItem,
      removeItem,
      updateQty,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
