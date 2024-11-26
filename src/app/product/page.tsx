"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";
import ProductBox from "@/components/ui/ProductBox";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
import Sort from "@/components/ui/Sort";  // Import komponen Sort

interface Product {
  id: string;
  name: string;
  detail: string;
  price: number;
  images: string;
  category: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  // Fetch category name by ID
  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const res = await fetch(`/api/category?id=${categoryId}`);
        if (!res.ok) throw new Error("Failed to fetch category");
        const data: Category = await res.json();
        setCategoryName(data.name);
      } catch (err) {
        console.error(err);
      }
    };

    if (categoryId) {
      fetchCategoryName();
    }
  }, [categoryId]);

  // Fetch products by category ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/product?category=${categoryId}`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Section */}
      <div className="flex flex-1 h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <SideBar />

        {/* Content */}
        <div className="p-8 flex-1">
          {/* Header for category with Sort on the right */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              <Link href="/category">Categories &gt; {categoryName}</Link>
            </h2>
            {/* Sort Component on the right */}
            <Sort />
          </div>

          {/* Loading and Error Handling */}
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display Products */}
          {!loading && !error && (
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-3">
              {products.map((product) => (
                <ProductBox
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageSrc={product.images}
                  productId={product.id}
                  userId={session?.user?.id} // Pass userId from session
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <SessionProvider>
      <CategoryPage />
    </SessionProvider>
  );
}
