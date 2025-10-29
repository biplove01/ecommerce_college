import {createContext, useEffect} from "react";
import { useState } from "react";
import axios from "axios";
import {food_list} from "../assets/assets";
/*This is the context api used to manage the global state of the app*/
/*This will be used to manage the cart items and user details*/

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [token, setToken] = useState("");


    const contextValue = {
        food_list,
        token,
        setToken
    }
        
    
    return(<StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>)
}

export default StoreContextProvider;
