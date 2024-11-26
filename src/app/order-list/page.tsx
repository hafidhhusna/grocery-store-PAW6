"use client";
import React from "react";
import Header from "@/components/ui/Header";
import AdminSideBar from "@/components/ui/AdminSideBar";
import AllOrders from "@/components/ui/AllOrders";
import "@/components/ui/OrderItem.css";

interface Order {
  orderNo: string;
  date: string;
  totalOrder: string;
  status: string;
  viewDetailsLink: string;
}

const orders: Order[] = [
  {
    orderNo: "ORDER101000",
    date: "01/01/2024",
    totalOrder: "Rp 0,00 /pcs",
    status: "On Progress",
    viewDetailsLink: "#",
  },
  {
    orderNo: "ORDER100000",
    date: "01/01/2024",
    totalOrder: "Rp 0,00 /pcs",
    status: "Done",
    viewDetailsLink: "#",
  },
  {
    orderNo: "ORDER099000",
    date: "01/01/2024",
    totalOrder: "Rp 0,00 /pcs",
    status: "Done",
    viewDetailsLink: "#",
  },
];

const Page: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="flex flex-1">
        {/* SideBar Section */}
        <AdminSideBar />

        {/* Main Content Section */}
        <div className="flex-1 p-8">
          <div className="order-list-container">
            <h2 className="order-title text-2xl font-bold text-gray-700 mb-4">
              Your Order
            </h2>
            <div className="order-list-header flex justify-between bg-yellow-300 py-3 px-4 rounded-lg mb-4 text-gray-700 font-semibold">
              <span className="header-order-no text-center" style={{ flexBasis: "30%" }}>
                Order No
              </span>
              <span className="header-date text-center" style={{ flexBasis: "23%" }}>Date</span>
              <span className="header-total-order text-center" style={{ flexBasis: "24%" }}>
                Total Order
              </span>
              <span className="header-status text-center" style={{ flexBasis: "23%" }}>Status</span>
            </div>
            {/* Render Order Items */}
            {orders.map((order, index) => (
              <AllOrders key={index} {...order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
