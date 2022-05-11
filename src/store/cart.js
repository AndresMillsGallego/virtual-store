const initialState = {
  cartItems: [],
  cartCount: 0
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'add':
      console.log(state)
      return {
        ...state, 
        cartItems: [...state.cartItems, action.payload],
        cartCount: state.cartCount + 1,
      }
    case 'remove':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item !== action.payload),
        cartCount: state.cartCount - 1,
      }
    default:
      return state
  }
}

export const addItem = (item) => {
  return {
    type: 'add',
    payload: item
  }
}

export const removeItem = (item) => {
  return {
    type: 'remove',
    payload: item
  }
}

export default cartReducer;
