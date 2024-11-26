import React from "react";
import "./Summary.css";

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

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal;

  return (
    <div className="checkout-summary">
      {cartItems.map((product) => (
        <div className="checkout-item" key={product.id}>
          <p>{product.name}</p>
          <p>Rp {(product.price * product.quantity).toFixed(2).replace(".", ",")}</p>
        </div>
      ))}
      <div className="checkout-total">
        <p>TOTAL</p>
        <p>Rp {total.toFixed(2).replace(".", ",")}</p>
      </div>
      <button className="checkout-button" onClick={onConfirm}>Checkout</button>
    </div>
  );
}

export default Summary;
