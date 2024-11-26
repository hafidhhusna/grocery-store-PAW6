import React from "react";
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import PaymentStatus from '@/components/ui/PaymentStatus';

const PaymentPage: React.FC = () => {
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
          {/* Wrapper dengan border kuning */}
          <div className="flex flex-col w-full h-full bg-white border-2 border-yellow-400 rounded-xl p-6 shadow-lg">
            <PaymentStatus status="pending" />
            {/* Bisa mengganti status menjadi "failed" atau "success" */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
