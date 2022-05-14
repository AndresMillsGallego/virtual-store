import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from '@mui/material'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Products from '../products/Products';
import categoriesSlice, { getCategories } from '../../store/categories.slice';
import productsSlice from '../../store/products.slice';

import './categories.css'

let { resetCategories, setActive } = categoriesSlice.actions;
let { filter, resetProducts } = productsSlice.actions;

const Categories = () => {

  const dispatch = useDispatch();
  const categoryState = useSelector(state => state.categories)
  const categories = categoryState.categories


  const handleActive = (category) => {
    let set = setActive(category);
    dispatch(set);
    let filterProducts = filter(category);
    dispatch(filterProducts)
  }

  const handleReset = () => {
    dispatch(resetCategories());
    dispatch(resetProducts())
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])

  return (
    <>
    <Header />
      <div id='categories'>
        <h2>Browse Our Categories</h2>
        <ButtonGroup variant='text'>
          {categories.length ?
            categories[0].results.map(category => (
              <Button
                data-testid={category._id}
                key={category._id}
                className='buttons'
                onClick={() => handleActive(category.name)}
                color='primary'
                value={category.name}
              >{category.name}
              </Button>
            )) : null}
          {categoryState.isActive ?
            <Button
              onClick={() => handleReset()}
              className='buttons'
              color='warning'
            >Reset</Button> : null}
        </ButtonGroup>
      </div>
     <Products />
     <Footer />
    </>
  )

}


export default Categories;