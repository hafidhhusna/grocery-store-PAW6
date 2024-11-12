import React from 'react';
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import CategoryBox from '@/components/ui/CategoryBox';

const HomePage: React.FC = () => {
  const categories = [
    { title: 'Fruits & Vegetables', imageSrc: 'path/to/fruit-image.jpg' },
    { title: 'Dairy & Eggs', imageSrc: 'path/to/dairy-image.jpg' },
    { title: 'Meat, Fish, & Poultry', imageSrc: 'path/to/meat-image.jpg' },
    { title: 'Spices & Condiments', imageSrc: 'path/to/spices-image.jpg' },
    { title: 'Snacks & Sweets', imageSrc: 'path/to/snacks-image.jpg' },
    { title: 'Beverages', imageSrc: 'path/to/beverages-image.jpg' },
    { title: 'Bakery & Bread', imageSrc: 'path/to/bakery-image.jpg' },
    { title: 'Canned Goods', imageSrc: 'path/to/canned-goods-image.jpg' },
    { title: 'Pasta & Rice', imageSrc: 'path/to/pasta-rice-image.jpg' },
    { title: 'Frozen Foods', imageSrc: 'path/to/frozen-foods-image.jpg' },
    { title: 'Breakfast & Cereal', imageSrc: 'path/to/breakfast-image.jpg' },
    { title: 'Oils, Sauces & Dressings', imageSrc: 'path/to/oils-sauces-image.jpg' },
    { title: 'Organic', imageSrc: 'path/to/organic-image.jpg' },
    { title: 'Personal Care', imageSrc: 'path/to/personal-care-image.jpg' },
    { title: 'Household Supplies', imageSrc: 'path/to/household-image.jpg' },
    { title: 'Baby Products', imageSrc: 'path/to/baby-products-image.jpg' },
    { title: 'Pet Supplies', imageSrc: 'path/to/pet-supplies-image.jpg' },
    { title: 'Health & Wellness', imageSrc: 'path/to/health-wellness-image.jpg' },
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-6">
            {categories.map((category, index) => (
              <CategoryBox key={index} title={category.title} imageSrc={category.imageSrc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
