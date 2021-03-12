import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import Button from '@material-ui/core/Button';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { NavLink } from 'react-router-dom';

const Shop = () => {
    const [page, setPage] = useState(1)
    let range = [[0, 0], [0, 10], [10, 20], [20, 30], [30, 40], [40, 50], [50, 60], [60, 70], [70, 81]]
    const currentRange = (num, num2) => fakeData.slice(num, num2)
    const currentProduct = currentRange(...range[page])
    console.log(currentProduct)
    const [products, setProducts] = useState(currentProduct)
    const [cart, setCart] = useState([])

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

    const handleAddProduct = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        const productCount = newCart.filter(pd => pd.key === product.key)
        const count = productCount.length
        addToDatabaseCart(product.key, count)
    }
    const showPrev = () => {
        if (page > 1) {
            setPage(page - 1)
            setProducts(currentRange(...range[page]))
        }
    }
    const showNext = () => {
        if (page < 8) {
            setPage(page + 1)
            setProducts(currentRange(...range[page]))
        }
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product handleAddProduct={handleAddProduct} showButton={true} key={product.key} product={product}></Product>)
                }
                <div className="navbtn">
                    <Button size="small" onClick={showPrev} variant="contained" color="primary">Prev</Button>
                    <span>Current Page {page}</span>
                    <Button size="small" onClick={showNext} variant="contained" color="primary">Next</Button>
                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <NavLink to='/review'>
                        <button>Review Order</button>
                    </NavLink>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;