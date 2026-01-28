import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateQuantity, removeItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [localQty, setLocalQty] = useState({});

  const getCartItem = (id) => cartItems.find((item) => item.id === id);
  const getDisplayQty = (plantId) => {
    const cartItem = getCartItem(plantId);
    if (cartItem) return cartItem.quantity;
    return localQty[plantId] ?? 1;
  };

  const setDisplayQty = (plantId, delta) => {
    const cartItem = getCartItem(plantId);
    if (cartItem) {
      const newQty = cartItem.quantity + delta;
      if (newQty < 1) dispatch(removeItem(plantId));
      else dispatch(updateQuantity({ id: plantId, quantity: newQty }));
    } else {
      setLocalQty((prev) => {
        const current = prev[plantId] ?? 1;
        const next = Math.max(1, current + delta);
        return { ...prev, [plantId]: next };
      });
    }
  };

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        { id: 1, name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg', description: 'Produces oxygen at night, improving air quality.', cost: 15 },
        { id: 2, name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
        { id: 3, name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg', description: 'Removes mold spores and purifies the air.', cost: 18 },
        { id: 4, name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg', description: 'Adds humidity to the air and removes toxins.', cost: 20 },
        { id: 5, name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg', description: 'Easy to care for and effective at removing toxins.', cost: 17 },
        { id: 6, name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg', description: 'Purifies the air and has healing properties for skin.', cost: 14 },
      ],
    },
  ];

  const allPlants = plantsArray.flatMap((cat) => cat.plants);

  const handleAddToCart = (product, qty) => {
    dispatch(addItem({ ...product, quantity: qty }));
  };

  return (
    <main className="products-page">
      <h1 className="products-page-title">Our Plants</h1>
      <div className="products-grid">
        {allPlants.map((plant) => {
          const cartItem = getCartItem(plant.id);
          const qty = getDisplayQty(plant.id);
          return (
            <article className="product-card" key={plant.id}>
              <div className="product-image-wrap">
                <img className="product-image" src={plant.image} alt={plant.name} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{plant.name}</h3>
                <p className="product-description">{plant.description}</p>
                <div className="product-cost">${plant.cost}</div>
                <div className="product-actions">
                  <div className="product-qty">
                    <button
                      type="button"
                      className="product-qty-btn"
                      onClick={() => setDisplayQty(plant.id, -1)}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="product-qty-value">{qty}</span>
                    <button
                      type="button"
                      className="product-qty-btn"
                      onClick={() => setDisplayQty(plant.id, 1)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  {!cartItem ? (
                    <button
                      type="button"
                      className="product-button"
                      onClick={() => handleAddToCart(plant, qty)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <span className="product-in-cart">In cart</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default ProductList;
