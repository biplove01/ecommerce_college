import "./ProductItemList.css"
import React, {useContext, useEffect, useState} from "react";
import {assets, food_list} from "../../assets/assets";
import {StoreContext} from "../../context/storeContext";
import {useNavigate} from "react-router-dom";
import {BACKEND_URL, CLOUDINARY_CLOUD_NAME} from "../../environment";
import {AdvancedImage} from "@cloudinary/react";
import {Cloudinary} from "@cloudinary/url-gen";

const ProductItemList = () => {

    const [showConfirmRemove, setShowConfirmRemove] = useState(false)
    const [productList, setProductList] = useState([])
    const navigate = useNavigate();

    const cld = new Cloudinary({cloud: {cloudName: CLOUDINARY_CLOUD_NAME}});

    const edit = (product) => {
        console.log(product)
        sessionStorage.setItem("productToEdit", JSON.stringify(product))
        window.location.href = "/productList"
    }

    const accessToken = sessionStorage.getItem("accessToken");

    const getAllProductsOfSeller = async () => {
        const userInfo = JSON.parse(sessionStorage.getItem("userData"));
        const res = await fetch(BACKEND_URL + `/product/all/${userInfo?.sellerDTO?.id}`);
        const parsedRes = await res.json();
        if (res.ok) {
            console.log({"All products of seller": parsedRes})
            setProductList(parsedRes)
        }
    }

    useEffect(() => {
        getAllProductsOfSeller()
    }, []);

    const removeProduct = async (item) => {
        const res = await fetch(BACKEND_URL + `/product/${item.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": accessToken
            }
        })
        if (res.ok) {
            window.location.href = "/productList";
        }
    }

    return (

        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Description</p>
                    <p>Price</p>
                    <p>Discount</p>
                    <p>Quantity</p>
                    <p>Edit</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {productList.map((item, index) => {
                    // if (cartItems[item._id] > 0) {
                    return (
                        <div key={index}>
                            {/*<pre>{JSON.stringify(item, null, 8)}</pre>*/}
                            <div className="cart-items-title cart-items-item">
                                {item.images && item.images ?
                                    <div style={{alignItems: 'left'}}>
                                        <AdvancedImage
                                            cldImg={cld.image(item.images.split("+")[0])}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                                marginRight: "5px"
                                            }}
                                        />
                                    </div>

                                    : <>img</>}


                                <p>{item?.name}</p>
                                <p style={{textAlign: 'left'}}>{item?.description}</p>
                                <p>{item?.price}</p>
                                <p>{item?.discountedPrice}</p>
                                <p>{item?.quantity}</p>
                                <div>
                                    <img style={{height: "0.8rem", width: "0.8rem", cursor: "pointer"}}
                                         src={assets.edit_icon} alt="" onClick={() => edit(item)}/>
                                </div>
                                {/*<p className='cross' onClick={() => removeProduct(item)}>x</p>*/}
                                <p className='cross' onClick={() => setShowConfirmRemove(!showConfirmRemove)}>x</p>
                            </div>
                            <hr/>
                            {showConfirmRemove && (
                                <div className="confirm-overlay">
                                    <div className="confirm-box">
                                        <p>Are you sure you want to delete?</p>
                                        <div className="confirm-buttons">
                                            <button className="confirm-yes" onClick={() => { removeProduct(item); setShowConfirmRemove(false); }}>Yes</button>
                                            <button className="confirm-no" onClick={() => setShowConfirmRemove(false)}>No</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                    )
                    // }
                })}
            </div>
        </div>
    )
}

export default ProductItemList
