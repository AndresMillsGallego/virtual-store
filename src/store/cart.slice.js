import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice ({
  name: 'cart',
  initialState: {
    cartItems: [],
    cartCount: 0,
  },
  reducers: {
    add(state, action) {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartCount: state.cartCount + 1,
      }
    },
    remove(state, action) {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.name !== action.payload),
        cartCount: state.cartCount - 1,
      }
    }
  }
})

export default cartSlice;