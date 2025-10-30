import React, {useEffect} from 'react'
import {useContext} from 'react'
import {StoreContext} from '../../context/storeContext'
import './PlaceOrder.css'
import {useNavigate} from 'react-router-dom'
import {get} from 'mongoose'
import {BACKEND_URL} from "../../environment";


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
        if (!totalAmount || totalAmount <= 0) {
            alert("Your cart is empty or the amount is invalid.");
            return;
        }

        const paymentRequest = {
            amount: totalAmount * 100,
            purchase_order_id: `ORDER_${Date.now()}`,   // fixed
            purchase_order_name: `E-commerce Order`     // fixed
        };

        try {
            const response = await fetch(`${BACKEND_URL}/api/payment/khalti/initiate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentRequest),
            });

            // Improved error handling: Check if response is NOT ok
            if (!response.ok) {
                const errorResult = await response.json(); // Now we expect JSON
                throw new Error(errorResult.message || 'Failed to start payment process.');
            }

            const result = await response.json();

            if (result.payment_url) {
                window.location.href = result.payment_url;
            } else {
                throw new Error('Payment URL not found in the response.');
            }
        } catch (error) {
            console.error("Payment initiation error:", error);
            alert(`Error: ${error.message}`);
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
