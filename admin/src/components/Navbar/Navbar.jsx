import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className="nav">
        <img className="logo"  src={assets.logo} alt="" />
        <img className="profile" src={assets.profile_image} alt='Profile' />
    </div>
  )
}

export default Navbar