import React, { useState } from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography, Card, CardContent, Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import cartSlice from '../../store/cart.slice';
import { updateProduct } from '../products/Products';

import './product-details.css'
let { add } = cartSlice.actions

const ProductDetails = () => {

  const [alert, setAlert] = useState(false);

  let products = useSelector(state => state.products)
  let selected = products.selectedProduct[0];
  const cart = useSelector(state => state.cart)
  let dispatch = useDispatch();

  let relatedProducts = products.products.filter(product => product.category === selected.category && selected.name !== product.name)

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
      <Header />
      <Container>
        <Card id='main-card'>
          <CardContent>
            <Typography variant='h2'>{selected.name}</Typography>
            <Typography variant='h5'>{selected.category}</Typography>
          </CardContent>
          <Button
            size='medium'
            onClick={() => handleCart(selected)}
            disabled={selected.inStock ? false : true}
          >
            <AddShoppingCartIcon />
          </Button>
          <CardContent className='card-footer'>
            <Typography variant='p'>Stock Qty: {selected.inStock}</Typography>
            <Typography variant='p'>${selected.price}</Typography>
          </CardContent>
        </Card>
        <Typography
          variant='h3'
          sx={{ borderBottom: '3px double navy', width: '75%', margin: '2rem auto' }}
        >Related Products</Typography>
        <Container id='related'>
          {relatedProducts.length ?
            relatedProducts.map(product => (
              <Card key={product._id} sx={{ backgroundColor: 'gainsboro', width: '25%' }}>
                <CardContent>
                  <Typography variant='h5'>{product.name}</Typography>
                  <Typography variant='p'>{product.category}</Typography>
                </CardContent>
                <Button
                  size='medium'
                  onClick={() => handleCart(product)}
                  disabled={product.inStock ? false : true}
                >
                  <AddShoppingCartIcon />
                </Button>
                <CardContent className='card-footer'>
                  <Typography variant='p'>Stock Qty: {product.inStock}</Typography>
                  <Typography variant='p'>${product.price}</Typography>
                </CardContent>
              </Card>

            )) : null
          }
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default ProductDetails;
