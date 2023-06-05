import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  createOrder
  //   BASE_MAIN_URL,
  //   razorpayCreateOrder
  // capturePayment
} from '../services/APIs';
import Gap from '../components/UI/Gap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { cartActions } from '../store/cartSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_LINKS } from '../constant';
import PropTypes from 'prop-types';
import Helmet from '../util/Helmet';
import { checkoutPageTitle } from '../seoConstant';
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [paymentChecked, setPaymentChecked] = useState(1);
  const [addressChecked, setAddressChecked] = useState(0);
  const [loading, setLoading] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // const createRazorpayOrder = async () => {
  //   if (!user.address) {
  //     toast.warn('Select an address');
  //     return;
  //   }
  //   const data = {
  //     user: user.id,
  //     order: {
  //       address: user.address.address[addressChecked],
  //       paymentType: 'ONLINE',
  //       paymentStatus: 'pending',
  //       orderStatus: 'pending',
  //       items: items,
  //       totalAmount:
  //         items.reduce((acc, item) => acc + item.amount * item.price, 0) > 500
  //           ? items.reduce((acc, item) => acc + item.amount * item.price, 0)
  //           : items.reduce((acc, item) => acc + item.amount * item.price, 0) + 49
  //     }
  //   };
  //   try {
  //     setLoading(true);
  //     const response = await razorpayCreateOrder({
  //       user,
  //       order: data.order
  //     });
  //     if (response.data.status == 'success') {
  //       const options = {
  //         key: 'rzp_test_5OlxwMLgAS3BGQ', // Enter the Key ID generated from the Dashboard
  //         amount: data.order.totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //         currency: 'INR',
  //         name: 'Animart',
  //         description: 'Test Transaction',
  //         image:
  //           'https://zeroxsoftwares.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.7b69e523.png&w=640&q=75',
  //         method: {
  //           netbanking: true,
  //           card: true,
  //           wallet: true,
  //           upi: true
  //         },
  //         order_id: response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //         callback_url: `${BASE_MAIN_URL}/api/payment/capture-payment`,
  //         prefill: {
  //           name: user.address.address[addressChecked].customerName,
  //           // "email": "gaurav.kumar@example.com",
  //           contact: user.address.address[addressChecked].mobileNo
  //         },
  //         notes: {
  //           address: 'Animart Dehradun'
  //         },
  //         theme: {
  //           color: '#3399cc'
  //         }
  //       };
  //       setLoading(false);
  //       const razor = new window.Razorpay(options);
  //       razor.open();
  //     }
  //   } catch (e) {
  //     alert(e.message);
  //   }
  // };

  const handleOnlineOrder = async () => {
    try {
      if (!user.address) {
        toast.warn('Select an address');
        return;
      }
      dispatch(cartActions.replaceCart({ items: [], totalAmount: 0, changed: !user.changed }));
      const order = {
        user: user.id,
        order: {
          address: user.address.address[addressChecked],
          paymentType: paymentChecked === 1 ? 'ONLINE' : 'COD',
          paymentStatus: 'pending',
          orderStatus: 'pending',
          items: items,
          totalAmount:
            items.reduce((acc, item) => acc + item.amount * item.price, 0) > 500
              ? items.reduce((acc, item) => acc + item.amount * item.price, 0)
              : items.reduce((acc, item) => acc + item.amount * item.price, 0) + 49
        }
      };
        setLoading(true);
      await createOrder(order);
      toast.success('Order placed!');
      toast.success('A payment link will be send to you on your registered phone number');
    } catch (e) {
      toast(e.message);
    }
    finally{
        setLoading(false);
        }
  };

  const handleCreateOrder = async () => {
    try {
      if (!user.address) {
        toast.warn('Select an address');
        return;
      }
      dispatch(cartActions.replaceCart({ items: [], totalAmount: 0, changed: !user.changed }));
      const order = {
        user: user.id,
        order: {
          address: user.address.address[addressChecked],
          paymentType: paymentChecked === 1 ? 'ONLINE' : 'COD',
          paymentStatus: 'pending',
          orderStatus: 'pending',
          items: items,
          totalAmount:
            items.reduce((acc, item) => acc + item.amount * item.price, 0) > 500
              ? items.reduce((acc, item) => acc + item.amount * item.price, 0)
              : items.reduce((acc, item) => acc + item.amount * item.price, 0) + 49
        }
      };
      setLoading(true);
      await createOrder(order);
      toast.success('Order placed!');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const Address = ({ name, address }) => {
    return (
      <div className="flex items-center gap-4 shadow-lg rounded-xl p-2 bg-white cursor-pointer hover:opacity-75" onClick={() => setAddressChecked(name)}>
        <input checked={addressChecked === name ? true : false} name={name} className="w-6 h-6 ring-0 rounded" type="radio" />
        <div>
          <h3 className="text-xl font-semibold">{address.customerName}</h3>
          <p>
            {address.addressLine1} {address.addressLine2} {address.landmark} {address.pincode}
          </p>
          <p className="font-semibold">
            {address.city} , {address.state} , India
          </p>
          <p className="font-semibold">{address.mobileNo}</p>
        </div>
      </div>
    );
  };

  Address.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired
  };

  const cartRemoveHandler = (_id, size, amount) => {
    dispatch(cartActions.removeItemFromCart({ _id, size, amount }));
  };

  const addToCartHandler = (item, amount, size) => {
    dispatch(cartActions.addItemToCart({ item: { ...item, amount, size } }));
  };

  useEffect(() => {
    if (items.length == 0) navigate(ALL_LINKS.Category.pageLink);
  }, [items]);

  return (
    <>

    <Helmet title={checkoutPageTitle} />
    <div className="gap-4 flex flex-col">
      <h2 id="Monton" className="text-4xl p-4">
        CHECKOUT DETAILS
      </h2>
      <div className="p-4 grid grid-cols-3  bg-primary rounded-xl gap-4 mdrev:grid-cols-1 md:m-2">
        <div className="h-[calc(100vh_-_210px)]  col-span-1 flex flex-col bg-slate-100 py-4 pl-4 rounded-xl  gap-4 ">
          <div className="overflow-scroll pr-4">
            <Gap>Shipping Address</Gap>
            <form className="flex flex-col gap-4">
              {user?.address?.address.map((item, i) => {
                return <Address name={i} address={item} key={i} />;
              })}
            </form>
            <div className="flex">
              <Link to={`${ALL_LINKS.UserProfile.pageLink}?redirect=-1`}>
                <Button variant="contained">Add Other Address</Button>
              </Link>
            </div>

            <Gap>Billing Address</Gap>
            <div
              className="flex  gap-4 items-center
            ">
              <input name="shipping" checked={true} className="w-5 h-5 ring-0 rounded" type="radio" />
              <label htmlFor="shipping" className="text-lg font-bold">
                Same as Shipping Address
              </label>
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh_-_210px)] overflow-scroll px-4 py-4  flex flex-col gap-4 bg-slate-100 rounded-xl  lgrev:p-4">
          <Gap>Shipping Method</Gap>
          <div className="flex items-center justify-between">
            <div className="flex  gap-4 items-center">
              <input name="delivery" checked={true} className="w-5 h-5 ring-0 rounded" type="radio" />
              <label htmlFor="delivery" className="text-lg font-bold">
                Regular (4-6 Days)
              </label>
            </div>
            <h2>{items.reduce((acc, item) => acc + item.amount * item.price, 0) > 500 ? 'FREE' : '₹ 49'}</h2>
          </div>

          <Gap>Payment Method</Gap>
          <div className="flex flex-col gap-4">
            <div className="flex  gap-4 items-center">
              <input
                name="payment1"
                onClick={() => setPaymentChecked(1)}
                checked={paymentChecked === 1 ? true : false}
                className="w-5 h-5 ring-0 rounded"
                type="radio"
              />
              <label htmlFor="payment1" className="text-lg font-bold">
                Online
              </label>
            </div>
            <div className="flex  gap-4 items-center">
              <input
                name="payment2"
                onClick={() => setPaymentChecked(2)}
                checked={paymentChecked === 2 ? true : false}
                className="w-5 h-5 ring-0 rounded"
                type="radio"
              />
              <label htmlFor="payment2" className="text-lg font-bold">
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh_-_210px)]  pl-4 py-4  flex flex-col gap-4 bg-slate-100 rounded-xl  lgrev:p- lgrev:pr-0">
          <div className="overflow-scroll pr-4">
            <Gap>Review Order</Gap>
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div className="bg-white  rounded-lg divide-y-[1px] divide-black" key={i}>
                  <div key={i} className=" flex justify-between items-center relative py-2 px-4">
                    <div className="space-y-2 w-32">
                      <img className="" src={item.images[0]} alt={item.name} />
                      <h2 className="text-lg font-bold">
                        {item.name} <span className="text-green-500">{item.size}</span>
                      </h2>
                    </div>
                    <div className="flex items-center gap-3 mr-4">
                      <FontAwesomeIcon
                        icon={faCaretLeft}
                        size="sm"
                        onClick={() => cartRemoveHandler(item._id, item.size, 1)}
                        className="cursor-pointer w-5 h-5 bg-gray-200 rounded-full"
                      />
                      <h2 className="">{item.amount}</h2>
                      <FontAwesomeIcon
                        icon={faCaretRight}
                        size="sm"
                        className="cursor-pointer w-5 h-5 bg-gray-200 rounded-full"
                        onClick={() =>
                          addToCartHandler(
                            {
                              price: item.price,
                              name: item.name,
                              description: item.description,
                              images: item.images,
                              brand: item.brand,
                              _id: item._id
                            },
                            1,
                            item.size
                          )
                        }
                      />
                    </div>
                    <h2 className="">₹ {item.price}</h2>
                    <div className="absolute bottom-0 right-1">
                      <FontAwesomeIcon
                        onClick={() => cartRemoveHandler(item._id, item.size, item.amount)}
                        icon={faTrash}
                        color="red"
                        size="sm"
                        className="cursor-pointer mdrev:self-end hover:opacity-50 bg-gray-200 p-2 rounded-full "
                      />
                    </div>
                  </div>
                  <div className="flex justify-between p-2">
                    <h2>Shipping</h2>
                    <h2>{+item.price * +item.amount > 500 ? 'FREE' : '₹ 49'}</h2>
                    <h2>SubTotal</h2>
                    <h2>{+item.price * +item.amount > 500 ? +item.price * +item.amount : +item.price * +item.amount + 49}</h2>
                  </div>
                </div>
              ))}
              <Button
                variant="contained"
                className="bg-black text-white"
                onClick={() => (paymentChecked === 1 ? handleOnlineOrder() : handleCreateOrder())}
                disabled={items.length === 0 ? true : false}>
                {paymentChecked === 1 ? (loading ? 'Loading...' : 'Pay Now') : loading ? 'Loading...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
