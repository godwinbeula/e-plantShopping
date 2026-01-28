import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPlacedPage.css';

function OrderPlacedPage() {
  const navigate = useNavigate();
  const orderId = 'NRS-' + Math.random().toString(36).slice(2, 10).toUpperCase();

  return (
    <main className="order-placed-page">
      <div className="order-placed-card">
        <div className="order-placed-icon">✓</div>
        <h1>Order Placed Successfully</h1>
        <p className="order-placed-message">
          Thank you for your order. We will deliver your plants soon.
        </p>
        <p className="order-placed-id">Order ID: <strong>{orderId}</strong></p>
        <button type="button" className="order-placed-btn" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    </main>
  );
}

export default OrderPlacedPage;
