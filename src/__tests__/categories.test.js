import { render, screen, fireEvent } from '@testing-library/react'
import Categories from '../components/categories/Categories'
import Products from '../components/products/Products'
import { Provider } from 'react-redux';
import createStore from '../store/index'

test('Should render from the category list and the product list on button click', async () => {
  render (
  <Provider store={createStore()}>
    <Categories />
    <Products />
  </Provider>
  )
  let button = screen.getByTestId('100');
  fireEvent.click(button, {target: {value: 'Funko Pops!'}})

  let category = await screen.findByText(/Funko Pops!/i)
  let product = await screen.findByText(/Steamboat Willie/i)
  expect(product).toBeInTheDocument();
  expect(category).toBeInTheDocument();
})
