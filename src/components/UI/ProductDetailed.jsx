// const dataToSend={
//   pName:'',
//   pImages:[],
//   pDescription:[],

//   pID:'',
//   pPrice:'',
//   pTags:''

// }

import { faAdd, faMinus, faStar, faStarAndCrescent, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormControl, MenuItem, Popover, Rating, Select, Slider } from "@mui/material";
import { Box, color } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star'
import { assets } from "../../assets";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import RestartAltIcon from '@mui/icons-material/RestartAlt';



const ProductDetailed = (props) => {


  const Review=()=>{
    return(
      <div className="w-[100%] border-[1px] border-gray-400 p-2 flex flex-col gap-2">
      <div className="space-x-2">
      <span className="bg-black text-white p-1 text-sm w-[50px]">5 <StarIcon fontSize="small" sx={{color:'gold'}} /></span>  
      <span className="text-black font-bold">Terrific purchase</span>
      </div>
      <div className="text-sm" >Mind Blowing 🥰 I bought a camera for the first time in my life</div>
      <div className="text-xs">Jit Halder</div>
      <div className="text-xs">4 Months ago</div>
    </div>
    )
  }

  const [productImages,setProductImages]=useState([assets.bg_01,assets.bg_02]);

  const [currentImage, SetCurrentImage] = useState(productImages[0]);

  const onImageTabButtonHandler = (item) => {
    SetCurrentImage(item);
  };


  useEffect(() => {
    window.scroll(0, 0);
  }, []);


  const PopoverCard=()=> {

    const [quantity,setQuantity]=useState(1);
    const [selectedSize,setSelectedSize]=useState('');

    const decreaseHandler=()=>{
      if(quantity===1)return;
      setQuantity(quantity-1);
    }
  
    const increaseHandler=()=>{
      setQuantity(quantity+1);
    }
    
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
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
              <Button size="small" variant="outlined" onClick={()=>setSelectedSize('sm')} sx={{color:`${selectedSize==='sm' ? '' : 'gray'}` ,border:`${selectedSize==='sm' ? '' : 'gray'}`}} disableElevation>SM</Button>
              <Button size="small" variant="outlined" onClick={()=>setSelectedSize('md')} sx={{color:`${selectedSize==='md' ? '' : 'gray'}` ,border:`${selectedSize==='md' ? '' : 'gray'}`}} disableElevation>MD</Button>
              <Button size="small" variant="outlined" onClick={()=>setSelectedSize('lg')} sx={{color:`${selectedSize==='lg' ? '' : 'gray'}` ,border:`${selectedSize==='lg' ? '' : 'gray'}`}} disableElevation>LG</Button>
              <Button size="small" variant="outlined" onClick={()=>setSelectedSize('xl')} sx={{color:`${selectedSize==='xl' ? '' : 'gray'}` ,border:`${selectedSize==='xl' ? '' : 'gray'}`}} disableElevation>XL</Button>
            </div>
            {(selectedSize || quantity>1) &&
            <div className="text-xs text-blue-500 cursor-pointer flex items-center" onClick={()=>{setQuantity(1);setSelectedSize('')}}>
            <RestartAltIcon color="primary" size='small'/>
              <span>Clear</span>
            </div>
            }
            <div className="flex p-2 items-center gap-1 justify-between">
            <FontAwesomeIcon onClick={()=>decreaseHandler()} className="hover:bg-blue-100  rounded-full p-2 cursor-pointer " icon={faMinus} color='black' size="lg"/>
              <div className=" border-black border-[1px] p-2 text-xl rounded-lg text-black font-bold">{quantity}</div>
            <FontAwesomeIcon onClick={()=>increaseHandler()} className="hover:bg-blue-100  rounded-full p-2 cursor-pointer " icon={faAdd} color='black' size="lg"/>
            <Button variant="contained" color="primary" disabled={!selectedSize}>Add to Bag</Button>
            </div>
          </div>
        </Popover>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col bg-light pb-20 `}>
      <div className={`flex justify-center p-8  lgrev:flex-col gap-8 lgrev:gap-4 lgrev:p-4`}>
        <div className='flex flex-col w-[600px]  gap-4 lgrev:w-[100%] bg-white p-4 rounded-lg '>
          <div className=' w-[100%] h-[400px]   lgrev:h-auto overflow-hidden'>
            <img
              id="productImage"
              alt={currentImage + "Image"}
              src={currentImage}
              className='object-contain'
            />
          </div>
          <div className='w-[200px] my-2 flex space-x-4'>
            {productImages.map((element, i) => (
              <div className="w-[100%]  cursor-pointer shadow-lg ">
              <img
                className="object-fill"
                alt={i + "Image"}
                key={i}
                onClick={() => onImageTabButtonHandler(element)}
                src={element}
                ></img>
                </div>
            ))}
          </div>
          <div className="flex  items-center gap-2">
            <img className="w-8 h-8 rounded-full" src={assets.person}/>
            <span className="text-blue-500">Deepika</span>
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

        <div className='flex flex-col  w-[600px] gap-4 lgrev:w-[100%]  h-[100%] text-gray-800 bg-white p-4 rounded-xl'>

            <h2 className="text-4xl font-bold text-black">Zerox Shirt</h2>
            <div className="space-x-4 flex">
              <div className="space-x-1">
                <Rating
                name="text-feedback"
                value={4.5}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              </div>
              <h2 className="font-thin">4.4 (214 Reviews)</h2>
            </div>
            <h2 className='text-4xl'>₹ 200</h2>
            <h2 className='text-2xl font-bold text-black'>Product Description</h2>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, vitae autem atque tempore ex obcaecati dolores repudiandae quod? Hic, necessitatibus.</h2>
            <h2 className="text-lg text-black font-bold">Size</h2>
            <div className="flex space-x-2">
              <div className="w-10 h-10 border-2 border-black text-lg  flex justify-center items-center rounded-full">XL</div>
              <div className="w-10 h-10 border-2 border-black text-lg  flex justify-center items-center rounded-full">XL</div>
              <div className="w-10 h-10 border-2 border-black text-lg  flex justify-center items-center rounded-full">XL</div>
            </div>


            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Rating and Reviews</h2>
              {/* <Box width={300}>
              <Rating name="text-feedback" value={5} readOnly precision={0.5} emptyIcon={<StarIcon  style={{ opacity: 0.55 }} fontSize="inherit" />} />
              </Box> */}
              <div className="flex flex-col space-y-2">
                <Review/>
                <Review/>
                <Review/>
                <Review/>
              </div>

            </div>
        </div>
      </div>

        <div className="sticky  bottom-20 w-[100%] flex justify-center  ">
          <div className="w-[60%] shadow-xl p-4 bg-white flex justify-between items-center mdrev:w-[95%] rounded-lg">
            <div className="flex gap-4 items-center ">
            <img className="w-[80px]" src={productImages[0]} />
            <h2>₹ 200</h2>
            <h2 className="smrev:hidden">Shirt Name</h2>
            </div>
            <div className="flex items-center gap-2">
              
            </div>
            {/* <Button variant="contained" size="large">Add to Bag</Button> */}
            <PopoverCard/>
          </div>
        </div>
    </div>
  );
};

export default ProductDetailed;