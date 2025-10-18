import {StoreContext} from "../../context/storeContext";
import "./ProductList.css"
import React, {useState} from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from "@cloudinary/react";
import {assets} from "../../assets/assets";
import {BACKEND_URL} from "../../environment";

const ProductList = () => {

    const [imageUrls, setImageUrls] = useState([]);

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");

    const cld = new Cloudinary({cloud: {cloudName: 'dbyhqo5bo'}});

    async function handleFileChange(e) {
        const files = Array.from(e.target.files);
        const uploadedUrls = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ecommerce_6sem_preset");

            const res = await fetch("https://api.cloudinary.com/v1_1/dbyhqo5bo/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            uploadedUrls.push(data.public_id);
        }

        setImageUrls(prev => [...prev, ...uploadedUrls]); // append new uploads
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let images = ""
        imageUrls.map((singleImage, index) => {
            if (index === 0) {
                images += singleImage;
            }
            images += "+" + singleImage;
        })
        const productData = {name: productName, description, price, discountPrice, images};
        console.log("Product data:", productData);

        const accessToken = sessionStorage.getItem("accessToken");
        const res = await fetch(BACKEND_URL+ "/product/create",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
            body: JSON.stringify(productData),
        })

        const data = await res.json()
        console.log({"response from backend": data})
    };

    return (
        <form onSubmit={handleSubmit} style={{
            maxWidth: "400px",
            margin: "20px auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        }}>


            <div className="login-popup-title">
                <h2>Add Product</h2>
            </div>

            <div className="login-popup-inputs">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>

            <div className="login-popup-inputs">
                <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        height: "60px",
                        padding: "6px",
                        resize: "vertical"
                    }}
                />
            </div>

            <div className="login-popup-inputs">
                <input
                    type="number"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>


            <div className="login-popup-inputs">
                <input
                    type="number"
                    value={discountPrice}
                    placeholder="Discounted Price"
                    onChange={(e) => setDiscountPrice(e.target.value)}
                />
            </div>

            <div className="login-popup-inputs">
                <input type="file" multiple onChange={handleFileChange}/>
                {imageUrls.map((url, i) => (
                    <AdvancedImage
                        key={i}
                        cldImg={cld.image(url)}
                        style={{width: "150px", height: "150px", objectFit: "cover", marginRight: "5px"}}
                    />
                ))}
            </div>

            <button type="submit">
                Add Product
            </button>
        </form>
    )

}

export default ProductList
