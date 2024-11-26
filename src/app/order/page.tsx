// src/components/page.tsx
"use client";
import React from 'react';
import Header from '@/components/ui/Header';
import SideBar from '@/components/ui/SideBar';
import OrderItem from '@/components/ui/OrderItem';
import '@/components/ui/OrderItem.css';

interface Order {
  orderNo: string;
  date: string;
  totalOrder: string;
  status: string;
  viewDetailsLink: string;
}

const orders: Order[] = [
  { orderNo: 'ORDER101000', date: '01/01/2024', totalOrder: 'Rp 0,00 /pcs', status: 'On Progress', viewDetailsLink: '#' },
  { orderNo: 'ORDER100000', date: '01/01/2024', totalOrder: 'Rp 0,00 /pcs', status: 'Done', viewDetailsLink: '#' },
  { orderNo: 'ORDER099000', date: '01/01/2024', totalOrder: 'Rp 0,00 /pcs', status: 'Done', viewDetailsLink: '#' }
];

const Page: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* SideBar Section */}
        <SideBar />

        {/* Main Content Section */}
        <div className="flex-1 p-8">
          <div className="order-list-container">
            <h2 className="order-title">Your Order</h2>
            <div className="order-list-header">
              <span className="header-order-no">Order No</span>
              <span className="header-date">Date</span>
              <span className="header-total-order">Total Order</span>
              <span className="header-status">Status</span>
            </div>
            {orders.map((order, index) => (
              <OrderItem key={index} {...order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;