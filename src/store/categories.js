const initialState = {
  categories: [
    {
      name: 'funkoPops', 
      displayName: 'Funko Pops!', 
      description: 'Find your favorite collectible Funko Pops! here 😁',
      id: 100,
    },
    {
      name: 'gpks',
      displayName: 'Garbage Pail Kids',
      description: 'Add to your collection of gross GPS\'s here!',
      id: 201,
    },
  ],
  isActive: '',
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'funkoPops':
      return {
        ...state,
        isActive: 'funkoPops',
      }
    case 'gpk':
      return {
        ...state,
        isActive: 'gpks',
      }
    case 'reset':
      return initialState;
      
    default:
      return state
  }
}

export const setActive = (category) => {
  if (category === 'funkoPops'){
    return {
      type: 'funkoPops',
      payload: category,
    }
  } else {
    return {
      type: 'gpk',
      payload: category,
    }
  }
}

export const reset = () => {
  return {
    type: 'reset'
  }
}

export default categoryReducer;
