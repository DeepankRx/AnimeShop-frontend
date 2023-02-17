import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material'
import React, { useState,useEffect } from 'react'
import { assets } from '../assets'
import { getUserOrderHistory } from '../services/APIs';
const OrderHistory = () => {
  const [orderHistory,setOrderHistory]=useState([]);
  useEffect(() => {
    getUserOrderHistory()
      .then((res) => {
        console.log(res.data.orderHistories);
        setOrderHistory(res.data.orderHistories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const status=[
    {
      title:''
    }
  ]
  const Card=()=>{
    const [showMore,setShowMore]=useState(false);
    return(
      <div className='rounded-lg overflow-hidden border-[1px] border-black md:max-w-5xlxl'>
      <div className='bg-gray-200 px-4 py-2 flex justify-between mdrev:p-2'>
        <div>
        <h4 className='font-semibold '>Order Place on</h4>
        <h4 className='text-sm'>13 th Jan , 2023</h4>
        </div>

        {/* <div className='flex justify-center items-center text-lg gap-1'>
         <div className={`w-4 h-4  rounded-full`}/>  Status : <span>Delivered</span>
        </div> */}
      </div>
      <div className='p-4 mdrev:p-2 flex flex-col gap-4'>
      <div className=' flex-col flex gap-4 md:flex-row'>
        <div className='w-60 h-40 m-auto'>
          <img src={assets.anime_bg_1} className='w-[100%] h-[100%] object-contain' />
        </div>
        <div className='flex gap-4 flex-col'>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, eveniet?</h4>
          <h4>Total Price : <span className='font-semibold'>₹ 499</span></h4>
            <div className='flex gap-4'>
              <Button size='small' variant='contained'>View Product</Button>
              <Button size='small' variant='outlined'>Buy Again</Button>
            </div>
        </div>
        <div className='flex items-center'>
        <Button variant='contained' className='flex-1'>Review</Button>
        </div>
      </div>
      <div onClick={()=>setShowMore(!showMore)} className='flex justify-end gap-2'>
        <h4>{showMore ? 'Hide Details' : 'Show Details'}</h4>
        <FontAwesomeIcon   className='w-6 h-6 rounded-full cursor-pointer bg-gray-200' icon={showMore ? faCaretUp : faCaretDown} />
      </div>
      {showMore && <div className='flex justify-between mdrev:flex-col'>
        <div className='text-sm'>
        <h2 className='font-semibold text-base'>Shipping Address</h2>
        <h2 className='font-semibold'>Himanshu Chauhan</h2>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <h2>248001 Dehradun Uttarakhand</h2>
        </div>

        <div>
        <h2 className='font-semibold text-base'>Payment Methods</h2>
        <h2>ending with 9343</h2>
        </div>

        <div className='text-sm w-60'>
        <h2 className='font-semibold text-base'>Order Summary</h2>
        <div className='flex justify-between'>
        <h2>Item(s) Subtotal</h2>
        <h2>₹ 499</h2>
        </div>

        <div className='flex justify-between'>
        <h2>Shipping</h2>
        <h2>₹ 499</h2>
        </div>

        <div className='flex justify-between'>
        <h2>Promotion Applied</h2>
        <h2>-₹499</h2>
        </div>

        <div className='flex justify-between font-semibold text-base'>
        <h2 className=''>Grand Total</h2>
        <h2>₹ 499</h2>
        </div>
        </div>
      </div>
  }
      </div>
    </div>
    )
  }
  return (
    <div id='Poppins' className='p-8  flex flex-col gap-4 w-[80%] m-auto mdrev:w-[100%] mdrev:p-4'>
        <h2 className='text-5xl mdrev:text-4xl md:p-4' id='Monton'>Your Orders</h2>
        <div className='flex flex-col gap-4 justify-center items-center'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
    </div>
  )
}

export default OrderHistory