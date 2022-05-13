import './App.css';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Categories from './components/categories/Categories';
import Products from './components/products/Products';
import ShoppingCart from './components/shopping-cart/ShoppingCart'
import Store from './assets/store.jpg'

import { BrowserRouter, Routes, Route } from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/virtual-store' element={[<Header />, <img src={Store} alt='store' id='store-front'/>, <Footer />]} />
          <Route path='/virtual-store/categories' element={<Categories />}/>
          <Route path='/virtual-store/products' element={[<Products />]} />
          <Route path='/virtual-store/cart' element={<ShoppingCart />} /> 
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
