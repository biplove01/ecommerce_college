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
            const foodItemsList = response.content;
            console.log(foodItemsList)
            setFoodItems(foodItemsList)
        }

    }

    useEffect(() => {
        getFoodItems()
    }, []);


    return (
        <div className='food-display' id='food-display'>

            <h2>Top Dishes near you</h2>
            <div className="food-display-list">
                {/*<pre>{JSON.stringify(foodItems, null, 4)}</pre>*/}
                {foodItems && foodItems.map((item, index) => {
                    // if (category.category === "All" || item.category === category.category)
                    return <FoodItem key={index} id={item.id} name={item.name} price={item.price}
                                     discountedPrice={item.discountedPrice}
                                     description={item.description} images={item.images} rating={item.rating} seller={item.seller && item.seller}/>
                })}
            </div>

        </div>
    )
}

export default FoodDisplay
