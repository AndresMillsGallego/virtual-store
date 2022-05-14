import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, CardActions, Button, Divider, Alert }
  from '@mui/material';
import axios from 'axios';
import './products.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import cartSlice from '../../store/cart.slice'
import productsSlice from '../../store/products.slice'
import { getProducts } from '../../store/products.slice'

let { add } = cartSlice.actions;
let { getDetails, removeStock, filter } = productsSlice.actions; 

export const updateProduct = async (product, step) => {
  let url = `https://api-js401.herokuapp.com/api/v1/products/${product._id}`
  let body = { inStock: product.inStock + step }
  let response = await axios.put(url, body)
  return response;
}

const Products = () => {

  const [alert, setAlert] = useState(false);

  const cart = useSelector(state => state.cart);
  const productsState = useSelector(state => state.products)

  let dispatch = useDispatch();

  const handleCart = (product) => {
    let thisName = cart.cartItems.find(({ name }) => name === product.name)
    if (thisName) {
      if (thisName.name !== product.name) {
        let cartAdd = add(product);
        dispatch(cartAdd)
        dispatch(removeStock(product))
        dispatch(filter(product.category))
        updateProduct(product, -1)
        return;
      } else {
        setAlert(!alert)
        return;
      }
    }
    let cartAdd = add(product);
    dispatch(cartAdd)
    dispatch(removeStock(product))
    dispatch(filter(product.category))
    updateProduct(product, -1)
  }

  const handleDetails = (id) => {
    let action = getDetails(id);
    dispatch(action)
  }
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

 
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
            <Card key={product._id} sx={{ width: '30%', backgroundColor: 'gainsboro', marginTop: '2rem' }}>
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
                  <div className='product-buttons'>
                    <Button
                      size='medium'
                      onClick={() => handleCart(product)}
                      disabled={product.inStock > 0 ? false : true}
                    >
                      <AddShoppingCartIcon  />
                    </Button>
                    <Button size='medium' onClick={() => handleDetails(product._id)}>
                      <Link to='/virtual-store/product-details' className='links' ><InfoIcon /></Link>
                    </Button>
                  </div>
                </CardActions>
                <div className='card-footer'>
                  <Typography>
                    ${product.price}
                  </Typography>
                  <Divider orientation='vertical'>|</Divider>
                  <Typography>
                    QTY: {product.inStock}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          )) : null
        }
      </div>
    </>
  )
}


export default Products;
