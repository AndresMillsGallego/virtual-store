import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Alert } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import cartSlice from '../../store/cart.slice'

let { add } = cartSlice.actions;

export const updateProduct = async (product, step) => {
  let url = `https://api-js401.herokuapp.com/api/v1/products/${product._id}`
  let body = { inStock: product.inStock + step }
  let response = await axios.put(url, body)
  return response;
}

const CartButton = (product) => {

  const [alert, setAlert] = useState(false);
  const cart = useSelector(state => state.cart);
  let dispatch = useDispatch();

  const handleCart = (product) => {
    
    if (!cart.cartItems.includes(product)) {
      let cartAdd = add(product);
      dispatch(cartAdd)
      updateProduct(product, -1)
    } else {
      setAlert(!alert)
    }
  }
  return (
    <>
      {alert ? <Alert
        severity='info'
        onClose={() => setAlert(!alert)}
        id='alert'
      >--Item Already In Cart!--</Alert> : null}
      <Button
        size='medium'
        onClick={() => handleCart(product)}
        disabled={product.inStock ? false : true}
      >
        <AddShoppingCartIcon />
      </Button>
    </>
  )
}

export default CartButton;
