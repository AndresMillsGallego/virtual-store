import React from 'react';
import { connect } from 'react-redux';
import { filterProducts, reset } from '../../store/products';
import { Card, CardContent, Typography, CardActions, Button }
  from '@mui/material'
import './products.css'
import Icon from '@mui/material/Icon';

const Products = ({ products, filteredProducts }) => {
  console.log(products, filteredProducts)
  return (
    <div id='products'>
      {filteredProducts.length ?
        filteredProducts.map(product => (
          <Card key={product.id} sx={{ width: '30%',  backgroundColor: 'gainsboro' }}>
            <CardContent>
              <Typography 
                gutterBottom 
                variant='h5' 
                sx={{borderBottom: '3px double navy', paddingBottom: '10px'}}
                >
                {product.name}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant='body2' sx={{ width: '85%', margin: 'auto' }}>
                {product.description}
              </Typography>
            </CardContent>
            <CardContent variant='div' className='card-footer'>
              <CardActions>
                <Button size='small' sx={{ color: 'red', fontSize: '2rem' }}>♥</Button>
                <Button size='small'><Icon sx={{ color: 'orchid', padding: '1rem' }}>add_circle</Icon></Button>
              </CardActions>
              <Typography>
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        )) : null
      }
    </div>

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
