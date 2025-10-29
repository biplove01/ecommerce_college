import React, {useContext, useEffect, useState} from 'react'
import "./FoodItem.css"
import {assets} from '../../assets/assets'
import {StoreContext} from '../../context/storeContext'
import {AdvancedImage} from "@cloudinary/react";
import {CLOUDINARY_CLOUD_NAME} from "../../environment";
import {Cloudinary} from "@cloudinary/url-gen";

const FoodItem = ({id, name, price, discountedPrice, description, images, rating, seller}) => {

    // const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
    const [imageList, setImageLists] = useState([])

    const cld = new Cloudinary({cloud: {cloudName: CLOUDINARY_CLOUD_NAME}});

    useEffect(() => {
        if (images !== null) {
            setImageLists(images.split("+"))
        }
    }, [images]);

    return (
        <div className='food-item' id={id}>
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
                {/*<img className='food-item-image' src={image} alt={name} />*/}
                {/*{!cartItems[id]*/}
                {/*    ? <img src={assets.add_icon_white} alt="" onClick={()=>addToCart(id)} className='add'/>*/}
                {/*    :<div className="food-item-counter">*/}
                {/*     <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="remove" className='counter-icon'/>*/}
                {/*    <p>{cartItems[id]}</p>*/}
                {/*    <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="add" className='counter-icon'/>*/}
                {/*    </div>*/}

                {/*}*/}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name && name}</p>
                    {/*<img src={assets.rating_starts} alt="rating"/>*/}
                </div>
                <p className='food-item-description'>{description && description}</p>

                <div style={{
                    display: "flex",
                    gap: "1rem",
                }}>

                    {
                        discountedPrice && discountedPrice !== 0 ?
                            <p className="food-item-price-discounted">${discountedPrice}</p>
                            : <></>
                    }
                    <p className="food-item-price">${price && price}</p>
                </div>

            </div>
        </div>
    )
}

export default FoodItem
