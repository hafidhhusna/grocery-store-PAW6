"use client";
import React from "react";
import Header from "@/components/ui/Header";
import AdminSidebar from "@/components/ui/AdminSideBar";
import ProductItem from "@/components/ui/ProductDetails";
import Link from "next/link";

const products = [
  { imageUrl: 'https://via.placeholder.com/100', name: 'Product A', category: 'Category A', price: 'Rp 100,000', quantity: 10 },
  { imageUrl: 'https://via.placeholder.com/100', name: 'Product B', category: 'Category B', price: 'Rp 200,000', quantity: 5 },
  { imageUrl: 'https://via.placeholder.com/100', name: 'Product C', category: 'Category C', price: 'Rp 300,000', quantity: 3 },
];

const OurProduct: React.FC = () => {
  return (
    <div className="flex flex-col h-screen"> {/* Change to flex-col so header is on top and sidebar is below */}
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden"> {/* Sidebar and Main Content side by side */}
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl text-[#666876] font-bold">Our Product</h1>
            {/* Add New Product Button */}
            <Link href="/new-product">
              <button className="bg-[#4DA14D] font-semibold text-sm text-white px-4 py-2 rounded-md hover:bg-[#8CCC8C]">
                + Add New Product
              </button>
            </Link>
          </div>

          <div className="bg-[#FFF281] text-[#666876] p-4 mb-4 rounded-md">
            <div className="flex justify-between">
              <span className="font-bold w-[7%] text-center">Image</span>
              <span className="font-bold w-[28%] text-center">Name</span>
              <span className="font-bold w-[18%] text-center">Categories</span>
              <span className="font-bold w-[15%] text-center">Price</span>
              <span className="font-bold w-[10%] text-center">Stock Quantity</span>
              <span className="font-bold w-[22%] text-center">Action</span>
            </div>
          </div>
          {products.map((product, index) => (
            <ProductItem key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProduct;
