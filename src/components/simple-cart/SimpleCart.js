import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem } from '../../store/cart'
import { Modal, Button, Typography, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import './simpleCart.css'

const style = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 'fitContent',
  bgcolor: 'floralWhite',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 2,
};

const SimpleCart = (props) => {

  let cart = useSelector(state => state.cart)
  let dispatch = useDispatch();

  const handleDelete = (item) => {
    let action = removeItem(item);
    dispatch(action);
  }
  

  return (
    <Modal
      open={props.show}
      onClose={props.handleModal}
    >
      <Box sx={style}>
        <div id='cart-header'>
        <Typography variant='h5'>Your Cart</Typography>
        <Button onClick={props.handleModal}><ClearIcon sx={{color: 'black'}} /></Button>
        </div>
        {cart.cartItems.length ?
          cart.cartItems.map(item => (
            <div key={item._id} className='cart-items'>
            <Typography>{item.name}</Typography>
            <Button onClick={() => handleDelete(item.name)}><DeleteIcon color='secondary' /></Button>
            </div>
          ))
          : <Typography sx={{textAlign: 'center', marginTop: '4rem', marginBottom: '1rem'}}>Cart Empty</Typography>
        }
        {cart.cartItems.length ?
          <Button id='checkout'><Link to='/virtual-store/cart' className='links' >Checkout</Link></Button>
          : null
        }
      </Box>
    </Modal>
  )
}


export default SimpleCart;