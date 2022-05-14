import axios from 'axios';

const initialState = {
  products: [],
  filteredProducts: [],
  selectedProduct: [],
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
    case 'GET_DETAILS':
      return {
        ...state,
        selectedProduct: state.products.filter(product => product._id === action.payload)
      }
    case 'remove':
      return {
        ...state,
        products: state.products.map(product => {
          if (product.name === action.payload.name) {
            product.inStock = product.inStock - 1
          }
          return product;
        })
      }
      case 'add':
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

export const getDetails = (id) => {
  return {
    type: 'GET_DETAILS',
    payload: id
  }
}

export const removeStock = (product) => {
  return {
    type: 'remove',
    payload: product
  }
}

export const addStock = (product) => {
  return {
    type: 'add',
    payload: product
  }
}

export const reset = () => {
  return {
    type: 'reset'
  }
}

export default productReducer;
