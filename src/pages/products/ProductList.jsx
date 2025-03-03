import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import "./ProductList.css"


const ProductList = () => {
    return(
        <>
        <Dashboard mainContent={
            <div className="conatiner">
            <div className="header">
                <h1>All Products</h1>
                <button className="add"> + Add New Product</button>
            </div>
            <div className="filters">
                <button className="all">
                    All Products
                </button>
                <button className="low">
                    Low Stock
                </button>
                <button className="out">
                    Out of stock
                </button>
                <div className="options">
                    <button className="filterbutton"> Filter</button>
                </div>
            </div>

            <div className="productgrid">
                <div className="productcard">
                    <h3>Jellyfish Keyring</h3>
                    <p className="price"> Rs. 120</p>
                    <p className="descripition">
                        Lorem ipsum is placeholder text commonly used in the graphic.
                    </p>
                    <div className="stats">
                        <div className="stat">
                            <span> Sales</span>
                        </div>
                        <div className="stat">
                            <span> Remaining</span>
                        </div>
                    </div>
                </div>

            </div>
            </div>

        }/>

        </>
    )
}
export default ProductList;