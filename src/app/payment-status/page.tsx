"use client"

import React from "react";
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import PaymentStatus from '@/components/ui/PaymentStatus';
import { useSearchParams } from "next/navigation";

const PaymentPage: React.FC = () => {
  // Retrieve the `status` parameter from the URL
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "pending"; // Default to "pending" if no status is provided

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Section */}
      <div className="flex flex-1 h-screen bg-gray-100 overflow-hidden">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          {/* Wrapper with yellow border */}
          <div className="flex flex-col w-full h-full bg-white border-2 border-yellow-400 rounded-xl p-6 shadow-lg">
            {/* Pass the retrieved status to the PaymentStatus component */}
            <PaymentStatus status={status} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
