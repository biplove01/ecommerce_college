import {StoreContext} from "../../context/storeContext";
import "./ProductList.css"
import React, {useEffect, useState} from "react";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from "@cloudinary/react";
import {assets} from "../../assets/assets";
import {BACKEND_URL, CLOUDINARY_CLOUD_NAME} from "../../environment";
import {useNavigate} from "react-router-dom";

const AddProductsComponent = () => {

    const [imageUrls, setImageUrls] = useState([]);

    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [imageUploading, setImageUploading] = useState(false);

    const cld = new Cloudinary({cloud: {cloudName: CLOUDINARY_CLOUD_NAME}});

    // const navigate = useNavigate()

    async function handleFileChange(e) {
        setImageUploading(true);
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

        setImageUrls(prev => [...prev, ...uploadedUrls]);
        setImageUploading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let images = ""
        imageUrls.map((singleImage, index) => {
            if (index === 0) {
                images += singleImage;
            } else {
                images += "+" + singleImage;
            }
        })
        const productData = {
            id: productId,
            name: productName,
            description,
            price,
            discountedPrice: discountPrice,
            images,
            quantity
        };
        console.log("Product data:", productData);

        const accessToken = sessionStorage.getItem("accessToken");
        const res = await fetch(BACKEND_URL + "/product/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
            body: JSON.stringify(productData),
        })
        if(res.ok){
            clearEditOptions()
            window.location.href = "/productList"
        }

        const data = await res.json()
        console.log({"response from backend": data})



    };


    useEffect(() => {
        const productToEdit = JSON.parse(sessionStorage.getItem("productToEdit"));

        if (productToEdit) {
            setProductId(productToEdit.id || null);
            setProductName(productToEdit.name || "");
            setDescription(productToEdit.description || "");
            setQuantity(productToEdit.quantity ?? "");
            setPrice(productToEdit.price ?? "");
            setDiscountPrice(productToEdit.discountedPrice ?? "");
            setImageUrls(productToEdit.images ? productToEdit.images.split("+") : []);
        }
    }, []);

    function clearEditOptions() {
        sessionStorage.removeItem("productToEdit");
        setProductId(null);
        setProductName("");
        setDescription("");
        setQuantity("");
        setPrice("");
        setDiscountPrice("");
        setImageUrls([]);
    }

    return (
        <>
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


                <div className="login-popup-title" style={{marginBottom: "16px"}}>
                    <div>
                        {productId && productId ? <h2>Update Product</h2> : <h2>Add Product</h2>}
                    </div>
                    <div>
                        <button onClick={clearEditOptions}>
                            Clear
                        </button>
                    </div>
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
                    <input
                        type="number"
                        value={quantity}
                        placeholder="Quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>

                <div className="login-popup-inputs">

                    <input type="file" multiple onChange={handleFileChange}/>
                    {
                        imageUploading &&
                        <p style={{fontSize: "0.8rem"}}>Image uploading and getting URL... Please wait!!!</p>
                    }

                    {imageUrls && imageUrls ? imageUrls.map((url, i) => (
                        <div key={i}
                             style={{
                                 position: "relative",
                                 display: "inline-block",
                             }}>
                            <AdvancedImage
                                cldImg={cld.image(url)}
                                style={{width: "auto", height: "150px", objectFit: "cover"}}
                            />
                            <button
                                type="button"
                                className="little-x-btn"
                                onClick={() =>
                                    setImageUrls((prev) => prev.filter((_, index) => index !== i))
                                }
                            >
                                ✕
                            </button>
                        </div>
                    )) : <p style={{fontSize: "0.8rem"}}>Images will be shown here! </p>}
                </div>

                <button type="submit">
                    {productId && productId ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            {/*List of already created products*/}
            <div>

            </div>
        </>

    )

}

export default AddProductsComponent
