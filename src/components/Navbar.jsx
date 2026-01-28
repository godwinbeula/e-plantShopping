import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../CartSlice';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const isLoginPage = location.pathname === '/login';
  const isLoggedIn = !!localStorage.getItem('nurasey_user');

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('nurasey_user');
    dispatch(clearCart());
    navigate('/login', { replace: true });
  };

  if (isLoginPage || !isLoggedIn) return null;

  return (
    <header className="app-navbar">
      <Link to="/products" className="navbar-brand">
        <img
          src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
          alt=""
          className="navbar-logo"
        />
        <div className="navbar-brand-text">
          <h3>Plant Shopping</h3>
          <span>Where Green Meets Serenity</span>
        </div>
      </Link>
      <nav className="navbar-links">
        <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
          Products
        </Link>
        <Link to="/cart" className={`navbar-cart-link ${location.pathname === '/cart' ? 'active' : ''}`}>
          <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="28" height="28">
            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="10" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
        <button type="button" className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
