import React, { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { FaCheckSquare } from "react-icons/fa";

interface OrderItemProps {
  id: string; // order id for the API call
  orderNo: string;
  date: string;
  totalOrder: string;
  status: string;
  viewDetailsLink: string;
}

const AllOrders: React.FC<OrderItemProps> = ({
  id,
  orderNo,
  date,
  totalOrder,
  status: initialStatus,
  viewDetailsLink,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  // Determine status color based on the value
  const getStatusColor = (status: string) => {
    if (status.toLowerCase() === "on progress") return "text-red-500";
    if (status.toLowerCase() === "done") return "text-green-500";
    return "text-blue-500";
  };

  const handleStatusUpdate = async () => {
    try {
      console.log(id);
      const response = await fetch(`/api/order/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Send the updated status in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const data = await response.json();
      setIsEditing(false); // Stop editing once the status is successfully updated
      setStatus(data.status); // Update the status with the new value from the API
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again later.");
    }
  };

  return (
    <div className="order-item flex justify-between items-center px-4 py-2 border-2 border-yellow-300 rounded-lg shadow-md bg-white mb-2">
      {/* Order Number */}
      <span
        className="order-no text-center text-sm font-semibold"
        style={{ flexBasis: "30%" }}
      >
        {orderNo}
      </span>

      {/* Date */}
      <span
        className="date text-center text-sm"
        style={{ flexBasis: "23%" }}
      >
        {date}
      </span>

      {/* Total Order */}
      <span
        className="total-order text-center text-sm"
        style={{ flexBasis: "24%" }}
      >
        {totalOrder}
      </span>

      {/* Status Section */}
      <div
        className="status flex items-center justify-center space-x-2"
        style={{ flexBasis: "23%" }}
      >
        {isEditing ? (
          <>
            {/* Input for editing */}
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm w-24 focus:outline-none focus:ring focus:ring-yellow-200"
            />
            <FaCheckSquare
              className="text-green-500 cursor-pointer text-lg"
              onClick={handleStatusUpdate} // Update the status when clicked
            />
          </>
        ) : (
          <>
            {/* Display status */}
            <span className={`text-sm font-semibold ${getStatusColor(status)}`}>
              {status}
            </span>
            <HiPencilAlt
              className="text-gray-500 cursor-pointer text-lg"
              onClick={() => setIsEditing(true)} // Enable editing when clicked
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
