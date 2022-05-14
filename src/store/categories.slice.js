import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categoriesSlice = createSlice ({
  name: 'categories',
  initialState: {
    categories: [],
    isActive: ''
  },
  reducers: {
    setActive(state, action) {
      return {
        ...state,
        isActive: action.payload
      }
    },
    setCategories(state, action) {
      return {
        ...state,
        categories: [action.payload]
      }
    },
    resetCategories(state, action) {
      return {
        ...state,
        isActive: ''
      }
    }
  }
})

export const getCategories = () => async (dispatch, getState) => {
  const { setCategories } = categoriesSlice.actions;
  try {
    let response = await axios.get('https://api-js401.herokuapp.com/api/v1/categories');
    dispatch(setCategories(response.data))
  } catch (error) {
    console.log('Error Setting Categories', error.message)
  }
}


export default categoriesSlice