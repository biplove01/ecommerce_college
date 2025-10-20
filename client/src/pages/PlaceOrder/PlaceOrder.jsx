import React, { useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
import { get } from 'mongoose'


const PlaceOrder = () => {
const { getTotalCartAmount,token, food_list, cartItems,url } = useContext(StoreContext);
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

const placeOrder = async (e) => {
  e.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo);
    }
  })
  let orderData = {
    address: data,
    items: orderItems,
    amount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2
  }
  
  try {
    let response = await fetch(`${url}/api/order/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify(orderData)
    }); 
    
    let result = await response.json();
    
    if (result.success){
      const {session_url} = result;
      window.location.replace(session_url);
    }
    else{
      alert("Order placement failed. Please try again.");
    }
  } catch (error) {
    console.error("Order error:", error);
    alert("Network error. Please check your connection.");
  }
}

const navigate = useNavigate();

useEffect(()=>{
  if(!token){
    navigate('/cart');
  }
  else if(getTotalCartAmount() === 0){
    navigate('/cart');
  }
},[token])


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fileds">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required/>
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required/>
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street Address" required/>
        <div className="multi-fileds">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required/>
        </div>
        <div className="multi-fileds">
          <input name='zip' onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip Code' required/>
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required/>
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder