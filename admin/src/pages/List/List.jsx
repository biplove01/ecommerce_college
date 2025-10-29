import React from 'react'
import './List.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const List = ({url}) => {

  const [List, setList] = useState([]);

  console.log("API URL:", url); // Log the API URL for debugging

  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error while fetching the list");
    }
  }

  const removeFood = async (foodId) => {
    console.log("Removing food with ID:", foodId);
    try {
      const response = await axios.post(`${url}/api/food/remove`, { _id: foodId });
      console.log("Remove response:", response.data);
      
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchlist(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to remove food item");
      }
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Error occurred while removing food item");
    }
  }

  useEffect(() => {
    fetchlist();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item, index) => {
          console.log("Item data:", item); // Log each item
          console.log("Item ID:", item._id); // Log the specific ID
          return (
            <div key={item._id} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor delete-btn" onClick={() => removeFood(item._id)}>✕</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List