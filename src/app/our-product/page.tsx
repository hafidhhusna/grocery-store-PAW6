"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import AdminSidebar from "@/components/ui/AdminSideBar";
import ProductItem from "@/components/ui/ProductDetails";
import Link from "next/link";
import Sort from "@/components/ui/Sort"; // Import Sort component

const OurProduct: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortField, setSortField] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/product?sort=${sortOrder}&search=${searchQuery}&sortField=${sortField}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchProducts();
  }, [sortField, sortOrder, searchQuery, categoryId]); // Re-fetch when sort, search, or category change

  const handleDeleteProduct = (id: string) => {
    fetchProducts();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl text-[#666876] font-bold">Our Product</h1>
            <div className="flex items-center space-x-4">
              {/* Sort Component */}
              <Sort
                onSortChange={(field, order) => {
                  setSortField(field);
                  setSortOrder(order);
                }}
              />
              {/* Add New Product Button */}
              <Link href="/new-product">
                <button className="bg-[#4DA14D] font-semibold text-sm text-white px-4 py-2 rounded-md hover:bg-[#8CCC8C]">
                  + Add New Product
                </button>
              </Link>
            </div>
          </div>

          {/* Product Table Header */}
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

          {/* Loading Indicator */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            products.map((product, index) => (
            <ProductItem
                key={index}
                id={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                category={product.category}
                price={product.price}
                quantity={product.quantity}
                onDelete={handleDeleteProduct} // Pass down the delete handler
              />))
          )}
        </div>
      </div>
    </div>
  );
};

export default OurProduct;
