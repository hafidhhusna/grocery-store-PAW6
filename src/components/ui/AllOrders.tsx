import React, { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import { FaCheckSquare } from "react-icons/fa";

interface OrderItemProps {
  orderNo: string;
  date: string;
  totalOrder: string;
  status: string;
  viewDetailsLink: string;
}

const OrderItem: React.FC<OrderItemProps> = ({
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

  return (
    <div className="order-item flex justify-between items-center px-4 py-2 border-2 border-yellow-300 rounded-lg shadow-md bg-white mb-2">
      {/* Order Number */}
      <span className="order-no text-center text-sm font-semibold"
            style={{ flexBasis: "30%" }}
        >
        {orderNo}
      </span>

      {/* Date */}
      <span className="date text-center text-sm"
            style={{ flexBasis: "23%" }}
        >{date}</span>

      {/* Total Order */}
      <span className="total-order text-center text-sm"
            style={{ flexBasis: "24%" }}
        >
        {totalOrder}
      </span>

      {/* Status Section */}
      <div className="status flex items-center justify-center space-x-2"
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
              onClick={() => setIsEditing(false)}
            />
          </>
        ) : (
          <>
            {/* Display status */}
            <span
              className={`text-sm font-semibold ${getStatusColor(status)}`}
            >
              {status}
            </span>
            <HiPencilAlt
              className="text-gray-500 cursor-pointer text-lg"
              onClick={() => setIsEditing(true)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
