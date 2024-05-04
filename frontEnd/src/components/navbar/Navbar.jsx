// Navbar.js
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart.png";
import userImg from "../../assets/user.jpg";
import search from "../../assets/search.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useGetCartData } from "../../hooks/useCart";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const user = JSON.parse(localStorage.getItem('user'));
  const cartId = user?.cart?.id;
  const userId = user?.userId;
  const { data: cartData } = useGetCartData(cartId);
  const count = (cartData?.data?.items?.length) || 0;
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("shippingAddress");
    navigate("/", { replace: true });
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link style={{textDecoration: 'none'}} to="/"><img src={logo} alt="" style={{ width:"200px", height: "100px" }} /></Link>
      </div>
      <div className="nav-login-cart">
      {isAuthenticated ? (
        <>
        <Link style={{ textDecoration: 'none' }} to="/search">
            <img src={search} alt="" style={{ width: "auto", height: "30px" }} />
          </Link>
          <Link style={{ textDecoration: 'none' }} to={`/profile/${userId}`}>
            <img src={userImg} alt="" style={{ width: "auto", height: "30px" }} />
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/cart">
            <img src={cart} alt="" style={{ width: "auto", height: "25px" }} />
          </Link>
        </>
      ) : (
        <>
        <Link style={{ textDecoration: 'none' }} to="/search">
            <img src={search} alt="" style={{ width: "auto", height: "30px" }} />
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/">
            <img src={userImg} alt="" style={{ width: "auto", height: "30px" }} />
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/">
            <img src={cart} alt="" style={{ width: "auto", height: "25px" }} />
          </Link>
        </>
      )}
      
      <div className="nav-item-count">{count}</div>
        {isAuthenticated ? (
          <button onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: 'none' }} to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
