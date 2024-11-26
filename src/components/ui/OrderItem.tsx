import React from 'react';

interface OrderItemProps {
  orderNo: string;
  date: string;
  totalOrder: number;
  status: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderNo, date, totalOrder, status }) => {
  return (
    <div className="order-item">
      <span className="order-no">{orderNo}</span>
      <span className="date">{date}</span>
      <span className="total-order">Rp {totalOrder.toLocaleString()}</span>
      <span className={`status ${status === 'processing' ? 'status-progress' : 'status-done'}`}>
        {status}
      </span>
    </div>
  );
};

export default OrderItem;
