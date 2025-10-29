import React, {useContext, useEffect, useState} from 'react'
import "./FoodDisplay.css"
import {StoreContext} from '../../context/storeContext'
import FoodItem from '../FoodItem/FoodItem'
import {BACKEND_URL} from "../../environment";
import Toaster from "../Toaster/Toaster";

const FoodDisplay = (category) => {

    const {food_list} = useContext(StoreContext)
    const [foodItems, setFoodItems] = useState([])

    const getFoodItems = async () => {
        const res = await fetch(BACKEND_URL + "/product/pagination/0/24/name");
        if (res.ok) {
            const response = await res.json();

            setFoodItems((prevState)=> [...prevState, response])
        }

    }

    useEffect(() => {
        getFoodItems()
    }, []);


    return (
        <div className='food-display' id='food-display'>

            <h2>Top Dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category.category === "All" || item.category === category.category)
                        return <FoodItem key={index} id={item._id} name={item.name} price={item.price}
                                         description={item.description} image={item.image}/>
                })}
            </div>

        </div>
    )
}

export default FoodDisplay
