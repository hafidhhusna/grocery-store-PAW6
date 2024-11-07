// App.js
import React from 'react';
import './App.css';
import CartItem from './components/CartItem';
import CheckoutSummary from './components/CheckoutSummary';

function App() {
  return (
    <div className="App">
      <h1>Your Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <span>Product Name</span>
            <span>Price per pcs</span>
            <span>Qty</span>
            <span>Price Total</span>
          </div>
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <CheckoutSummary />
      </div>
    </div>
  );
}

export default App;
