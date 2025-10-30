import "./ProductList.css"
import React, {useState} from "react";
import {assets} from "../../assets/assets";
import ProductItemList from "./ProductItemList";
import AddProductsComponent from "./AddProductsComponent";

const ProductListPage = () => {
    return (
        <>
            <AddProductsComponent></AddProductsComponent>
        </>
    )
}

export default ProductListPage
