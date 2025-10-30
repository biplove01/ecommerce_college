import e from "express";
import userModel  from "../models/userModel.js";

//add item to user cart
const addToCart = async (req, res) => {
    try{
        let userData = await userModel.findOne({_id: req.user});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.user, {cartData: cartData});
        return res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.log("Add to cart error:", error);
        return res.json({ success: false, message: "Failed to add item to cart" });
    }
}

//remove item from user cart
const removeFromCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.user);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.user, {cartData: cartData});
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        res.json({ success: false, message: "Error removing item" });
    }
}

const getCart = async (req, res) => {
    try{
        let userData = await userModel.findById(req.user);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData: cartData });
    } catch (error) {
        res.json({ success: false, message: "Error getting cart data" });
    }
}

export { addToCart, removeFromCart, getCart };