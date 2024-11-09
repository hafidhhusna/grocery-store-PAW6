// components/CartItem.tsx
import React from 'react';
import './CartItem.css';

interface CartItemProps {
  name: string;
  price: number;
  onToggleSelect: (selected: boolean) => void;
  onDelete: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, onToggleSelect, onDelete }) => {
  return (
    <div className="cart-item">
      <input type="checkbox" className="product-checkbox" onChange={(e) => onToggleSelect(e.target.checked)} />
      <div className="cart-image">
        <span>Img</span>
      </div>
      <div className="cart-details">
        <span className="product-name">{name}</span>
        <span className="product-price">Rp {price.toFixed(2).replace('.', ',')} / pcs</span>
      </div>
      <div className="cart-quantity">
        <button className="qty-btn">-</button>
        <span className="qty-number">0</span>
        <button className="qty-btn">+</button>
      </div>
      <div className="price-total">Rp {price.toFixed(2).replace('.', ',')}</div>
      <div className="delete-icon" onClick={onDelete}>🗑️</div>
    </div>
  );
};

export default CartItem;
