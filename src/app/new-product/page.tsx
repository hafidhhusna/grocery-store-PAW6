"use client";

import React, { useState } from "react";
import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";

const NewProduct: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("categories", categories);
    formData.append("price", price);
    formData.append("quantity", quantity);
    if (image) formData.append("image", image);

    // Save data or send to API
    console.log("Form Submitted");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 w-full">
      {/* Header */}
      <Header />

      {/* Main Content Section */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <SideBar />

        {/* Form Section */}
        <div className="flex-1 p-6 bg-white shadow-lg flex flex-col">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4 text-[#666876]">New Product</h2>

          {/* Form Fields */}
          <div className="flex gap-6">
            {/* Input Fields (70%) */}
            <div className="flex-[6.5]">
              <label className="block text-md font-medium text-[#666876] mt-2">Product Name:</label>
              <input
                type="text"
                className="w-full border-2 border-[#FFF281] rounded-md p-2 focus:outline-none mb-6 text-[#666876]"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <label className="block text-md font-medium text-[#666876]">Categories:</label>
              <select
                className="w-full border-2 border-[#FFF281] rounded-md p-2 focus:outline-none mb-6 text-[#666876]"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Category A">Category A</option>
                <option value="Category B">Category B</option>
                <option value="Category C">Category C</option>
              </select>
              <label className="block text-md font-medium text-[#666876]">Price:</label>
              <input
                type="text"
                className="w-full border-2 border-[#FFF281] rounded-md p-2 focus:outline-none mb-6 text-[#666876]"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label className="block text-md font-medium text-[#666876]">Quantity:</label>
              <input
                type="text"
                className="w-full border-2 border-[#FFF281] rounded-md p-2 focus:outline-none mb-6 text-[#666876]"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              {/* Submit Button */}
              <div className="flex justify-left mt-10">
                <button
                  className="bg-[#4DA14D] font-semibold text-white px-4 py-2 rounded-md hover:bg-[#8CCC8C]"
                  onClick={handleSubmit}
                >
                  + Add Product
                </button>
              </div>
            </div>

            {/* Image Upload (30%) */}
            <div className="flex-[3.5]">
              <label className="block text-md font-medium text-[#666876] mb-2">Product Image:</label>
              <div className="w-full border-2 border-[#FFF281] rounded-md flex items-center justify-center h-80 md:h-96">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Product"
                    className="h-full w-auto object-contain"
                  />
                ) : (
                  <span className="text-[#666876]">No image selected</span>
                )}
              </div>
              <input
                type="file"
                className="mt-2 text-[#666876]"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
