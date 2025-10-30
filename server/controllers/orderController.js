import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontendURL = "http://localhost:3000";

//place order from frontend
const placeOrder = async (req, res) => {
    try{
        const newOrder = new OrderModel({
            userId: req.user,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: req.body.payment
        });    
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.user, { cartData: {} });

        // Create a payment intent with Stripe
        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: item.description,
                    images: [item.image]
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "Delivery Charges",
                    description: "Order Total",
                    images: []
                },
                unit_amount: req.body.amount * 2  
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontendURL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({
            success: false,
            message: "Failed to place order"
        });
    }
}

const verifyOrder = async (req, res) => {
    const {orderId,success} = req.body;
    try{
        console.log('Verifying order:', { orderId, success });
        
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        if(success=="true"){
            const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, {payment: true}, {new: true});
            if (!updatedOrder) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }
            console.log('Order updated successfully:', updatedOrder._id);
            res.json({ success: true, message: "Order confirmed successfully" });
        }
        else{
            const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
            if (!deletedOrder) {
                return res.status(404).json({ success: false, message: "Order not found for deletion" });
            }
            console.log('Order deleted:', deletedOrder._id);
            res.json({ success: false, message: "Order payment failed, order cancelled" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Failed to verify order", error: error.message });
    }
}

//user order for frontend
const userOrders = async (req, res) =>{
    try{
        const orders = await OrderModel.find({userId: req.user});
        res.json({success: true, data: orders})
    }catch(error){
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user orders", error: error.message });
    }
}

//listing order for admin pannel
const listOrders = async(req, res)=>{
    try{
        const orders = await OrderModel.find({});
        res.json({success: true, data: orders})
    }catch(error){
        console.error("Error listing orders:", error);
        res.status(500).json({ success: false, message: "Failed to list orders", error: error.message });
    }
}

//api for updating order status by admin
const updateStatus = async(req, res)=>{
    try{
        await OrderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({ success: true, message: "Order status updated successfully" });
    }catch(error){
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Failed to update order status", error: error.message });
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };