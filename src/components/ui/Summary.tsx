// components/Summary.tsx
import React from 'react';
import './Summary.css';

function Summary() {
  return (
    <div className="checkout-summary">
      <div className="checkout-item">
        <p>Product Name 1</p>
        <p>Rp. 0,00</p>
      </div>
      <div className="checkout-item">
        <p>Product Name 2</p>
        <p>Rp. 0,00</p>
      </div>
      <div className="checkout-item subtotal">
        <p>SUBTOTAL</p>
        <p>Rp. 0,00</p>
      </div>
      <div className="checkout-item">
        <p>Shipping Cost</p>
        <p>Rp. 0,00</p>
      </div>
      <div className="checkout-item">
        <p>Tax</p>
        <p>Rp. 0,00</p>
      </div>
      <div className="checkout-total">
        <p>TOTAL</p>
        <p>Rp. 0,00</p>
      </div>
      <button className="checkout-button">Checkout</button>
    </div>
  );
}

export default Summary;
