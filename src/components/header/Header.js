import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SimpleCart from '../simple-cart/SimpleCart'

const Header = () => {

  const [show, setShow] = useState(false);
  const handleModal = () => setShow(!show)
  let cart = useSelector(state => state.cart)

  return (
    <header>
      <h1>Welcome To Our Store</h1>
      <div id='cart'>
        <ShoppingCartIcon onClick={handleModal} />
        <p>{cart.cartCount}</p>
      </div>
      {show ? <SimpleCart show={show} handleModal={handleModal} /> : null}
    </header>
  )
}

export default Header;