import React from 'react';

interface OrderItemProps {
  orderNo: string;
  date: string;
  totalOrder: string;
  status: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderNo, date, totalOrder, status }) => {
  return (
    <div className="order-item">
      <span className="order-no">{orderNo}</span>
      <span className="date">{date}</span>
      <span className="total-order">{totalOrder}</span>
      <span className={`status ${status === 'On Progress' ? 'status-progress' : 'status-done'}`}>
        {status}
      </span>
    </div>
  );
};

export default OrderItem;
