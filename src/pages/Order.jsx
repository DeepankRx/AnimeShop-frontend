import React, { useEffect } from 'react';
import { getUserOrders } from '../services/APIs';
const Order = () => {
  useEffect(() => {
    getUserOrders()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>Order</div>;
};

export default Order;
