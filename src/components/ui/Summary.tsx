import React from 'react';
import './Summary.css';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SummaryProps {
  cartItems: Product[];
  onConfirm: () => void;
}

function Summary({ cartItems, onConfirm }: SummaryProps) {
  const shippingCost = 10000;
  const taxRate = 0.1;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="checkout-summary">
      {cartItems.map((product) => (
        <div className="checkout-item" key={product.id}>
          <p>{product.name}</p>
          <p>Rp {((product.price * product.quantity).toFixed(2).replace('.', ','))}</p>
        </div>
      ))}
      <div className="checkout-item subtotal">
        <p>SUBTOTAL</p>
        <p>Rp {subtotal.toFixed(2).replace('.', ',')}</p>
      </div>
      <div className="checkout-item">
        <p>Shipping Cost</p>
        <p>Rp {shippingCost.toFixed(2).replace('.', ',')}</p>
      </div>
      <div className="checkout-item">
        <p>Tax</p>
        <p>Rp {tax.toFixed(2).replace('.', ',')}</p>
      </div>
      <div className="checkout-total">
        <p>TOTAL</p>
        <p>Rp {total.toFixed(2).replace('.', ',')}</p>
      </div>
      <button className="checkout-button" onClick={onConfirm}>Checkout</button>
    </div>
  );
}

export default Summary;
