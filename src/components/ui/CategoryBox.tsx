// src/components/CategoryBox.tsx
import React from 'react';

interface CategoryBoxProps {
  title: string;
  imageSrc: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ title, imageSrc }) => {
  return (
    <div className="flex flex-col items-center justify-center w-40 h-40 border-2 border-yellow-300 bg-white rounded-lg shadow-md">
      <div className="w-20 h-20 border-2 border-yellow-300 bg-white rounded-md mb-2 flex items-center justify-center overflow-hidden">
        <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
      </div>
      <p className="text-gray-700 font-semibold text-center">{title}</p>
    </div>
  );
};

export default CategoryBox;
