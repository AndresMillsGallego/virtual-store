import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { filterProducts, reset } from '../../store/products';
import { addItem } from '../../store/cart'
import { Card, CardContent, Typography, CardActions, Button, Divider, Alert }
  from '@mui/material'
import './products.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Products = ({ products, filteredProducts }) => {

  const [alert, setAlert] = useState(false);

  let cart = useSelector(state => state.cart);
  let dispatch = useDispatch();

  const handleCart = (item) => {
    let action = addItem(item);
    if (!cart.cartItems.includes(item)) {
      dispatch(action);
    } else {
      setAlert(!alert)
    }
  }


  console.log(cart);
  return (
    <>
      {alert ? <Alert 
                  severity='info' 
                  onClose={() => setAlert(!alert)}
                  id='alert'
                  >--Item Already In Cart!--</Alert> : null}
      <div id='products'>
        {filteredProducts.length ?
          filteredProducts.map(product => (
            <Card key={product.id} sx={{ width: '30%', backgroundColor: 'gainsboro' }}>
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
                      QTY: {product.inventory}
                    </Typography>
                    <Divider orientation='vertical'>|</Divider>
                    <Button
                      size='small'
                      onClick={() => handleCart(product.name)}
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

const mapStateToProps = ({ products }) => {
  return {
    products: products.products,
    filteredProducts: products.filteredProducts,
  }
}

const mapDispatchToProps = {
  filterProducts,
  reset,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
