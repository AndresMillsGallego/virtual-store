import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from './middleware/thunk'
import logger from './middleware/logger'

// import categoryReducer from './categories';
// import productReducer from './products';
// import cartReducer from './cart';
import cartSlice from './cart.slice'
import productsSlice from './products.slice'
import categoriesSlice from './categories.slice'

let reducers = combineReducers({
  categories: categoriesSlice.reducer,
  products: productsSlice.reducer,
  cart: cartSlice.reducer
});

export default function store() {
  return createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)));
}