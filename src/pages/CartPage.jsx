import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../CartItem';
import './CartPage.css';

function CartPage() {
  const navigate = useNavigate();

  const handleContinueShopping = (e) => {
    e?.preventDefault?.();
    navigate('/products');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <main className="cart-page">
      <div className="cart-page-inner">
        <CartItem onContinueShopping={handleContinueShopping} onCheckout={handleCheckout} />
      </div>
    </main>
  );
}

export default CartPage;
