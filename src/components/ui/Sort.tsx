import React, { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import { FaSortAlphaDown, FaSortAmountDownAlt, FaSortAmountDown } from "react-icons/fa";

interface SortProps {
  onSortChange: (sortField: string, sortOrder: string) => void;
}

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("Default");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSortSelect = (sortOption: string) => {
    setSelectedSort(sortOption);
    setIsOpen(false);

    // Notify parent component
    switch (sortOption) {
      case "A to Z":
        onSortChange("name", "asc");
        break;
      case "Lower to Higher Price":
        onSortChange("price", "asc");
        break;
      case "Higher to Lower Price":
        onSortChange("price", "desc");
        break;
      default:
        onSortChange("", ""); // Default or reset
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-lg font-medium text-gray-700 hover:text-gray-600 focus:outline-none"
      >
        <span>{selectedSort}</span>
        <TbArrowsSort className="ml-2 text-xl" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md text-gray-700 w-40">
          <div
            onClick={() => handleSortSelect("Default")}
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
