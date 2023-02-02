// const dataToSend={
//   pName:'',
//   pImages:[],
//   pDescription:[],

//   pID:'',
//   pPrice:'',
//   pTags:''

// }

import {useSelector} from 'react-redux'
import {
  faAdd,
  faMinus,
  faStar,
  faStarAndCrescent,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  FormControl,
  MenuItem,
  Popover,
  Rating,
  Select,
  Slider,
} from '@mui/material';
import { Box, color } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { assets } from '../../assets';
import { addToCart } from '../../services/APIs';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
  return sum / reviews.length;
};
const addToCartHandler = (product, quantity, size,user) => {
  addToCart({cart:{product, quantity, selectedSize:size},user:user.id}).then((res) => {
    console.log(res)
  })
.catch((err) => {
  console.log(err)
})

};
const ProductDetailed = ({ price, name, description,images,brand,sizes,reviews ,productId }) => {
  const Review = ({review}) => {
    return (
      <div className="w-[100%] border-[1px] border-gray-400 p-2 flex flex-col gap-2">
        <div className="space-x-2">
          <span className="bg-black text-white p-1 text-sm w-[50px]">
            {review.rating} <StarIcon fontSize="small" sx={{ color: 'gold' }} />
          </span>
          <span className="text-black font-bold">{review.commentTitle}</span>
        </div>
        <div className="text-sm">
          {review.comment}
        </div>
        <div className="text-xs">{review.user.firstName + ' ' + review.user.lastName}</div>
        <div className="text-xs">
          {
            timeAgo(new Date(review.date))
          }
        </div>
      </div>
    );
  };



  const [currentImage, SetCurrentImage] = useState(images[0]);
  const [selectedSize_, setSelectedSize_] = useState('');
  const onImageTabButtonHandler = (item) => {
    SetCurrentImage(item);
  };

  useEffect(() => {
    window.scroll(0, 0);
    SetCurrentImage(images[0]);
  }, [images]);

  const PopoverCard = () => {
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
    const user = useSelector(state => state.user.user)
    return (
      <div>
        <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
          Select Size
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <div className="w-[320px] p-4 rounded-lg flex flex-col gap-4">
            <div className="flex justify-between h-10 ">
              {
                sizes.map((item,index)=>{
                  return(
                    <Button
                size="small"
                variant="outlined"
                onClick={() => {setSelectedSize(item)
                setSelectedSize_(item.size)}}
                  disabled={item.countInStock === 0}
                sx={{
                  color: `${selectedSize === item ? '' : 'gray'}`,
                  border: `${selectedSize === item ? '' : 'gray'}`,
                }}
                disableElevation
              >
                {item.size}
              </Button>
                  )
                })
              }
            </div>
            {(selectedSize || quantity > 1) && (
              <div
                className="text-xs text-blue-500 cursor-pointer flex items-center"
                onClick={() => {
                  setQuantity(1);
                  setSelectedSize('');
                  setSelectedSize_('');
                }}
              >
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
              <div className=" border-black border-[1px] p-2 text-xl rounded-lg text-black font-bold">
                {quantity}
              </div>
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
                  addToCartHandler(productId,quantity,selectedSize_,user);
                  handleClose();
                }}
              >
                Add to Bag
              </Button>
            </div>
          </div>
        </Popover>
      </div>
    );
  };
  return (
    <div className={`relative flex flex-col bg-light pb-20 `}>
      <div
        className={`flex justify-center p-8  lgrev:flex-col gap-8 lgrev:gap-4 lgrev:p-4`}
      >
        <div className="flex flex-col w-[600px]  gap-4 lgrev:w-[100%] bg-white p-4 rounded-lg ">
          <div className=" w-[100%] h-[400px]   lgrev:h-auto overflow-hidden">
            <img
              id="productImage"
              alt={currentImage + 'Image'}
              src={currentImage}
              className="object-contain"
            />
          </div>
          <div className=" my-2 flex space-x-4">
            {images.map((element, i) => (
              <div className="w-[80px]  cursor-pointer shadow-lg ">
                <img
                  className="object-cover"
                  alt={i + 'Image'}
                  key={i}
                  onClick={() => onImageTabButtonHandler(element)}
                  src={element}
                ></img>
              </div>
            ))}
          </div>
          <div className="flex  items-center gap-2">
            <span className="w-8 h-8 rounded-full
            flex items-center justify-center bg-blue-500 text-white font-bold" >
              {
                brand.charAt(0).toUpperCase()
              }
            </span>
            <span className="text-blue-500">{brand}</span>
          </div>
          <h2 className="text-black font-bold text-lg">SHIPPING</h2>
          <p>
            Currently we are not Shipping anything as as our site is in
            development mode , you could visit our store and purchase our
            products , Thank you.
          </p>

          <h2 className="text-black font-bold text-lg">REFUND</h2>
          <p>
            We hope you will be pleased with your purchase. Should you wish to
            return anything bought from us, we will be happy to refund or
            exchange a product provided it is in a fully resalable condition
            .Return should be made within a resalable time (7 days) and in
            orignal , undamaged packaging .
          </p>
        </div>

        <div className="flex flex-col  w-[600px] gap-4 lgrev:w-[100%]  h-[100%] text-gray-800 bg-white p-4 rounded-xl">
          <h2 className="text-4xl font-bold text-black">{name}</h2>
          <div className="space-x-4 flex">
            <div className="space-x-1">
              <Rating
                name="text-feedback"
                value={averageRating(reviews)}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            </div>
            <h2 className="font-thin">{!isNaN(averageRating(reviews)) && averageRating(reviews)

            } ({reviews.length} Reviews)</h2>
          </div>
          <h2 className="text-4xl">₹ {price}</h2>
          <h2 className="text-2xl font-bold text-black">Product Description</h2>
          {description.map((element, i) => {
            return <h2 key={i}>{element}</h2>;
          })}
          <h2 className="text-lg text-black font-bold">Size</h2>
          <div className="flex space-x-2">
        {
          sizes.map((element, i) => {
            return (
              <div
                key={i}
                className={ `
                  flex items-center justify-center w-8 h-8 rounded-full  border-black border-[1px]
                    ${element.countInStock === 0 && 'bg-gray-300 text-gray-500 border-[2px] border-gray-300'}
                    ${selectedSize_ === element.size && 'bg-blue-500 text-white border-[2px] border-blue-500'}
                  `}
                // onClick={() => onSizeButtonHandler(element)}
              >
                {element.size}
              </div>
            );
          })
        }
          </div>

     {reviews.length > 0 &&     <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Rating and Reviews</h2>
            <div className="flex flex-col space-y-2">
              {reviews.map((element, i) => {
                return (
                  <Review key={i} review={element} />
                );
              })}

            </div>
          </div>

     }
        </div>

      </div>


      <div className="sticky  bottom-20 w-[100%] flex justify-center  ">
        <div className="w-[60%] shadow-xl p-4 bg-white flex justify-between items-center mdrev:w-[95%] rounded-lg">
          <div className="flex gap-4 items-center ">
            <img className="w-[80px]" src={images[0]} />
            <h2>₹ {price}</h2>
            <h2 className="smrev:hidden">{name}</h2>
          </div>
          <div className="flex items-center gap-2"></div>
          <a className='text-blue-50'>Size Chart</a>
          <PopoverCard />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailed;
