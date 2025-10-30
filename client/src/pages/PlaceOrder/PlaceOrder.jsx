import React, {useEffect} from 'react'
import {useContext} from 'react'
import {StoreContext} from '../../context/storeContext'
import './PlaceOrder.css'
import {useNavigate} from 'react-router-dom'
import {get} from 'mongoose'
import {BACKEND_URL, KHALTI_PUBLIC_KEY} from "../../environment";


const PlaceOrder = () => {
// const { getTotalCartAmount,token, food_list, cartItems,url } = useContext(StoreContext);
    const [data, setData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value})
    }

    const proceedToPayment = async (e) => {
        e.preventDefault();

        const totalAmount = getTotalCartAmount();
        try {
            const res = await fetch(`${BACKEND_URL}/api/payment/khalti/initiate`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    amount: totalAmount * 100,
                    purchaseOrderId: `ORDER_${Date.now()}`,
                    purchaseOrderName: 'E-commerce Order'
                })
            });
            const data = await res.json();

            if (res.ok) {
                if (data.payment_url) {
                    window.location.replace(data.payment_url);
                } else {
                    console.log("Payment initiation failed on server")
                    alert("Payment initiation failed on server.");
                }
            } else {
                alert(data);
            }

        } catch (error) {
            console.error("Payment initiation error:", error);
        }
    };

    function getTotalCartAmount() {
        return sessionStorage.getItem("paymentAmount")
    }

    return (
        <form onSubmit={proceedToPayment} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fileds">
                    <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text"
                           placeholder='First Name' required/>
                    <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text"
                           placeholder='Last Name' required/>
                </div>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email'
                       required/>
                <input name='street' onChange={onChangeHandler} value={data.street} type="text"
                       placeholder="Street Address" required/>
                <div className="multi-fileds">
                    <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'
                           required/>
                    <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'
                           required/>
                </div>
                <div className="multi-fileds">
                    <input name='zip' onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip Code'
                           required/>
                    <input name='country' onChange={onChangeHandler} value={data.country} type="text"
                           placeholder='Country' required/>
                </div>
                <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'
                       required/>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        {/*<hr />*/}
                        {/*<div className="cart-total-details">*/}
                        {/*  <p>Delivery Fee</p>*/}
                        {/*  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>*/}
                        {/*</div>*/}
                        <hr/>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder
