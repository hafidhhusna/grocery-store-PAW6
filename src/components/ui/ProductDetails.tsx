import React, { useState } from 'react';
import { PiNotePencilBold } from 'react-icons/pi';
import { FaTrashAlt } from 'react-icons/fa';

interface ProductItemProps {
  id: string; // Add id to props
  imageUrl: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  onDelete: (id: string) => void; // Callback for parent to update the UI after deletion
}

export const ProductItem: React.FC<ProductItemProps> = ({
  id,
  imageUrl,
  name,
  category,
  price,
  quantity,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity.toString());
  const [updatedImageUrl, setUpdatedImageUrl] = useState(imageUrl);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save logic here (e.g., send updated data to the server)
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/product/${id}`, {
        method: 'DELETE',
      });

      console.log(response);

      if (response.ok) {
        onDelete(id); // Notify parent to remove product from the list
        alert('Product deleted successfully.');
      } else {
        const error = await response.json();
        alert(`Failed to delete product: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-between border-2 border-yellow-300 p-4 rounded-md shadow-md mb-4">
      {/* Image */}
      <div
        className="flex-shrink-0 w-[7%] h-[80px] bg-gray-300 rounded-md relative overflow-hidden"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <img 
          src={updatedImageUrl} 
          alt={updatedName} 
          className="w-full h-full object-cover" 
        />
        {isEditing && isImageHovered && (
          <div className="absolute inset-0 flex justify-center items-center">
            <label
              className="cursor-pointer bg-[#5b5b5b] text-white font-semibold px-2 py-1 text-xs rounded-full"
              htmlFor="image-upload"
            >
              Change
            </label>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between text-center p-3" style={{ flexBasis: '28%' }}>
        {isEditing ? (
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="text-[#666876] break-words w-full border-b-2 border-gray-300 focus:outline-none"
          />
        ) : (
          <span className="text-[#666876] break-words">{updatedName}</span>
        )}
      </div>

      <div className="flex flex-col justify-center text-center p-2" style={{ flexBasis: '18%' }}>
        {isEditing ? (
          <input
            type="text"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
            className="text-[#666876] break-words w-full border-b-2 border-gray-300 focus:outline-none"
          />
        ) : (
          <span className="text-[#666876] break-words">{updatedCategory}</span>
        )}
      </div>

      <div className="flex flex-col justify-center text-center p-2" style={{ flexBasis: '15%' }}>
        {isEditing ? (
          <input
            type="text"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            className="text-[#666876] break-words w-full border-b-2 border-gray-300 focus:outline-none"
          />
        ) : (
          <span className="text-[#666876] break-words">{updatedPrice}</span>
        )}
      </div>

      <div className="flex flex-col justify-center text-center p-2" style={{ flexBasis: '10%' }}>
        {isEditing ? (
          <input
            type="number"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(e.target.value)}
            className="text-[#666876] break-words w-full border-b-2 border-gray-300 focus:outline-none"
          />
        ) : (
          <span className="text-[#666876] break-words">{updatedQuantity}</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center space-x-2" style={{ flexBasis: '22%' }}>
        <button
          className={`flex items-center ${isEditing ? 'bg-blue-400 hover:bg-blue-700 text-white' : 'bg-green-200 hover:bg-green-500 text-green-700'} px-4 py-2 rounded-md`}
          onClick={isEditing ? handleSave : handleEditToggle}
        >
          <PiNotePencilBold className="mr-2" />
          {isEditing ? 'Save' : 'Update'}
        </button>
        <button
          className="flex items-center bg-red-200 text-red-700 px-4 py-2 rounded-md hover:bg-red-300"
          onClick={handleDelete}
        >
          <FaTrashAlt className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
