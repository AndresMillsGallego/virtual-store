import axios from 'axios';

const initialState = {
  categories: [],
  isActive: '',
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      console.log(state.isActive)
      return {
        ...state,
        isActive: action.payload,
      }
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: [action.payload],
      }
    case 'reset':
      return {
        ...state,
        isActive: ''
      }
      
    default:
      return state
  }
}

export const setActive = (category) => {
    return {
      type: 'SET_ACTIVE',
      payload: category,
    }
}

export const getCategories = () => async (dispatch, getState) => {
  let response = await axios.get('https://api-js401.herokuapp.com/api/v1/categories');

  dispatch(setCategories(response.data))
}

export const setCategories = (data) => {
  return {
    type: 'GET_CATEGORIES',
    payload: data,
  }
}

export const reset = () => {
  return {
    type: 'reset'
  }
}

export default categoryReducer;
