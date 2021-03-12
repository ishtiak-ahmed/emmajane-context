import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from './ReviewItem';
import Cart from '../Cart/Cart';
import './Review.css'
import happyImage from "../../images/giphy.gif"


const Review = () => {
    const [cart, setCart] = useState([])
    const [oderderPlaced, setOrderPlaced] = useState(false)
    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.count = saveCart[key]
            product.totalPrice = product.price * product.count
            return product
        })
        setCart(cartProduct)
    }, [])
    const thankYou = <img src={happyImage} alt="" />
    const totalItem = cart.reduce((total, prd) => total + prd.count, 0)
    const removeProduct = (key) => {
        const newCart = cart.filter(pd => pd.key !== key)
        setCart(newCart)
        removeFromDatabaseCart(key)
    }

    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlaced(true)
        processOrder()
    }
    return (
        <main>
            <div className="item">
                <h2>Total Item : {totalItem}</h2>
                {
                    cart.map(product => <ReviewItem event={removeProduct} key={product.key} product={product}></ReviewItem>)
                }
                {
                    oderderPlaced && thankYou
                }
            </div>
            <div className="cart">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
        </main>
    );
};

export default Review;