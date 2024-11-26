import React, { useState, useEffect } from 'react';
import { PiNotePencilBold } from 'react-icons/pi';
import { FaTrashAlt } from 'react-icons/fa';

interface ProductItemProps {
  id: string;
  imageUrl: string;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  quantity: number;
  onDelete: (id: string) => void;
  onUpdate: (updatedProduct: any) => void; // Function to pass updated product to parent component
}

export const ProductItem: React.FC<ProductItemProps> = ({
  id,
  imageUrl,
  name,
  category,
  categoryId,
  price,
  quantity,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const [updatedPrice, setUpdatedPrice] = useState(price.toString());
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity.toString());
  const [updatedImageUrl, setUpdatedImageUrl] = useState(imageUrl);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [categories, setCategories] = useState<any[]>([]); // Categories state
  const [updatedCategoryId, setUpdatedCategoryId] = useState(categoryId);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category');
        const data = await res.json();
        setCategories(data); // Assuming data is an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // Send the updated data to the API
    const priceAsFloat = parseFloat(updatedPrice);
    const quantityAsFloat = parseFloat(updatedQuantity);

    try {
      const response = await fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedName,
          category: updatedCategory,
          categoryId: updatedCategoryId,
          price: priceAsFloat,
          quantity: quantityAsFloat,
          imageUrl: updatedImageUrl,
        }),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onUpdate(updatedProduct); // Pass the updated product to the parent
        setIsEditing(false);
        alert('Product updated successfully.');
      } else {
        const error = await response.json();
        alert(`Failed to update product: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/product/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id);
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

      {/* Category */}
      <div className="flex flex-col justify-center text-center p-2" style={{ flexBasis: '18%' }}>
        {isEditing ? (
          <select
            value={updatedCategory}
            onChange={(e) => {setUpdatedCategory(e.target.value); setUpdatedCategoryId(e.target.value);}}
            className="text-[#666876] w-full border-b-2 border-gray-300 focus:outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-[#666876] break-words">{updatedCategory}</span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col justify-center text-center p-2" style={{ flexBasis: '15%' }}>
        {isEditing ? (
          <input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            className="text-[#666876] break-words w-full border-b-2 border-gray-300 focus:outline-none"
          />
        ) : (
          <span className="text-[#666876] break-words">{updatedPrice}</span>
        )}
      </div>

      {/* Quantity */}
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
