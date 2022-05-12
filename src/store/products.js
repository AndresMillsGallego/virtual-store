import axios from 'axios';

const initialState = {
  products: [],
  filteredProducts: [],
}

const productReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      }
    case 'FILTER_PRODUCTS':
      return {
        ...state,
        filteredProducts: state.products.filter(product => 
          product.category === action.payload)
      }
    case 'add':
      return {
        ...state,
        products: state.products.map(product => {
          if (product.name === action.payload.name) {
            product.inStock = product.inStock - 1
          }
          return product;
        })
      }
      case 'remove':
        console.log(state.products)
        return {
          ...state,
          products: state.products.map(product => {
            if (product.name === action.payload) {
              product.inStock = product.inStock + 1
            }
            return product;
          })
        }
    case 'reset':
      return {
        ...state,
        filteredProducts: []
      }
    default:
      return state
  }
}

export const filterProducts = (category) => {
  return {
    type: 'FILTER_PRODUCTS',
    payload: category,
  }
}

export const getProducts = () => async  (dispatch, getState) => {
  let response = await axios.get('https://api-js401.herokuapp.com/api/v1/products');
  dispatch(setProducts(response.data.results));
}

export const setProducts = (data) => {
  return {
    type: 'GET_PRODUCTS',
    payload: data,
  }
}

export const reset = () => {
  return {
    type: 'reset'
  }
}

export default productReducer;
