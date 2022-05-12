import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/products';
import { addItem } from '../../store/cart'
import { Card, CardContent, Typography, CardActions, Button, Divider, Alert }
  from '@mui/material';
import axios from 'axios'; 
import './products.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const updateProduct = async (product, step) => {
  let url = `https://api-js401.herokuapp.com/api/v1/products/${product._id}`
  let body = {inStock: product.inStock + step}
  let response = await axios.put(url, body)
  console.log(response)
}

const Products = () => {

  const [alert, setAlert] = useState(false);

  const cart = useSelector(state => state.cart);
  const productsState = useSelector(state => state.products)
  
  let dispatch = useDispatch();

  const handleCart = (product) => {
    console.log(cart.cartItems.includes(product))
    if (!cart.cartItems.includes(product)) {
      let action = addItem(product);
      dispatch(action)
      updateProduct(product, -1)
      console.log(product)
    } else {
      setAlert(!alert)
    }
  } 

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  console.log(productsState);
  return (
    <>
      {alert ? <Alert 
                  severity='info' 
                  onClose={() => setAlert(!alert)}
                  id='alert'
                  >--Item Already In Cart!--</Alert> : null}
      <div id='products'>
        {productsState.filteredProducts.length ?
          productsState.filteredProducts.map(product => (
            <Card key={product._id} sx={{ width: '30%', backgroundColor: 'gainsboro' }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  sx={{ borderBottom: '3px double navy', paddingBottom: '5px' }}
                >
                  {product.name}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant='body2' sx={{ width: '85%', margin: 'auto', height: '5rem' }}>
                  {product.description}
                </Typography>
              </CardContent>
              <CardContent variant='div'>
                <CardActions>
                  <div className='card-footer'>
                    <Typography>
                      ${product.price}
                    </Typography>
                    <Divider orientation='vertical'>|</Divider>
                    <Typography>
                      QTY: {product.inStock}
                    </Typography>
                    <Divider orientation='vertical'>|</Divider>
                    <Button
                      size='small'
                      onClick={() => handleCart(product)}
                    >
                      <AddShoppingCartIcon />
                    </Button>
                  </div>
                </CardActions>
              </CardContent>
            </Card>
          )) : null
        }
      </div>
    </>
  )
}


export default Products;
