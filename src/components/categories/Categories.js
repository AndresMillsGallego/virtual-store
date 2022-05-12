import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive, reset, getCategories } from '../../store/categories'
import { filterProducts } from '../../store/products';
import { Button, ButtonGroup } from '@mui/material'

import './categories.css'

const Categories = () => {
  
  const dispatch = useDispatch();
  const categoryState = useSelector(state => state.categories)
  const categories = categoryState.categories

  // const products = useSelector(state => state.products)

  const handleActive = (category) => {
    let set = setActive(category);
    dispatch(set);
    let filter = filterProducts(category);
    dispatch(filter)
  }

  const handleReset = () => {
    dispatch(reset());
  }
 
  useEffect(() => {
    dispatch(getCategories());
  }, [])

  return (
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
  )

}


export default Categories;