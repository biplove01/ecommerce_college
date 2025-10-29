import React from 'react'
import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if(response.data.success){
      setOrders(response.data.data);
      console.log("Fetched orders:", response.data.data);
    }
    else{
      toast.error("Error fetching orders");
    }
  }

  const statusHandler = async(status, orderId) => {
    try{
      const response = await axios.post(`${url}/api/order/status`, {orderId: orderId, status: status});
      if(response.data.success){
        toast.success("Order status updated successfully");
        fetchAllOrders();
      }
      else{
        toast.error("Error updating order status");
      }
    }catch(error){
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => {
                  if(idx === order.items.length - 1){
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + " " + order.address.zip}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
           <p>Items: {order.items.length}</p>
           <p>${order.amount}.00</p>
           <select onChange={(e) => statusHandler(e.target.value, order._id)} value={order.status}>
            <option value="Pending">Pending</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
           </select>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Orders