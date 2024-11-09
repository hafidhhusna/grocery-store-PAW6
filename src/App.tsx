// App.tsx
import React, { useState } from 'react';
import './App.css';
import CartItem from './components/CartItem';
import Summary from './components/Summary';

interface CartItemData {
  id: number;
  name: string;
  price: number;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    { id: 1, name: 'Product Name 1', price: 0 },
    { id: 2, name: 'Product Name 2', price: 0 },
    { id: 3, name: 'Product Name 3', price: 0 },
  ]);

  const handleToggleSelect = (id: number, selected: boolean) => {
    console.log(`Item ${id} selected: ${selected}`);
  };

  const handleDelete = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <h1>Your Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <span>Product Name</span>
            <span>Price per pcs</span>
            <span>Qty</span>
            <span>Total Price</span>
          </div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              price={item.price}
              onToggleSelect={(selected: boolean) => handleToggleSelect(item.id, selected)}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
        <Summary />
      </div>
    </div>
  );
}

export default App;
