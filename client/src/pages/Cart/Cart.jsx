import React, {useContext, useEffect, useState} from 'react'
import './Cart.css'
import {StoreContext} from '../../context/storeContext'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {BACKEND_URL, CLOUDINARY_CLOUD_NAME} from "../../environment";
import {AdvancedImage} from "@cloudinary/react";
import {Cloudinary} from "@cloudinary/url-gen";

const Cart = () => {

    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const deliveryCharge = 2;

    const cld = new Cloudinary({cloud: {cloudName: CLOUDINARY_CLOUD_NAME}});

    const fetchCartItems = async () => {

        const token = sessionStorage.getItem("accessToken");

        try {
            const res = await fetch(`${BACKEND_URL}/cart/getAll`, {
                headers: {Authorization: `${token}`},
            })
            if (!res.ok) throw new Error("Failed to fetch cart items")
            const data = await res.json()
            setCartItems(data.items || [])
        } catch (err) {
            console.error("Error fetching cart items:", err.message)
        }
    }

    const removeFromCart = async (cartProductId) => {

        const token = sessionStorage.getItem("accessToken");
        try {
            const res = await fetch(`${BACKEND_URL}/cart/remove/${cartProductId}`, {
                method: "DELETE",
                headers: {Authorization: `${token}`},
            })
            if (!res.ok) throw new Error("Failed to remove cart item")
            await fetchCartItems()
        } catch (err) {
            console.error("Error removing from cart:", err.message)
        }
    }

    const getTotalCartAmount = () => {
        return cartItems.reduce(
            (total, item) => total + item.productPrice * item.quantity,
            0
        )
    }


    useEffect(() => {
        fetchCartItems()
        console.log("cart loaded")
    }, [])

    function handleProceedToCheckout() {
        navigate('/order')
        sessionStorage.setItem("paymentAmount", getTotalCartAmount())
    }

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>

                {/*<pre>{JSON.stringify(cartItems, null, 4)}</pre>*/}
                {cartItems.map((item, index) => {
                    return (
                        <div key={index} id={item.cartProductId}>
                            <div className="cart-items-title cart-items-item">
                                <AdvancedImage
                                    cldImg={cld.image(item.images && item.images.split("+")[0])}
                                    style={{
                                        width: "100%",
                                        maxHeight: "12rem",
                                        objectFit: "cover",
                                    }}
                                />
                                {/*<img src={url+"/images/"+item.image} alt="" />*/}
                                {/*<img src={item.image} alt="" />*/}
                                <p>{item.productName}</p>
                                <p>${item.productPrice}</p>
                                <p>{item.quantity}</p>
                                <p>${item.productPrice * item.quantity}</p>
                                <p className='cross' onClick={() => removeFromCart(item.cartProductId)}>x</p>
                            </div>
                            <hr/>
                        </div>

                    )

                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total" style={{maxWidth: "30rem"}}>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p>
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b>
                        </div>
                    </div>
                    <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                {/*<div className="cart-promocode">*/}
                {/*  <div>*/}
                {/*    <p>If you have a promo code, enter it here:</p>*/}
                {/*    <div className='cart-promocode-input'>*/}
                {/*      <input type="text" placeholder='promo code' />*/}
                {/*      <button>Submit</button>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default Cart
