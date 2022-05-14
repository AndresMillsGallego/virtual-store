import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice ({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
  },
  reducers: {
    add(state, action) {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartCount: state.cartCount + 1,
        cartTotal: state.cartTotal + action.payload.price,
      }
    },
    remove(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.name !== action.payload.name),
        cartCount: state.cartCount - 1,
        cartTotal: state.cartTotal - action.payload.price,
      }
    }
  }
})

export default cartSlice;