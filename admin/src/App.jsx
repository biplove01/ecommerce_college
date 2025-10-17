import React from 'react'
import Sidebar from './components/sidebar/sidebar'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<div>Add Items Page</div>} />
          <Route path="/list" element={<div>List Items Page</div>} />
          <Route path="/orders" element={<div>Orders Page</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App