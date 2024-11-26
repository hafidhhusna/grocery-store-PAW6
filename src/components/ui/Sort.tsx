import React, { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { FaSortAlphaDown, FaSortAmountDownAlt, FaSortAmountDown } from "react-icons/fa";

const Sort: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("Sort");
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSortSelect = (sortOption: string) => {
    setSelectedSort(sortOption);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      {/* Sort Button with Hover */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-lg font-medium text-gray-700 hover:text-gray-600 focus:outline-none"
      >
        <span>{selectedSort}</span>
        <TbArrowsSort className="ml-2 text-xl" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md text-gray-700 w-40">
          {/* Default Selection with Icon */}
          <div
            onClick={() => handleSortSelect("Sort")}
            className="p-2 cursor-pointer hover:bg-gray-200 text-base flex items-center"
          >
            <TbArrowsSort className="mr-2" />
            <span>Default</span>
          </div>

          <div
            onClick={() => handleSortSelect("A to Z")}
            className="p-2 cursor-pointer hover:bg-gray-200 text-base flex items-center"
          >
            <FaSortAlphaDown className="mr-2" />
            <span>A to Z</span>
          </div>
          <div
            onClick={() => handleSortSelect("Lower to Higher Price")}
            className="p-2 cursor-pointer hover:bg-gray-200 text-base flex items-center"
          >
            <FaSortAmountDownAlt className="mr-2" />
            <span>Lower to Higher Price</span>
          </div>
          <div
            onClick={() => handleSortSelect("Higher to Lower Price")}
            className="p-2 cursor-pointer hover:bg-gray-200 text-base flex items-center"
          >
            <FaSortAmountDown className="mr-2" />
            <span>Higher to Lower Price</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
