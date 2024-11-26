"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import OrderItem from '@/components/ui/OrderItem';
import '@/components/ui/OrderItem.css';
import { SessionProvider, useSession } from "next-auth/react";

interface Order {
  orderNo: string;
  date: string; // We use createdAt for the order date
  totalOrder: number;
  status: string;
}

function Page()  {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (status === "loading") return; // Wait until session is loaded
      if (!session?.user?.id) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/user/${session.user.id}/order`); // Replace `{userId}` with actual user ID
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch orders");
        }

        // Transform the order data
        const ordersData = data.map((order: any) => ({
          orderNo: order.orderNo,
          date: new Date(order.createdAt).toLocaleDateString(), // Convert createdAt to a readable date format
          totalOrder: order.totalPrice,
          status: order.status,
        }));

        setOrders(ordersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, status]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="flex flex-1">
        {/* SideBar Section */}
        <SideBar />

        {/* Main Content Section */}
        <div className="flex-1 p-8">
          <div className="order-list-container">
            <h2 className="order-title">Your Orders</h2>
            {loading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <div className="order-list-header">
                  <span className="header-order-no">Order No</span>
                  <span className="header-date">Date</span>
                  <span className="header-total-order">Total Order</span>
                  <span className="header-status">Status</span>
                </div>
                {orders.map((order, index) => (
                  <OrderItem key={index} {...order} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App(){
  return (
  <SessionProvider>
      <Page></Page>
  </SessionProvider>
  )
};