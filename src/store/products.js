const initialState = {
  products: [
    {
      id: 101,
      category: 'funkoPops', 
      name: 'Steamboat Willie', 
      description: 'Classic Disney from Mickey\'s first ever film! Funko #425', 
      price: 12.99, 
      inventory: 10,
    },
    {
      id: 102,
      category: 'funkoPops', 
      name: 'Dug (Flocked)', 
      description: 'Flocked version of Dug from Pixar\'s movie UP! Funko #201', 
      price: 49.99,
      inventory: 12,
    },
    {
      id: 103,
      category: 'funkoPops', 
      name: 'Babu Frik', 
      description: 'Limited edition Babu Frik from the Smuggler\'s Bounty exclusive! Funko #201', 
      price: 29.99,
      inventory: 43,
    },
    {
      id: 201,
      category: 'gpks', 
      name: 'Up Chuck', 
      description: 'Excellent condition, a rare find indeed! First Series 3a', 
      price: 10.99,
      inventory: 13,
    },
    {
      id: 202,
      category: 'gpks', 
      name: 'Nasty Nick', 
      description: 'The first ever Garbage Pail Kid! First Series 1a', 
      price: 42.99,
      inventory: 666,
    },
    {
      id: 203,
      category: 'gpks', 
      name: 'Joe Blow', 
      description: 'A hilarious take on the classic Bazooka Joe! Third Series 34a', 
      price: 10.99,
      inventory: 101,
    },
  ],
  filteredProducts: [],
}

const productReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'funkoPops':
      return {
        ...state,
        filteredProducts: state.products.filter(product => 
          product.category === 'funkoPops')
      }
    case 'gpk':
      return {
        ...state,
        filteredProducts: state.products.filter(product => product.category === 'gpks')
      }
    case 'add':
      return {
        ...state,
        products: state.products.map(product => {
          if (product.name === action.payload) {
            product.inventory = product.inventory - 1
          }
          return product;
        })
      }
      case 'remove':
        return {
          ...state,
          products: state.products.map(product => {
            if (product.name === action.payload) {
              product.inventory = product.inventory + 1
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
  if (category === 'funkoPops') {
    return {
      type: 'funkoPops',
      payload: category
    }
  } else {
    return {
      type: 'gpk', 
      payload: category
    }
  }
}

export const reset = () => {
  return {
    type: 'reset'
  }
}

export default productReducer;
