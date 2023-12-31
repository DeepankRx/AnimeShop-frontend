import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoList from '../components/UI/NoList';
import { ALL_LINKS } from '../constant';
import { getUserOrderHistory } from '../services/APIs';
import PropTypes from 'prop-types';
import Helmet from '../util/Helmet';
import { orderHistoryPageTitle } from '../seoConstant';
import { toast } from 'react-toastify';
const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    getUserOrderHistory()
      .then((res) => {
        setOrderHistory(res.data.orderHistories.order);
      })
      .catch(() => {
        toast.error('Something Went Wrong');
      });
  }, []);

  const Card = ({ details }) => {
    const [showMore, setShowMore] = useState(false);
    return (
      <div className="rounded-lg overflow-hidden border-[1px] border-black w-[100%]">
        <div className="bg-gray-200 px-4 py-2 flex justify-between mdrev:p-2">
          <div className="flex  gap-2 w-full justify-between  ">
            <div>
              <h4 className="font-semibold ">Order Place on</h4>
              <h4 className="text-sm">{new Date(details.dateOfOrder).toLocaleDateString()}</h4>
            </div>
            <div>
              <h4 className="font-semibold ">Order Status</h4>
              <h4 className="text-sm uppercase font-bold">{details.orderStatus}</h4>
            </div>
          </div>

          {/* <div className='flex justify-center items-center text-lg gap-1'>
         <div className={`w-4 h-4  rounded-full`}/>  Status : <span>Delivered</span>
        console.log(item),
        </div> */}
        </div>

        <div className="p-4 mdrev:p-2 flex flex-col gap-4">
          {details.items.map((item, index) => (
            <div className=" flex-col flex gap-4 md:flex-row" key={index}>
              <div className="w-60 h-40 m-auto">
                <img src={item.images[0]} className="w-[100%] h-[100%] object-contain" alt="product" />
              </div>
              <div className="flex gap-4 flex-col flex-1">
                <h4>{item.description}</h4>
                <h4>
                  Total Price : <span className="font-semibold">{item.price}</span>
                </h4>
                <div className="flex gap-4">
                  <Link to={ALL_LINKS.Product.pageLink.substring(0, ALL_LINKS.Product.pageLink.length - 3) + item._id}>
                    <Button size="small" variant="contained">
                      View Product
                    </Button>
                  </Link>
                  {/* <Button size='small' variant='outlined'>Buy Again</Button>
              <Button size='small' variant='contained'>Review</Button> */}
                </div>
              </div>
            </div>
          ))}

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
                  <h2>₹ {details.items.reduce((acc, item) => acc + item.price, 0) > 500 ? 0 : 49}</h2>
                </div>

                <div className="flex justify-between">
                  <h2>Promotion Applied</h2>
                  <h2>₹ 0</h2>
                </div>

                <div className="flex justify-between font-semibold text-base">
                  <h2 className="">Grand Total</h2>
                  <h2>
                    ₹{' '}
                    {details.items.reduce((acc, item) => acc + item.price, 0) > 500
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
    details: PropTypes.object
  };
  return (
    <>
    <Helmet title={orderHistoryPageTitle} />
    <div id="Poppins" className="p-8  flex flex-col gap-4 w-[80%] m-auto mdrev:w-[100%] mdrev:p-4">
      <h2 className="text-5xl mdrev:text-4xl md:p-4" id="Monton">
        Your Orders
      </h2>
      <div className="flex flex-col gap-4 justify-center items-center">
        {orderHistory.length > 0 ? (
          orderHistory.map((item, index) => {
            return <Card key={index} details={item} />;
          })
        ) : (
          <NoList message="You have not bought anything yet Senpai !" />
        )}
      </div>
    </div>
    </>
  );
};

export default OrderHistory;
