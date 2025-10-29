import React, {useContext, useEffect, useState} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link} from 'react-router-dom'
import {StoreContext} from '../../context/storeContext'

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState("home");
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [userData, setUserData] = useState(null)
    const [showLogOutOption, setShowLogoutOption] = useState(false)

    const {getTotalCartAmount} = useContext(StoreContext);

    useEffect(() => {
        const userData = sessionStorage.getItem("userData")
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData?.customerDTO?.name) {
            setIsLoggedIn(true)
            setUserData(parsedUserData?.customerDTO)
        } else if (parsedUserData?.sellerDTO?.name) {
            setIsLoggedIn(true)
            setUserData(parsedUserData?.sellerDTO)
        } else {
            setIsLoggedIn(false)
        }
    }, []);

    function handleLogout() {
        setShowLogoutOption(!showLogOutOption)
        sessionStorage.removeItem("userData")
        sessionStorage.removeItem("accessToken")

        window.location.href = "/"

    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo"/></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home </Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")}
                   className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact
                    Us</a>
                {/*<a href='/productList' onClick={() => setMenu("product-list")} className={menu === "product-list" ? "active" : ""}>Product List</a>*/}
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" className="search-icon"/>

                {
                    isLoggedIn && userData?.sellerRankStatus &&
                    <div className="navbar-search-icon">
                        <Link to='/productList'><img src={assets.productList_icon} alt=""
                                                     className="basket-icon"/></Link>
                        {/*<div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>*/}
                    </div>
                }


                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.cart_icon} alt="" className="basket-icon"/></Link>
                    {/*<div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>*/}
                </div>

                {!isLoggedIn &&
                    <button onClick={() => {
                        setShowLogin(true)
                    }}>Sign in
                    </button>
                }

                {
                    isLoggedIn &&
                    <div>
                        <img src={userData.image || assets.profile_icon} alt="" className="profile-icon"
                             onClick={() => setShowLogoutOption(!showLogOutOption)}/>
                    </div>
                }

                {
                    showLogOutOption &&
                    <div className="profileClickMenu">
                        <p onClick={handleLogout}>Log out</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default Navbar
