import React from 'react';
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import ProductBox from '@/components/ui/ProductBox';

const CategoryPage: React.FC = () => {
  const products = [
    { name: 'Product Name 1', price: 0.0, imageSrc: 'path/to/product-image-1.jpg' },
    { name: 'Product Name 2', price: 0.0, imageSrc: 'path/to/product-image-2.jpg' },
    { name: 'Product Name 3', price: 0.0, imageSrc: 'path/to/product-image-3.jpg' },
    { name: 'Product Name 4', price: 0.0, imageSrc: 'path/to/product-image-4.jpg' },
    { name: 'Product Name 5', price: 0.0, imageSrc: 'path/to/product-image-5.jpg' },
    { name: 'Product Name 6', price: 0.0, imageSrc: 'path/to/product-image-6.jpg' },
  ];

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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products &gt; Fruits & Vegetables</h2>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6">
            {products.map((product, index) => (
              <ProductBox
                key={index}
                name={product.name}
                price={product.price}
                imageSrc={product.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
