import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const productsSlice = createSlice ({
  name: 'products',
  initialState: {
    products: [],
    filteredProducts: [],
    selectedProduct: [],
  },
  reducers: {
    setProducts(state, action) {
      return {
        ...state,
        products: action.payload
      }
    },
    filter(state, action) {
      return {
        ...state,
        filteredProducts: state.products.filter(product => 
          product.category === action.payload)
      }
    },
    getDetails(state, action) {
      return {
        ...state,
        selectedProduct: state.products.filter(product => product._id === action.payload)
      }
    },
    remove(state, action) {
      return {
        ...state,
        products: state.products.forEach(product => {
          if (product.name === action.payload.name) {
            product.inStock = product.inStock - 1
          }
        })
      }
    },
    addStock(state, action) {
      return {
        ...state,
        products: state.products.map(product => {
          if (product.name === action.payload) {
            product.inStock = product.inStock + 1
          }
          return product;
        })
      }
    },
    resetProducts(state, action) {
      return {
        ...state,
        filteredProducts: []
      }
    }
  }
})


export const getProducts = () => async (dispatch, getState) => {
  const { setProducts } = productsSlice.actions;
  try {
    let response = await axios.get('https://api-js401.herokuapp.com/api/v1/products')
    dispatch(setProducts(response.data.results))
  } catch (error) {
    console.log('Error Setting Products', error.message)
  }
}

export default productsSlice;