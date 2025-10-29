import {createContext, useEffect} from "react";
import {useState} from "react";
import {food_list} from "../assets/assets";
import {BACKEND_URL} from "../environment";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    // const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    //
    //
    // const [cartItems, setCartItems] = useState([])
    //
    // const fetchCartItems = async () => {
    //     try {
    //         const res = await axios.get(`${BACKEND_URL}/cart/getAll`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         setCartItems(res.data.products || []);
    //     } catch (err) {
    //         console.error("Error fetching cart items:", err.message);
    //     }
    // };
    //
    // const addToCart = async (productId, quantity = 1) => {
    //     try {
    //         await axios.post(
    //             `${BACKEND_URL}/cart/add`,
    //             { productId, quantity },
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );
    //         await fetchCartItems();
    //     } catch (err) {
    //         console.error("Error adding to cart:", err.message);
    //     }
    // };
    //
    // const removeFromCart = async (cartProductId) => {
    //     try {
    //         await axios.delete(`${BACKEND_URL}/cart/remove/${cartProductId}`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         await fetchCartItems();
    //     } catch (err) {
    //         console.error("Error removing from cart:", err.message);
    //     }
    // };
    //
    // const getTotalCartAmount = async () => {
    //     try {
    //         const res = await axios.get(`${BACKEND_URL}/cart/totalAmount`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         return res.data || 0;
    //     } catch (err) {
    //         console.error("Error getting total amount:", err.message);
    //         return 0;
    //     }
    // };
    //
    //
    // useEffect(() => {
    //     if (token) fetchCartItems().then(r => console.log(""))
    // }, [token])
    //
    //
    // useEffect(() => {
    //     const savedToken = localStorage.getItem("accessToken");
    //     if (savedToken) setToken(savedToken);
    // }, []);

    const contextValue = {
        // food_list,
        // token,
        // setToken,
        // cartItems,
        // addToCart,
        // removeFromCart,
        // getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
    )
}

export default StoreContextProvider;
