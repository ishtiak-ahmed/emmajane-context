import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import "./Product.css"
import { Link } from 'react-router-dom';
const Product = (props) => {
    const { img, name, price, stock, seller, key } = props.product
    return (
        <div className="product-item">
            <div className="product-image">
                <img src={img} alt="" />
            </div>
            <div className="product-info">

                <h4><Link to={'/product/' + key}>{name}</Link></h4>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon.</small></p>
                {props.showButton &&
                    <button onClick={() => props.handleAddProduct(props.product)} className="add-cart"><FontAwesomeIcon icon={faCartPlus} /> Add To Cart</button>
                }
            </div>
        </div>
    );
};

export default Product;