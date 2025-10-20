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
import Verification  from './pages/Verification/Verification'
import MyOrders from './pages/MyOrders/MyOrders'

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
        <Route path='/verify' element={<Verification/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App