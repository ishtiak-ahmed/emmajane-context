import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import Button from '@material-ui/core/Button';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        let range = [[0, 0], [0, 10], [10, 20], [20, 30], [30, 40], [40, 50], [50, 60], [60, 70], [70, 81]]
        const items = fakeData.slice(...range[page])
        setProducts(items)
    }, [page])
    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.count = savedCart[key]
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
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product handleAddProduct={handleAddProduct} showButton={true} key={product.key} product={product}></Product>)
                }
                <div className="navbtn">
                    <Button size="small" onClick={() => setPage(page - 1)} variant="contained" color="primary">Prev</Button>
                    <span>Current Page {page}</span>
                    <Button size="small" onClick={() => setPage(page + 1)} variant="contained" color="primary">Next</Button>
                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;