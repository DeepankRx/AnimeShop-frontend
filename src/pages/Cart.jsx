import { faCaretLeft, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { getProductByCategoryWithHighestRating } from '../services/APIs';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import NoList from '../components/UI/NoList';
import { cartActions } from '../store/cartSlice';
import { ALL_LINKS } from '../constant';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from '../util/Helmet';
import {toast} from 'react-toastify';
import { cartPageTitle,cartPageDescription } from '../seoConstant';
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    getProductByCategoryWithHighestRating(3, items[0]?._id)
      .then((res) => {
        setSimilarProducts(res.data.data);
      })
      .catch(() => {
        toast.error('Something Went Wrong');
      });
  }, [items]);
  const ProductDetailLink = ALL_LINKS.Product.pageLink.substring(0, ALL_LINKS.Product.pageLink.length - 3);
  const Card = ({ product }) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={product.images[0]} className="w-16 h-16" alt="product" />
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <h2 className="text-sm font-semibold">₹ {product.price}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link className="bg-white" to={`${ProductDetailLink}${product._id}`}>
              <Button variant="contained" color="primary" className="text-sm font-semibold">
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  Card.propTypes = {
    product: PropTypes.object.isRequired
  };
  const cartRemoveHandler = (_id, size, amount) => {
    dispatch(cartActions.removeItemFromCart({ _id, size, amount }));
  };

  const addToCartHandler = (item, amount, size) => {
    dispatch(cartActions.addItemToCart({ item: { ...item, amount, size } }));
  };

  const Product = ({ product }) => {
    return (
      <div className="flex items-center justify-between gap-4 mdrev:flex-col  mdrev:items-start shadow-lg p-8 mdrev:p-4 rounded-lg">
        <div className="flex  gap-2 items-center mdrev:w-[100%] ">
          <div className="w-[100px] mdrev:w-[50%]">
            <img src={product.images[0]}

              alt="product"
            />{' '}
          </div>
        </div>
        <div className="flex-1 mdrev:w-[100%] grid grid-cols-4">
          <h2 className="text-xl font-bold col-span-2 mdrev:col-span-4">{product.name}</h2>
          <h2 className="text-xl font-bold col-span-1 mdrev:col-span-2">₹ {product.price}</h2>
          <h2 className="text-xl font-bold col-span-1 mdrev:col-span-2">{product.size}</h2>
        </div>
        <div className="flex items-center gap-3 mr-4">
          <FontAwesomeIcon
            icon={faCaretLeft}
            size="sm"
            onClick={() => cartRemoveHandler(product._id, product.size, 1)}
            className="cursor-pointer w-8 h-8 bg-gray-200 rounded-full"
          />
          <h2 className="text-xl font-bold">{product.amount}</h2>
          <FontAwesomeIcon
            icon={faCaretRight}
            size="sm"
            className="cursor-pointer w-8 h-8 bg-gray-200 rounded-full"
            onClick={() =>
              addToCartHandler(
                {
                  price: product.price,
                  name: product.name,
                  description: product.description,
                  images: product.images,
                  brand: product.brand,
                  _id: product._id
                },
                1,
                product.size
              )
            }
          />
        </div>
        <FontAwesomeIcon
          onClick={() => cartRemoveHandler(product._id, product.size, product.amount)}
          icon={faTrash}
          color="red"
          size="xl"
          className="cursor-pointer mdrev:self-end hover:opacity-50 bg-gray-200 p-2 rounded-full "
        />
      </div>
    );
  };
  Product.propTypes = {
    product: PropTypes.object.isRequired
  };

  return (
    <>
      <Helmet title={cartPageTitle} description={cartPageDescription} />
    <div className="">
      <div id="Poppins" className="p-8  flex flex-col gap-8 w-[80%] m-auto mdrev:w-[100%]">
        <h2 className="text-5xl mdrev:text-4xl" id="Monton">
          <span className="border-b-4 border-black ">MY CART ({items.length})</span>
        </h2>

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <Product key={i} product={item} />
          ))}
          {items.length === 0 && <NoList message="No Products Found Senpai , Let's Add Together ?" />}
        </div>
      </div>
      <div className="bg-light">
        <div id="Poppins" className="p-8  gap-8 w-[80%] m-auto mdrev:w-[100%]  grid grid-cols-3 ">
          <div className="flex flex-col gap-4 col-span-2 lgrev:col-span-3">
            {/* <h2 className='text-lg font-semibold'>Special Message for Seller</h2>
        <textarea className='w-[60%]  rounded-xl h-[240px] lgrev:w-[100%]' rows='0' /> */}
            {similarProducts.map((item, i) => (
              <Card key={i} product={item} />
            ))}
          </div>
          <div className="col-span-1 flex flex-col gap-4  lgrev:col-span-3 ">
            <div className="bg-white rounded-xl p-4 py-6">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">SUBTOTAL</h2>
                <h2 className="text-lg font-semibold">₹ {totalAmount}</h2>
              </div>

              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">SHIPPING</h2>
                <h2 className="text-lg font-semibold">₹ {totalAmount === 0 ? 0 : 49}</h2>
              </div>

              <div className="flex justify-between">
                <h2 className="text-lg font-semibold">TOTAL</h2>
                <h2 className="text-lg font-semibold">₹ {totalAmount === 0 ? 0 : totalAmount + 49}</h2>
              </div>
            </div>

            {/* <div className='bg-white rounded-xl p-4 gap-2 flex flex-col'>
    <h2 className='text-sm'>Accepted Payments Methods</h2>
    <div>
    <FontAwesomeIcon className='px-4 bg-gray-200 py-2 rounded-lg' icon={faPaypal}/>
    </div>
    </div> */}

            <div className="bg-white rounded-xl p-4 gap-2 flex flex-col">
              <Button
                onClick={() => navigate(ALL_LINKS.Checkout.pageLink)}
                className="w-[100%]"
                sx={{ backgroundColor: 'orange' }}
                variant="contained"
                disabled={items.length === 0}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;
