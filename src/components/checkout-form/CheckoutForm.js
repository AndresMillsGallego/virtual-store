import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import './checkout-form.css'


const CheckoutForm = () => {

  return (
    <Container component='form' id='forms'>
      <Box className='cart-forms'>
        <Typography>Billing Address</Typography>
        <TextField label='Full Name' variant='standard' />
        <TextField label='Street Address' variant='standard' />
        <TextField label='City' variant='standard' />
        <TextField label='State' variant='standard' />
        <TextField label='Zip' variant='standard' />
      </Box>
      <Box className='cart-forms'>
        <Typography>Payment Details</Typography>
        <TextField label='Credit Card #' variant='standard' sx={{marginBottom: '2rem'}}/>
        <input type='date'/>
        <TextField label='CVV' variant='standard'/>
        <Button type='click' sx={{marginTop: '50%'}} variant='outlined'>Submit</Button>
      </Box>
    </Container>
  )
}


export default CheckoutForm;
