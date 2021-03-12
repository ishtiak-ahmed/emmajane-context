import React from 'react';
import { NavLink } from 'react-router-dom';
import './Cart.css'
const Cart = (props) => {
    const formatNumber = num => (Number(num.toFixed(2)))

    const cart = props.cart
    const total = formatNumber(cart.reduce((total, prd) => {

        return total + (prd.totalPrice ?? prd.price)
    }
        , 0));
    const shippingCost = total > 35 ? 0 : total > 15 ? 4.99 : 12.99;
    const tax = formatNumber(total / 10);
    const grandTotal = formatNumber(total + shippingCost + tax)


    return (
        <div id="cart">
            <h3 className="text-primary">Order Summary</h3>
            <p>Items ordered: {cart.length}</p>
            <p>Product Price: {total}</p>
            <p>Tax & Vat: {tax}</p>
            <p><small>Shipping Cost: {shippingCost}</small></p>
            <p>Total Cost: {grandTotal}</p>
            <br />
            {
                props.children
            }

            <p id="dev"><small>Developed by <a href="https://github.com/ishtiak-ahmed">Ishtiak Ahmed</a></small></p>
        </div>
    );
};

export default Cart;