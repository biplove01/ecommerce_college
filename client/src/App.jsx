import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import './App.css'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import AddProductsComponent from "./pages/ProductList/AddProductsComponent";
import ProductListPage from "./pages/ProductList/ProductListPage";
import MyOrders from './pages/MyOrders/MyOrders'
import Verification from "./pages/PlaceOrder/Verification/Verification";

function App() {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>

    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/productList' element={<ProductListPage/>}/>


        <Route path='/verify' element={<Verification/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
