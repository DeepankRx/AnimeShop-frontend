import React, { useEffect, useState } from 'react';
import { getAllOrdersOfAllUsers, changeOrderStatus } from '../services/APIs';
import { Button } from '@mui/material';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrdersOfAllUsers()
      .then((res) => {
        setOrders(res.data.allOrders);
      })
      .catch(() => {
        toast.error('Something Went Wrong');
      });
  }, []);
  const handleChangeOrderStatus = (id, orderStatus) => {
    if (!orderStatus) {
      toast.error('Please select order status');
      return;
    }

    changeOrderStatus(id, orderStatus)
      .then(() => {
        toast.success('Order status changed successfully');
      })
      .catch((err) => {
        toast.error('Something Went Wrong');
        toast.error(err.response.data.message);
      });
  };

  const Card = ({ details }) => {
    const [orderStatus, setOrderStatus] = useState('');
    const [showMore, setShowMore] = useState(false);
    return (
      <div className="rounded-lg overflow-hidden border-[1px] border-black md:max-w-5xl">
        <div className="bg-gray-200 px-4 py-2 flex justify-between mdrev:p-2">
          <div className="flex  gap-2 w-full justify-between  ">
            <div>
              <h4 className="font-semibold ">Order Place on</h4>
              <h4 className="text-sm">{new Date(details.dateOfOrder).toLocaleDateString()}</h4>
            </div>
            <div>
              <h4 className="font-semibold ">Order Status</h4>
              <h4 className="text-sm">{details.orderStatus}</h4>
            </div>
          </div>
        </div>
        <div className="p-4 mdrev:p-2 flex flex-col gap-4">
          {details.items.map((item, index) => (
            <div className=" flex-col flex gap-4 md:flex-row" key={index}>
              <div className="w-60 h-40 m-auto">
                <img src={item.images[0]} className="w-[100%] h-[100%] object-contain" alt={item.name} />
              </div>
              <div className="flex gap-4 flex-col">
                <h4>{item.description}</h4>
                <h4>
                  Total Price : <span className="font-semibold">{item.price}</span>
                </h4>
                <div className="flex gap-4">
                  <Button size="small" variant="contained">
                    View Product
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center gap-6">
            <select
              className="border-[1px] border-black rounded-md p-1"
              value={orderStatus ? orderStatus : details.orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="">Change Order Status</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="returned">Returned</option>
            </select>
            <Button variant="contained" onClick={() => handleChangeOrderStatus(details._id, orderStatus)}>
              Change Status
            </Button>
          </div>
          <div onClick={() => setShowMore(!showMore)} className="flex justify-end gap-2">
            <h4>{showMore ? 'Hide Details' : 'Show Details'}</h4>
            <FontAwesomeIcon className="w-6 h-6 rounded-full cursor-pointer bg-gray-200" icon={showMore ? faCaretUp : faCaretDown} />
          </div>
          {showMore && (
            <div className="flex justify-between mdrev:flex-col">
              <div className="text-sm">
                <h2 className="font-semibold text-base">Shipping Address</h2>
                <h2 className="font-semibold">{details.address.customerName}</h2>
                <h2>{details.address.addressLine1}</h2>
                <h2>{details.address.addressLine2}</h2>
                <h2>{details.address.landmark}</h2>
                <h2>
                  {details.address.pinCode} {details.address.city} {details.address.state}
                </h2>
              </div>

              <div>
                <h2 className="font-semibold text-base">Payment Methods</h2>
                <h2>{details.paymentType}</h2>
              </div>

              <div className="text-sm w-60">
                <h2 className="font-semibold text-base">Order Summary</h2>
                <div className="flex justify-between">
                  <h2>Item(s) Subtotal</h2>
                  <h2>₹ {details.items.reduce((acc, item) => acc + item.price, 0)}</h2>
                </div>

                <div className="flex justify-between">
                  <h2>Shipping</h2>
                  <h2>₹ {details.items.reduce((acc, item) => acc + item.price, 0) > 499 ? 0 : 49}</h2>
                </div>

                <div className="flex justify-between">
                  <h2>Promotion Applied</h2>
                  <h2>₹ 0</h2>
                </div>

                <div className="flex justify-between font-semibold text-base">
                  <h2 className="">Grand Total</h2>
                  <h2>
                    ₹{' '}
                    {details.items.reduce((acc, item) => acc + item.price, 0) > 499
                      ? details.items.reduce((acc, item) => acc + item.price, 0)
                      : details.items.reduce((acc, item) => acc + item.price, 0) + 49}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  Card.propTypes = {
    details: PropTypes.object.isRequired
  };

  return (
    <div className="flex flex-col  bg-white w-[100%] rounded-2xl p-4 smrev:p-2 ">
      <div className="overflow-y-auto ">
        <h2 className="text-5xl mdrev:text-4xl md:p-4 md:gap-10" id="Monton">
          Your Orders
        </h2>

        {orders.length > 0 ? (
          orders.map((item, index) => {
            return <Card key={index} details={item} />;
          })
        ) : (
          <h2 className="text-2xl">No Orders Found</h2>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
