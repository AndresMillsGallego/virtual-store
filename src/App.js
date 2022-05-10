import './App.css';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Categories from './components/categories/Categories';
import Products from './components/products/Products';

function App() {
  return (
    <div className="App">
      <Header />
      <Categories />
      <Products /> 
      <Footer />
    </div>
  );
}

export default App;
