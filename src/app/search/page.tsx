'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import ProductBox from '@/components/ui/ProductBox';
import Link from 'next/link';
import { SessionProvider, useSession } from 'next-auth/react';
import { Suspense } from "react";


interface Product {
  id: string;
  name: string;
  detail: string;
  price: number;
  images: string;
  category: {
    name: string;
  };
  quantity:number;
};

const SearchPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  // Fetch products by category ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/product?search=${searchQuery}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Section */}
      <div className="flex flex-1 h-screen bg-gray-100">
        {/* Sidebar */}
        <SideBar />

        {/* Content */}
        <div className="p-8 flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Search Result
          </h2>

          {/* Loading and Error Handling */}
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display Products */}
          {!loading && !error && (
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6">
              {products.map((product) => (
                <ProductBox
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageSrc={product.images}
                  productId={product.id}
                  userId={session?.user.id}
                  stock={product.quantity}
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
      <Suspense fallback={<p>Loading...</p>}>
        <SearchPage />
      </Suspense>
    </SessionProvider>
  );
}
