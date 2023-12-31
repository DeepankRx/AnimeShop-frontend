import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import NoList from '../components/UI/NoList';
import { getWishlistByUser, removeFromWishlist } from '../services/APIs';
import { toast } from 'react-toastify';
import CardPlaceHolderSkelton from '../components/skeltons/CardPlaceHolderSkelton';
import PropTypes from 'prop-types';
import Helmet from '../util/Helmet';
import { wishlistPageTitle } from '../seoConstant';
const Wishlist = () => {
  const [updated, setUpdated] = useState(true);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getWishlistByUser()
      .then((res) => {
        setProducts(res.data.data.wishlist.products);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Something Went Wrong');
        setLoading(false);
      });
  }, [updated]);
  //how to write node js code?

  const Product = ({ product }) => {
    const removeFromWishHandler = (productId) => {
      removeFromWishlist(productId).then(() => {
        setUpdated(!updated);
        toast.success('Removed from wishlist');
      });
    };

    Product.propTypes = {
      product: PropTypes.object
    };

    return (
      <div className="col-span-1 flex flex-col items-center justify-between gap-4 mdrev:flex-col  mdrev:items-start shadow-lg p-4 rounded-lg relative ">
        <div className="flex  gap-2 items-center mdrev:w-[100%] ">
          <div className="w-[100%] mdrev:w-[50%] h-60 overflow-hidden">
            <img className="object-fit w-[100%] h-[100%]" src={product.images[0]} alt="product" />
          </div>
        </div>
        <div className="w-[100%] ">
          <h2 className="text-xl font-bold col-span-2 mdrev:col-span-4">{product.name}</h2>
          <h2 className="text-xl font-bold col-span-1 mdrev:col-span-2">₹ {product.price}</h2>
          {/* <h2 className='text-xl font-bold col-span-1 mdrev:col-span-2'>{product.size}</h2> */}
        </div>
        <div
          onClick={() => {
            removeFromWishHandler(product._id);
          }}
          className="absolute bottom-2 right-2"
        >
          <FontAwesomeIcon className="p-2 bg-gray-200 rounded-full text-red-500 hover:opacity-80 cursor-pointer" size="xl" icon={faTrash} />
        </div>
      </div>
    );
  };
  return (
    <>
    <Helmet title={wishlistPageTitle} />
    <div id="Poppins" className="p-8  flex flex-col gap-8 w-[80%] m-auto mdrev:w-[100%]">
      <h2 className="text-5xl mdrev:text-4xl" id="Monton">
        <span className="border-b-4 border-black ">MY Wishlist ({products.length})</span>
      </h2>

      <div className="grid grid-cols-3 mdrev:grid-cols-1 gap-4">
        {!loading && products.map((item, i) => <Product key={i} product={item} />)}
        {loading && (
          <>
            <CardPlaceHolderSkelton />
            <CardPlaceHolderSkelton />
            <CardPlaceHolderSkelton />
            <CardPlaceHolderSkelton />
            <CardPlaceHolderSkelton />
            <CardPlaceHolderSkelton />
          </>
        )}
      </div>
      {!loading && products.length === 0 && <NoList message="No Wishlist Products Found Senpai , Let's Add Together ?" />}
    </div>
    </>
  );
};

export default Wishlist;
