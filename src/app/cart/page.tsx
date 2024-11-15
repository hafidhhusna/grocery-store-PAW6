// page.tsx
"use client";
import React, { useState } from 'react';
import './App.css';
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import CartItem from '@/components/ui/CartItem';
import Summary from '@/components/ui/Summary';

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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="flex flex-1">
        {/* SideBar Section */}
        <SideBar />

        {/* Main Content Section */}
        <main className="main-content p-8 flex-1">
          <div className="cart-list-container">
            <h2 className="cart-title">Your Cart</h2>
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
        </main>
      </div>
    </div>
  );
}

export default App;