import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../CartSlice';
import './CheckoutPage.css';

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!address.trim()) {
      setError('Please enter your address.');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    dispatch(clearCart());
    navigate('/order-placed', { replace: true });
  };

  if (cart.length === 0 && !name && !address) {
    return (
      <main className="checkout-page">
        <div className="checkout-inner">
          <h1>Checkout</h1>
          <p className="checkout-empty">Your cart is empty. Add products to checkout.</p>
          <button type="button" className="checkout-btn" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-inner">
        <h1 className="checkout-heading">Checkout</h1>

        <div className="checkout-layout">
          <section className="checkout-form-section">
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              {error && <div className="checkout-error">{error}</div>}
              <div className="form-row">
                <label htmlFor="checkout-name">Full Name</label>
                <input
                  id="checkout-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-row">
                <label htmlFor="checkout-address">Delivery Address</label>
                <textarea
                  id="checkout-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  rows={3}
                />
              </div>
              <button type="submit" className="checkout-btn checkout-btn-primary">
                Place Order
              </button>
            </form>
          </section>

          <section className="checkout-summary">
            <h2>Order Summary</h2>
            <ul className="checkout-items">
              {cart.map((item) => (
                <li key={item.id} className="checkout-item-row">
                  <span className="checkout-item-name">{item.name} × {item.quantity}</span>
                  <span className="checkout-item-price">${(item.cost * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </section>
        </div>

        <button type="button" className="checkout-back" onClick={() => navigate('/cart')}>
          Back to Cart
        </button>
      </div>
    </main>
  );
}

export default CheckoutPage;
