import React from 'react';
import { useState } from 'react';
import './footer.css'

const Footer = () => {

  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    setShow(!show);
  }

  return (
    <footer>
    <p onClick={handleClick} id="me">Andres Mills Gallego &copy; 2022</p>
    {
      show ?
      <p>➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟</p>
      : null
    }
    <div id='links'>
      <a href='https://github.com/AndresMillsGallego'>GitHub</a>
      <a href='https://www.linkedin.com/in/andres-mills-gallego/'>LinkedIn</a>
    </div>
  </footer>
  )
}

export default Footer;