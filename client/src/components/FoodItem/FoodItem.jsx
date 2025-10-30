import React, {useContext, useEffect, useState} from 'react'
import "./FoodItem.css"
import {assets} from '../../assets/assets'
import {StoreContext} from '../../context/storeContext'
import {AdvancedImage} from "@cloudinary/react";
import {BACKEND_URL, CLOUDINARY_CLOUD_NAME} from "../../environment";
import {Cloudinary} from "@cloudinary/url-gen";
import Toaster from "../Toaster/Toaster";

const FoodItem = ({id, name, price, discountedPrice, description, images, rating, seller}) => {

    // const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
    const [imageList, setImageLists] = useState([])
    const [quantityInCart, setQuantityInCart] = useState(0);
    const [toastContent, setToastContent] = useState({
        show: false,
        type: "success",
        title: "",
        message: "",
    });


    const cld = new Cloudinary({cloud: {cloudName: CLOUDINARY_CLOUD_NAME}});

    useEffect(() => {
        if (images !== null) {
            setImageLists(images.split("+"))
        }
    }, [images]);




    async function addToCart(productId) {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const res = await fetch(`${BACKEND_URL}/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${accessToken}`
                },
                body: JSON.stringify({ productId, quantity: 1 })
            });

            if (!res.ok) throw new Error("Failed to add to cart");
            setQuantityInCart(prev => prev + 1);
            setToastContent({
                show: true,
                type: "success",
                title: "Added to cart",
                message: `${name} added to cart!`
            });
        } catch (err) {
            setToastContent({
                show: true,
                type: "error",
                title: "Error",
                message: "Can't currently add to cart."
            });
        }
    }

    async function removeFromCart(productId) {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const res = await fetch(`${BACKEND_URL}/cart/remove/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `${accessToken}`
                }
            });

            if (!res.ok) throw new Error("Failed to remove from cart");
            setQuantityInCart(prev => Math.max(prev - 1, 0));
            setToastContent({
                show: true,
                type: "success",
                title: "Removed from cart",
                message: `${name} removed from cart!`
            });
        } catch (err) {
            setToastContent({
                show: true,
                type: "error",
                title: "Error",
                message: "Currently cannot remove from cart"
            });
        }
    }


    return (
        <div className='food-item' id={id}>
            {toastContent.show &&  (
                <Toaster
                    key={Date.now()}
                    type={toastContent.type}
                    title={toastContent.title}
                    message={toastContent.message}
                />
            )}
            <div className='food-item-img-container'>
                {/*<img className='food-item-image' src={url+"/images/"+image} alt={name} />*/}

                {/*<img className='food-item-image' src="" alt=""/>*/}
                <AdvancedImage
                    cldImg={cld.image(imageList[0])}
                    style={{
                        width: "100%",
                        maxHeight: "12rem",
                        objectFit: "cover",
                        borderRadius: "15px 15px 0 0",
                    }}
                />

            </div>
            <div className="food-item-info">
                {/*<div className="food-item-rating" style={{display: "flex", gap: "0.2rem"}}>*/}
                {/*    {Array.from({length: 5}).map((_, index) => (*/}
                {/*        <img*/}
                {/*            key={index}*/}
                {/*            src={index < Math.round(rating || 0) ? assets.star_filled : assets.star_unfilled}*/}
                {/*            alt="star"*/}
                {/*            style={{width: "16px", height: "16px"}}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</div>*/}
                <h3 style={{opacity:"0.7"}}>{name && name}</h3>
                <p className='food-item-description'>{description && description}</p>

                <div  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>

                    <div style={{
                        display: "flex",
                        gap: "1rem"
                    }}>

                        {
                            discountedPrice && discountedPrice !== 0 ?
                                <p className="food-item-price-discounted">${discountedPrice}</p>
                                : <></>
                        }
                        <p className="food-item-price">${price && price}</p>
                    </div>

                    <div className="add-to-cart">
                        {quantityInCart > 0 ? (
                            <div>
                                <img src={assets.remove_icon_red} alt="remove" className='counter-icon' onClick={()=>removeFromCart(id)} />
                            </div>
                        ) : (
                            <img src={assets.add_icon_green} alt="add" className='counter-icon' onClick={()=>addToCart(id)} />
                        )}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default FoodItem
