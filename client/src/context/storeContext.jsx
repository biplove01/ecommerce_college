import {createContext, useEffect} from "react";
import { useState } from "react";
import axios from "axios";
/*This is the context api used to manage the global state of the app*/
/*This will be used to manage the cart items and user details*/

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setcartItems] = useState({}); // State to manage cart items
    const url='http://localhost:4000';
    const [token, setToken] = useState("");

    const [food_list,setFoodList]=useState([]);

    const addToCart =async (itemId)=>{
        if(!cartItems[itemId]){
            setcartItems((prev)=>({...prev, [itemId]:1}))
        }
        else{
            setcartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(`${url}/api/cart/add`, {itemId: itemId},{headers:{token: token}});
        }
    }

    const removeFromCart =async (itemId)=>{
        if(cartItems[itemId] && cartItems[itemId]>1){
            setcartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
            if(token){
                await axios.post(`${url}/api/cart/remove`, {itemId: itemId},{headers:{token: token}});
            }
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

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    };

    const loadCartData = async (userToken) => {
        const authToken = userToken || token;
        if (authToken) {
            const response = await axios.get(`${url}/api/cart/get`, { headers: { token: authToken } });
            if (response.data.success) {
                setcartItems(response.data.cartData);
            }
        }
    }

    useEffect(() => {
       async function loadData(){
        await fetchFoodList();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            await loadCartData(storedToken);
        }
       }
       loadData();
    }, []);

    useEffect(() => {
        if (token) {
            loadCartData();
        }
    }, [token]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token, 
        setToken
    }
        
    
    return(<StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>)
}

export default StoreContextProvider;