"use client"

import React from "react";
import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

interface PaymentStatusProps {
  status: "success" | "failed" | "pending";
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ status }) => {
  const renderStatusContent = () => {
    switch (status) {
      case "success":
        return {
          icon: <FaRegCheckCircle className="text-[#4DA14D] text-8xl" />,
          title: "Success",
          description: "Your payment has been successfully processed. We truly appreciate your trust in our service. Should you have any questions, feel free to reach out to our customer support team.",
        };
      case "failed":
        return {
          icon: <VscError className="text-red-500 text-8xl" />,
          title: "Failed",
          description:
            "Unfortunately, we were unable to process your payment at this time. This may be due to insufficient funds, incorrect card details, or a network error. Please review your payment information and try again or contact support.",
        };
      case "pending":
        return {
          icon: <FaRegClock className="text-yellow-500 text-8xl" />,
          title: "Pending",
          description:
            "Your payment is currently being processed and is in the pending status. This could take a few minutes to several hours. Please wait a moment, and we will update you shortly.",
        };
      default:
        return null;
    }
  };

  const statusContent = renderStatusContent();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      {statusContent?.icon}
      <h2 className="text-4xl text-[#666876] font-bold mt-4">{statusContent?.title}</h2>
      <p className="text-[#666876] text-center text-xl mt-2 max-w-4xl">{statusContent?.description}</p>
      <button
        onClick={() => window.location.href = "/category"}
        className="mt-6 px-4 py-2 bg-[#4DA14D] text-white rounded-lg hover:bg-[#8CCC8C]"
      >
        Back to Home
      </button>
    </div>
  );
};

export default PaymentStatus;
