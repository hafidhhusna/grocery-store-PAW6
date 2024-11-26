"use client"

import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import CategoryBox from '@/components/ui/CategoryBox';
import Sort from '@/components/ui/Sort'; // Import komponen Sort

interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
}

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>

            {/* Sort Component */}
            <Sort />
          </div>

          {/* Loading and Error States */}
          {loading && <p>Loading categories...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display Categories */}
          {!loading && !error && (
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-3">
              {categories.map((category) => (
                <CategoryBox
                  key={category.id}
                  id={category.id}
                  title={category.name}
                  imageSrc={category.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
