import React from 'react';
import { connect } from 'react-redux';
import { setActive, reset } from '../../store/categories'
import { Button, ButtonGroup } from '@mui/material'

import './categories.css'

const Categories = ({ categories, isActive, setActive, reset }) => {
  console.log(categories, isActive)
  return (
    <div id='categories'>
      <h2>Browse Our Categories</h2>
      <ButtonGroup variant='text'>
        {categories.map(category => (
          <Button
            data-testid={category.id}
            key={category.id}
            className='buttons'
            onClick={() => setActive(category.name)}
            color='primary'
            value={category.displayName}
          >{category.displayName}
          </Button>
        ))}
        {isActive ?
          <Button
            onClick={() => reset()}
            className='buttons'
            color='warning'
          >Reset</Button> : null}
      </ButtonGroup>
    </div>
  )

}

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.categories,
    isActive: categories.isActive,
  }
}

const mapDispatchToProps = {
  setActive,
  reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);