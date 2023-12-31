import { faAdd, faHeart, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popover, Rating } from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

import * as React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { ALL_LINKS } from '../../constant';
import { addToWishlist, addReview } from '../../services/APIs';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import PropTypes from 'prop-types';
import Helmet from '../../util/Helmet';
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + ' years ago';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months ago';
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days ago';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
};

const averageRating = (reviews) => {
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  return (sum / reviews.length).toPrecision(2);
};

const ProductDetailed = ({ price, name, description, images, brand, sizes, reviews, productId }) => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderHistoryIds = useSelector((state) => state.user.orderHistory);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    commentTitle: '',
    comment: ''
  });
  const canWriteReview = () => {
    if (authCtx.isLoggedIn) {
      if (orderHistoryIds.includes(productId)) {
        //if user has bought not written review
        if (!reviews.map((review) => review.user._id).includes(authCtx.userid)) {
          return true;
        }
      }
    }
    return false;
  };
  const permissionToWriteReview = canWriteReview();
  const submitReviewHandler = async () => {
    if (authCtx.isLoggedIn) {
      const response = await addReview(productId, review);
      if (response.status === 200) {
        toast.success('Review added successfully');
        setReview({
          rating: 0,
          commentTitle: '',
          comment: ''
        });
        setReviewSubmitted(true);
        window.location.reload();
      } else {
        toast.error('Something went wrong');
      }
    } else {
      navigate(ALL_LINKS.LoginPage.pageLink + '?redirect=-1');
    }
  };
  useEffect(() => {}, [reviewSubmitted]);
  const Review = ({ review }) => {
    return (
      <div className="w-[100%] border-[1px] border-gray-400 p-2 flex flex-col gap-2">
        <div className="space-x-2">
          <span className="bg-black text-white p-1 text-sm w-[50px]">
            {review.rating} <StarIcon fontSize="small" sx={{ color: 'gold' }} />
          </span>
          <span className="text-black font-bold">{review.user.firstName + ' ' + review.user.lastName}</span>
        </div>
        <div className="text-sm">{review.comment}</div>
        {/* <div className="text-xs"></div> */}
        <div className="text-xs">{timeAgo(new Date(review.date))}</div>
      </div>
    );
  };

  const [currentImage, SetCurrentImage] = useState(images[0]);

  const onImageTabButtonHandler = (item) => {
    SetCurrentImage(item);
  };

  useEffect(() => {
    window.scroll(0, 0);
    SetCurrentImage(images[0]);
  }, [images]);

  const PopoverCard = ({ item }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');

    const decreaseHandler = () => {
      if (quantity === 1) return;
      setQuantity(quantity - 1);
    };

    const increaseHandler = () => {
      setQuantity(quantity + 1);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const addToCartHandler = (item, amount, size) => {
      if (authCtx.isLoggedIn) {
        dispatch(cartActions.addItemToCart({ item: { ...item, amount, size } }));
        setQuantity(1);
        setSelectedSize('');
      } else {
        navigate(ALL_LINKS.LoginPage.pageLink + '?redirect=-1');
      }
    };

    return (
      <div>
        {authCtx.role !== 'seller' && (
          <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
            Select Size
          </Button>
        )}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}>
          <div className="w-[320px] p-4 rounded-lg flex flex-col gap-4">
            <div className="flex  flex-wrap ">
              {sizes.map((item, index) => {
                return (
                  <div key={index}>
                    {item.countInStock > 0 && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setSelectedSize(item)}
                        sx={{
                          color: `${selectedSize === item ? '' : 'gray'}`,
                          border: `${selectedSize === item ? '' : 'gray'}`,
                          height: 40
                        }}
                        disableElevation>
                        {item.size}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
            {(selectedSize || quantity > 1) && (
              <div
                className="text-xs text-blue-500 cursor-pointer flex items-center"
                onClick={() => {
                  setQuantity(1);
                  setSelectedSize('');
                }}>
                <RestartAltIcon color="primary" size="small" />
                <span>Clear</span>
              </div>
            )}
            <div className="flex p-2 items-center gap-1 justify-between">
              <FontAwesomeIcon
                onClick={() => decreaseHandler()}
                className="hover:bg-blue-100  rounded-full p-2 cursor-pointer "
                icon={faMinus}
                color="black"
                size="lg"
              />
              <div className=" border-black border-[1px] p-2 text-xl rounded-lg text-black font-bold">{quantity}</div>
              <FontAwesomeIcon
                onClick={() => increaseHandler()}
                className="hover:bg-blue-100  rounded-full p-2 cursor-pointer "
                icon={faAdd}
                color="black"
                size="lg"
              />
              <Button
                variant="contained"
                color="primary"
                disabled={!selectedSize}
                onClick={() => {
                  addToCartHandler(
                    {
                      price: item.price,
                      name: item.name,
                      description: item.description,
                      images: item.images,
                      brand: item.brand,
                      _id: item.productId
                    },
                    quantity,
                    selectedSize.size
                  );
                }}>
                Add to Cart
              </Button>
            </div>
          </div>
        </Popover>
      </div>
    );
  };

  const addToWishlistHandler = (productId) => {
    addToWishlist(productId)
      .then((res) => {
        res.data.message === 'Product added to wishlist' ? toast.success(res.data.message) : toast.error(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Helmet title={`Buy ${name} | Animart`} description={description} keywords={`${name} merchandise`} />

      <div className={`relative flex flex-col bg-gradient-to-tl from-[#FCEE21] to-[#009245] pb-20 `}>
        <div className={`flex justify-center p-8  lgrev:flex-col gap-8 lgrev:gap-4 lgrev:p-4`}>
          <div className="flex flex-col w-[800px]  gap-4 lgrev:w-[100%] bg-white p-4 rounded-lg relative">
            <div className=" w-[100%] h-[400px]   lgrev:h-auto overflow-hidden ">
              <img id="productImage" alt={currentImage + 'Image'} src={currentImage} className="object-contain w-[100%] h-[100%]" />
              {authCtx.role !== 'seller' && (
                <div
                  onClick={() => {
                    authCtx.isLoggedIn ? addToWishlistHandler(productId) : navigate(`${ALL_LINKS.LoginPage.pageLink}?redirect=-1`);
                  }}
                  className="absolute top-2 right-2">
                  <FontAwesomeIcon className="p-2 bg-gray-200 rounded-full text-red-500 hover:opacity-80 cursor-pointer" size="xl" icon={faHeart} />
                </div>
              )}
            </div>
            <div className=" my-2 flex space-x-4 ">
              {images.map((element, i) => (
                <div key={i} className="w-[100px] h-[60px]  cursor-pointer shadow-lg ">
                  <img
                    className="object-contain w-[100%] h-[100%]"
                    alt={i + 'Image'}
                    key={i}
                    onClick={() => onImageTabButtonHandler(element)}
                    src={element}></img>
                </div>
              ))}
            </div>
            <div className="flex  items-center gap-2">
              <span
                className="w-8 h-8 rounded-full
            flex items-center justify-center bg-blue-500 text-white font-bold">
                {brand.charAt(0).toUpperCase()}
              </span>
              <span className="text-blue-500">{brand}</span>
            </div>
            {/* <h2 className="text-black font-bold text-lg">SHIPPING</h2>
          <p>
            Currently we are not Shipping anything as as our site is in
            development mode , you could visit our store and purchase our
            products , Thank you.
          </p> */}

            <h2 className="text-black font-bold text-lg">REFUND</h2>
            <p>
              We hope you will be pleased with your purchase. Should you wish to return anything bought from us, we will be happy to refund or exchange a
              product provided it is in a fully resalable condition .Return should be made within a resalable time (7 days) and in original , undamaged
              packaging .
            </p>
          </div>

          <div className="flex flex-col  w-[800px] gap-4 lgrev:w-[100%]  h-[100%] text-gray-800 bg-white p-4 rounded-xl">
            <h2 className="text-4xl font-bold text-black">{name}</h2>
            <div className="space-x-4 flex">
              <div className="space-x-1">
                <Rating
                  name="text-feedback"
                  value={averageRating(reviews)}
                  readOnly
                  precision={0.5}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
              </div>
              <h2 className="font-thin">
                {!isNaN(averageRating(reviews)) && averageRating(reviews)} ({reviews.length} Reviews)
              </h2>
            </div>
            <h2 className="text-4xl">₹ {price}</h2>
            <h2 className="text-2xl font-bold text-black">Product Description</h2>
            {description.map((element, i) => {
              return <h2 key={i}>{element}</h2>;
            })}
            <h2 className="text-lg text-black font-bold">Sizes Available</h2>
            <div className="flex space-x-2">
              {sizes.map((element, i) => {
                return (
                  <div
                    key={i}
                    className={`bg-gray-100'
                  flex items-center justify-center w-10 h-10 rounded-full  border-[1px] ${
                    element.countInStock <= 0 ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'
                  }`}>
                    {element.size}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <h2>Confused about your size ? Check our</h2>
              <a href={ALL_LINKS.SizingGuide.pageLink} target="_blank" className="text-blue-600" rel="noreferrer">
                Size Chart
              </a>
            </div>
            {/* Rate Product */}
            {permissionToWriteReview && (
              <div className="space-y-2 border-t-2 border-black">
                <h3 className="text-xl font-semibold">Rate Product.</h3>
                <Rating
                  name="size-large"
                  defaultValue={1}
                  size="large"
                  onChange={(e) => {
                    setReview({
                      ...review,
                      rating: e.target.value
                    });
                  }}
                />
                <h3 className="text-xl font-semibold">Write a Review.</h3>
                <textarea
                  placeholder="Amazing Purchase."
                  className="bg-blue-50 ring-2 ring-blue-500 rounded-md w-[100%] resize-none h-60 p-2"
                  type="text"
                  onChange={(e) => {
                    setReview({
                      ...review,
                      comment: e.target.value
                    });
                  }}
                />

                <div className="flex justify-end">
                  <Button variant="contained" onClick={submitReviewHandler}>
                    Submit
                  </Button>
                </div>
              </div>
            )}
            {reviews && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Rating and Reviews</h3>
                <div className="flex items-center space-x-2">
                  <h2 className="text-3xl font-bold">{!isNaN(averageRating(reviews)) ? averageRating(reviews) : 0}</h2>
                  <Rating
                    name="text-feedback"
                    value={averageRating(reviews)}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                </div>

                {/* <div >
            <div className='flex'><h3 className='mr-2 text-lg font-semibold'>(100)</h3><Star/><Star/><Star/><Star/><Star/></div>
            <div className='flex'><h3 className='mr-2 text-lg font-semibold'>(100)</h3><Star/><Star/><Star/><Star/></div>
            <div className='flex'><h3 className='mr-2 text-lg font-semibold'>(100)</h3><Star/><Star/><Star/></div>
            <div className='flex'><h3 className='mr-2 text-lg font-semibold'>(100)</h3><Star/><Star/></div>
            <div className='flex'><h3 className='mr-2 text-lg font-semibold'>(100)</h3><Star/></div>
          </div> */}

                {/* <Box width={300}>
              <Rating name="text-feedback" value={5} readOnly precision={0.5} emptyIcon={<StarIcon  style={{ opacity: 0.55 }} fontSize="inherit" />} />
              </Box> */}
                <div className="flex flex-col space-y-2">
                  {reviews.map((element, i) => {
                    return <Review key={i} review={element} />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky  bottom-20 w-[100%] flex justify-center  ">
          <div className="w-[60%] shadow-xl p-4 bg-white flex justify-between items-center mdrev:w-[95%] rounded-lg">
            <div className="flex gap-4 items-center ">
              <img className="w-[80px]" src={images[0]} alt={name} />
              <h2>₹ {price}</h2>
              <h2 className="smrev:hidden">{name}</h2>
            </div>
            <div className="flex items-center gap-2"></div>
            <PopoverCard item={{ price, name, description, images, brand, reviews, productId: productId }} />
          </div>
        </div>
      </div>
    </>
  );
};

ProductDetailed.propTypes = {
  product: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  brand: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  sizes: PropTypes.array.isRequired,
  permissionToWriteReview: PropTypes.bool.isRequired,
  review: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default ProductDetailed;
