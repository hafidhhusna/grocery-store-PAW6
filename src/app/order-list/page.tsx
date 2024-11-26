"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import AdminSideBar from "@/components/ui/AdminSideBar";
import AllOrders from "@/components/ui/AllOrders";
import "@/components/ui/OrderItem.css";

interface Order {
  id: string;
  orderNo: string;
  date: string;
  totalOrder: string;
  status: string;
  viewDetailsLink: string;
}

const Page: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/order"); // Replace with your API route
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch orders");
        }

        // Transform the orders data to match the interface
        const ordersData = data.map((order: any) => ({
          id: order.id,
          orderNo: order.orderNo,
          date: new Date(order.createdAt).toLocaleDateString(), // Format date
          totalOrder: `Rp ${order.totalPrice.toLocaleString("id-ID")}`, // Format price
          status: order.status,
          viewDetailsLink: `/orders/${order.id}`, // Link to view order details
        }));

        setOrders(ordersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 ">
      {/* Header Section */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* SideBar Section */}
        <AdminSideBar />

        {/* Main Content Section */}
        <div className="flex-1 p-8">
          <div className="order-list-container">
            <h2 className="order-title text-2xl font-bold text-gray-700 mb-4">
              Your Orders
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
            {loading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              orders.map((order, index) => (
                <AllOrders key={index} {...order} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
