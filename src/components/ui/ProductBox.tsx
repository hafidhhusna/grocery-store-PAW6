"use client"; 

import React, { useState } from 'react';

interface ProductBoxProps {
  name: string;
  price: number;
  imageSrc: string;
}

const ProductBox: React.FC<ProductBoxProps> = ({ name, price, imageSrc }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(1); 
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity === 1) {
        return 0; 
      }
      return prevQuantity - 1;
    });
  };

  return (
    <div className="flex flex-col items-center w-40 h-56 border-2 border-yellow-300 bg-white rounded-lg shadow-md p-2">
      <div className="w-24 h-24 border-2 border-yellow-300 bg-white rounded-md mb-2 flex items-center justify-center overflow-hidden">
        <img src={imageSrc} alt={name} className="object-cover w-full h-full" />
      </div>
      <p className="text-gray-700 font-semibold text-center">{name}</p>
      <p className="text-gray-600 text-center">Rp. {price.toFixed(2)}</p>
      {quantity === 0 ? (
        <button
          onClick={handleAddToCart}
          className="mt-2 px-4 py-1 bg-yellow-300 text-white font-semibold rounded-md"
        >
          Add to cart
        </button>
      ) : (
        <div className="flex items-center mt-2 space-x-2">
          <button
            onClick={handleDecrement}
            className="px-2 py-1 bg-gray-300 text-gray-700 font-semibold rounded-md"
          >
            -
          </button>
          <span className="text-gray-700 font-semibold">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-2 py-1 bg-gray-300 text-gray-700 font-semibold rounded-md"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductBox;
