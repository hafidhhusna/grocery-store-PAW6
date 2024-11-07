import React from 'react';
import './CartItem.css';

function CartItem() {
  return (
    <div className="cart-item">
  <input type="checkbox" className="product-checkbox" />
  <div className="cart-image">
    <span>Img</span>
  </div>
      <div className="cart-details">
        <span className="product-name">Product Name</span>
      </div>
      <div className="product-price">Rp 0,00 / pcs</div>
      <div className="cart-quantity">
        <button className="qty-btn">-</button>
        <span className="qty-number">0</span>
        <button className="qty-btn">+</button>
      </div>
      <div className="price-total">Rp 0,00</div>
      <div className="delete-icon">🗑️</div>
    </div>
  );
}

export default CartItem;
