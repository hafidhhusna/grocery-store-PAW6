import React from 'react';
import { useRouter } from 'next/navigation';

interface CategoryBoxProps {
  id: string;
  title: string;
  imageSrc: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ id, title, imageSrc }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the products page with the corresponding category ID
    router.push(`/product?category=${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-40 h-40 border-2 border-yellow-300 bg-white rounded-lg shadow-md cursor-pointer 
      transition-transform duration-200 transform hover:shadow-lg hover:scale-105"
    >
      <div className="w-20 h-20 border-2 border-yellow-300 bg-white rounded-md mb-2 flex items-center justify-center overflow-hidden">
        <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
      </div>
      <p className="text-gray-700 font-semibold text-center">{title}</p>
    </div>
  );
};

export default CategoryBox;
