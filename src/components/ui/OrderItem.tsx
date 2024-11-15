// src/components/OrderItem.tsx
import React from 'react';

interface OrderItemProps {
  orderNo: string;
  date: string;
  totalOrder: string;
  status: string;
  viewDetailsLink: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderNo, date, totalOrder, status, viewDetailsLink }) => {
  return (
    <div className="order-item">
      <span>{orderNo}</span>
      <span>{date}</span>
      <span>{totalOrder}</span>
      <span className={status === 'On Progress' ? 'status-progress' : 'status-done'}>
        {status}
      </span>
      <a href={viewDetailsLink} className="view-details">View Details</a>
    </div>
  );
};

export default OrderItem;
