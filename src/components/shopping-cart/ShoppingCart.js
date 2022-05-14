import React from 'react';
import axios from 'axios';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import cartSlice from '../../store/cart.slice';
import productsSlice from '../../store/products.slice';

import CheckoutForm from '../checkout-form/CheckoutForm'

let { remove } = cartSlice.actions;
let { addStock, filter } = productsSlice.actions;

const ShoppingCart = () => {
  let cart = useSelector(state => state.cart);
  let dispatch = useDispatch();

  const handleDelete = (item) => {
    console.log(item)
    let action = remove(item);
    dispatch(action);
    dispatch(addStock(item))
    dispatch(filter(item.category))
    updateProduct(item, + 1)
  }

  const updateProduct = async (product, step) => {
    let url = `https://api-js401.herokuapp.com/api/v1/products/${product._id}`
    let body = { inStock: product.inStock + step }
    let response = await axios.put(url, body)
    return response;
  }

  let items = cart.cartItems.map(item => (
      <ListItem key={item._id} secondaryAction={<p>${item.price}</p>}>
        <ListItemText primary={item.name} secondary={item.category} />
        <Button onClick={() => handleDelete(item)}><DeleteIcon color='success' /></Button>
      </ListItem>
  ))

  return (
    <>
      <Header />
      <Container>
        <Typography>Your Order</Typography>
        <List sx={{width: '75%', margin: 'auto'}} >{items}
        <ListItem sx={{borderTop: '3px double fireBrick', marginTop: '4rem'}} secondaryAction={<p>${cart.cartTotal.toFixed(2)}</p>}>
        <ListItemText primary={<p>Cart Total</p>}/>
        </ListItem>
        </List>
        <CheckoutForm />
      </Container>
      <Footer />
    </>
  )
}

export default ShoppingCart;
