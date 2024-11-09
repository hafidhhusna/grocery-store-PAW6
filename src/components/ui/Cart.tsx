// src/components/Cart.tsx
import React, { useState } from 'react';
import CartItem from './CartItem';

interface Item {
  id: number;
  name: string;
  price: number;
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Product Name 1', price: 10000 },
    { id: 2, name: 'Product Name 2', price: 20000 },
    { id: 3, name: 'Product Name 3', price: 30000 },
  ]);

  const handleToggleSelect = (id: number, selected: boolean) => {
    console.log(`Item ${id} selected: ${selected}`);
  };

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            onToggleSelect={(selected) => handleToggleSelect(item.id, selected)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
