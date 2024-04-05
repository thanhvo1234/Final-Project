import React, { useState, useContext } from 'react';
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
// import nav_menu from "../../assets/nav_menu.png"

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    

    return (
        <div className="navBar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                
            </div>
            {/* <img src={nav_menu} alt="" /> */}
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link className="nav-link" style={{textDecoration:"none"}} to="/">Shop</Link>{menu==="shop"?<hr/>:null}</li>
                <li onClick={()=>{setMenu("mens")}}><Link className="nav-link" style={{textDecoration:"none"}} to="/mens">Men</Link>{menu==="mens"?<hr/>:null}</li>
                <li onClick={()=>{setMenu("womens")}}><Link className="nav-link" style={{textDecoration:"none"}} to="/womens">Women</Link>{menu==="womens"?<hr/>:null}</li>
                <li onClick={()=>{setMenu("kids")}}><Link className="nav-link" style={{textDecoration:"none"}} to="/kids">Kids</Link>{menu==="kids"?<hr/>:null}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to="/login"><button>Login</button></Link>
                <Link to="/cart"><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;
