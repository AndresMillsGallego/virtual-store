import React from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { useSelector } from 'react-redux'
import { Container, Typography, Card, CardContent } from '@mui/material'
import './product-details.css'

const ProductDetails = () => {

  let products = useSelector(state => state.products)
  let selected = products.selectedProduct[0];

  let relatedProducts = products.products.filter(product => product.category === selected.category)


  return (
    <>
      <Header />
      <Container>
        <Card id='main-card'>
          <CardContent>
            <Typography variant='h2'>{selected.name}</Typography>
            <Typography variant='h5'>{selected.category}</Typography>
          </CardContent>
          <CardContent className='card-footer'>
            <Typography variant='p'>Stock Qty: {selected.inStock}</Typography>
            <Typography variant='p'>${selected.price}.00</Typography>
          </CardContent>
        </Card>
          <Typography 
            variant='h3' 
            sx={{borderBottom: '3px double navy', width: '75%', margin: '2rem auto'}}
            >Related Products</Typography>
        <Container id='related'>
          {relatedProducts.length ?
            relatedProducts.map(product => (
              <Card key={product.key} sx={{backgroundColor: 'gainsboro', width: '25%'}}>
                <CardContent>
                  <Typography variant='h5'>{product.name}</Typography>
                  <Typography variant='p'>{product.category}</Typography>
                </CardContent>
                <CardContent className='card-footer'>
                  <Typography variant='p'>Stock Qty: {product.inStock}</Typography>
                  <Typography variant='p'>${product.price}.00</Typography>
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
