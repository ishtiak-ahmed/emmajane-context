import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContenxt } from '../../App';
// import logo from '../../images/logo.png'
import emmajane from '../../images/emmajane.png'
import './Header.css'


const Header = () => {
    const [loggedinUser] = useContext(UserContenxt)
    return (
        <div className='header'>
            <img src={emmajane} alt="" />
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/shop'>Shop</Link>
                <Link to='/review'>Review Order</Link>
                <Link to='/manage'>Manage Inventory</Link>
                <span >
                    {
                        loggedinUser.email ? <Link style={{ color: '#fffff3' }}>{loggedinUser.displayName}</Link> : <Link to='/login'>Login</Link>
                    }
                </span>
            </nav>
        </div>
    );
};

export default Header;