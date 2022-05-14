import React from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useSelector } from 'react-redux';
import { Container, Typography, List, ListItem, ListItemText, } from '@mui/material'

import CheckoutForm from '../checkout-form/CheckoutForm'


const ShoppingCart = () => {
  let cart = useSelector(state => state.cart);

  let items = cart.cartItems.map(item => (
      <ListItem key={item._id} secondaryAction={<p>${item.price}</p>}>
        <ListItemText primary={item.name} secondary={item.category} />
      </ListItem>
  ))

  return (
    <>
      <Header />
      <Container>
        <Typography>Your Order</Typography>
        <List sx={{width: '75%', margin: 'auto'}} >{items}
        <ListItem sx={{borderTop: '3px double fireBrick', marginTop: '4rem'}} secondaryAction={<p>${cart.cartTotal}</p>}>
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
