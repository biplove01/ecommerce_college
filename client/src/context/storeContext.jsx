import {createContext, useEffect} from "react";
import {food_list} from "../assets/assets";
import { useState } from "react";

/*This is the context api used to manage the global state of the app*/
/*This will be used to manage the cart items and user details*/

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setcartItems] = useState({}); // State to manage cart items

    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setcartItems((prev)=>({...prev, [itemId]:1}))
        }
        else{
            setcartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId)=>{
        if(cartItems[itemId] && cartItems[itemId]>1){
            setcartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        }
        else{
            const newCartItems = {...cartItems};
            delete newCartItems[itemId];
            setcartItems(newCartItems);
        }
    }
    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if (cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item)
                totalAmount += cartItems[item] * itemInfo.price
            }    
        }
        return totalAmount;
    }


    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
        
    
    return(<StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>)
}

export default StoreContextProvider;