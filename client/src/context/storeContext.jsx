import {createContext} from "react";
import {food_list} from "../assets/assets";

/*This is the context api used to manage the global state of the app*/
/*This will be used to manage the cart items and user details*/

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const contextValue = {
        food_list
    }
        
    
    return(<StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>)
}

export default StoreContextProvider;