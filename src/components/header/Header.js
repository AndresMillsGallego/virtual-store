import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import './header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, ButtonGroup } from '@mui/material'
import SimpleCart from '../simple-cart/SimpleCart'

const Header = () => {

  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show)
  
  let cart = useSelector(state => state.cart)

  return (
    <>
      <header>
        <h1>Welcome To Our Store</h1>
        <ButtonGroup variant='text'>
          <Button ><Link  to='/virtual-store' className='links' >Home</Link></Button>
          <Button ><Link  to='/virtual-store/categories' className='links'>Categories</Link></Button>
          <Button ><Link to='/virtual-store/products' className='links'>Products</Link></Button>
        </ButtonGroup>
        <div id='cart'>
          <ShoppingCartIcon onClick={handleModal} />
          <p>{cart.cartCount}</p>
        </div>
        {show ? <SimpleCart show={show} handleModal={handleModal} /> : null}
      </header>
    </>
  )
}

export default Header;