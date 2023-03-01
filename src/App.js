import './App.css';
import MainTemplate from './components/MainTemplate/MainTemplate';
import Login from './components/Login/Login';
import Products from './components/MainProduct/products/Products';
import Product from './components/MainProduct/product/Product';
import AddProduct from './components/MainProduct/add-product/AddProduct';
import UpdateProduct from './components/MainProduct/update-product/UpdateProduct';
import Category from './components/MainCategory/category/Category';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <MainTemplate></MainTemplate>
            <Routes>
            <Route exact path='/login' element={<Login />} />
              <Route exact path='/' element={<Products />} />
              <Route exact path='/product/:id' element={<Product />} />
              <Route exact path='/add-product' element={<AddProduct />} />
              <Route exact path='/edit-product/:id' element={<UpdateProduct />} />
              <Route exact path='/:category' element={<Category />} />
            </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;