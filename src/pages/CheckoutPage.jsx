import { Button, Divider } from '@mui/material'
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { createOrder,BASE_MAIN_URL ,razorpayCreateOrder,capturePayment} from '../services/APIs';
import Gap from '../components/UI/Gap';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { cartActions } from '../store/cartSlice';
import {toast} from 'react-toastify'
const CheckoutPage = () => {
  const dispatch=useDispatch()
  const [paymentChecked,setPaymentChecked]=useState(1);
  const [addressChecked,setAddressChecked]=useState(0);
  const [loading,setLoading]=useState(false);
  const items=useSelector(state=>state.cart.items)
  const user=useSelector(state=>state.user.user)

  const createRazorpayOrder=async()=>{
    if(!user.address)
    {
        toast.warn('Select an address');
        return ;
    }
    const data = {
      user:user.id,
      order:{
        address:user.address.address[addressChecked],
        paymentType:'ONLINE',
        paymentStatus:'pending',
        orderStatus:'pending',
        items:items,
        totalAmount:items.reduce((acc,item)=>acc+item.amount*item.price,0),
      },
    }
    try{
      setLoading(true);
   const response=await razorpayCreateOrder({
      user,
      order:data.order
   });
   if(response.data.status=="success")
   {
    const options = {
      key: "rzp_test_5OlxwMLgAS3BGQ", // Enter the Key ID generated from the Dashboard
      amount: data.order.totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Animart",
      description: "Test Transaction",
      image: "https://zeroxsoftwares.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.7b69e523.png&w=640&q=75",
      method: {
        "netbanking": true,
        "card": true,
        "wallet": true,
        "upi": true
      },
      order_id: response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url:`${BASE_MAIN_URL}/api/payment/capture-payment`,
      prefill: {
          "name": user.address.address[addressChecked].customerName,
          // "email": "gaurav.kumar@example.com",
          "contact": user.address.address[addressChecked].mobileNo,
      },
      notes: {
          "address": "Animart Dehradun"
      },
      theme: {
          "color": "#3399cc"
      }
  };
  setLoading(false);
  const  razor = new window.Razorpay(options);
  razor.open();
   }

  }
  catch(e){
    alert(e.message)
  }
  }


  const handleCreateOrder=async()=>{
    if(!user.address)
    {
        toast.warn('Select an address');
        return ;
    }
    dispatch(cartActions.replaceCart({items:[],totalAmount:0,changed:!user.changed}))
    const order={
      user:user.id,
      order:{
        address:user.address.address[addressChecked],
        paymentType:paymentChecked===1 ? 'ONLINE' : 'COD',
        paymentStatus:'pending',
        orderStatus:'pending',
        items:items,
        totalAmount:items.reduce((acc,item)=>acc+item.amount*item.price,0)
      }
    }
    const response=await createOrder(order);
  }

  const Address=({name,address})=>{
    return(
      <div className='flex items-center gap-4 shadow-lg rounded-xl p-2 bg-white cursor-pointer hover:opacity-75' onClick={()=>setAddressChecked(name)}>
      <input  checked={addressChecked===name ? true : false} name={name} className='w-8 h-8 ring-0 rounded' type='radio'/>
      <div>
      <h3 className='text-xl font-semibold'>{address.customerName}</h3>
      <p>{address.addressLine1} {address.addressLine2} {address.landmark} {address.pincode}</p>
      <p className='font-semibold'>{address.city} , {address.state} , India</p>
      <p className='font-semibold'>{address.mobileNo}</p>
    </div>
    </div>
    )
  };

  const initialValues={
    cardNo:'',
    expirationDate:'',
    cvv:''
  }

  const validationSchema=Yup.object({
    cardNo:Yup.number().required('Required').max(16),
    expirationDate:Yup.string().required('Required'),
    cvv:Yup.number().required('Required').max(3),
  })


  const cartRemoveHandler=(_id,size,amount)=>{
    dispatch(cartActions.removeItemFromCart({_id,size,amount}))
};

const addToCartHandler=(item,amount,size)=>{
    dispatch(cartActions.addItemToCart({item:{...item,amount,size}}))
}
  return (
    <div className=' gap-4 flex flex-col'>
        <h2 id='Monton' className='text-4xl p-4'>CHECKOUT DETAILS</h2>
        <div className='p-4 grid grid-cols-3  bg-primary rounded-xl gap-4 mdrev:grid-cols-1 md:m-2'>
          <div className='col-span-1 flex flex-col bg-slate-100 p-4 rounded-xl  gap-4'>
            <Gap>Shipping Address</Gap>
            <form className='flex flex-col gap-4'>
              {
                user?.address?.address.map((item,i)=>{

                 return <Address name={i} address={item} key={i}/>
                })
              }
            </form>
            <div className='flex'><Button variant='contained'>Add Other Address</Button></div>

            <Gap>Billing Address</Gap>
            <div className='flex  gap-4 items-center
            '>
            <input name='shipping' checked={true} className='w-5 h-5 ring-0 rounded' type='radio' />
            <label for='shipping' className='text-lg font-bold'>Same as Shipping Address</label>
            </div>


          </div>
        <div className='px-4 py-4  flex flex-col gap-4 bg-slate-100 rounded-xl  lgrev:p-4'>
            <Gap>Shipping Method</Gap>
            <div className='flex items-center justify-between'>
            <div className='flex  gap-4 items-center'>
            <input name='delivery' checked={true} className='w-5 h-5 ring-0 rounded' type='radio' />
            <label for='delivery' className='text-lg font-bold'>Regular (4-6 Days)</label>
            </div>
            <h2>FREE</h2>
            </div>

            <Gap>Payment Method</Gap>
            <div className='flex flex-col gap-4'>
            <div className='flex  gap-4 items-center'>
            <input name='payment1' onClick={()=>setPaymentChecked(1)} checked={paymentChecked===1 ? true : false} className='w-5 h-5 ring-0 rounded' type='radio' />
            <label for='payment1' className='text-lg font-bold'>Online</label>
            </div>
            <div className='flex  gap-4 items-center'>
            <input name='payment2' onClick={()=>setPaymentChecked(2)} checked={paymentChecked===2 ? true : false} className='w-5 h-5 ring-0 rounded' type='radio' />
            <label for='payment2' className='text-lg font-bold'>Cash on Delivery</label>
            </div>
            </div>

        </div>
        <div className='px-4 py-4  flex flex-col gap-4 bg-slate-100 rounded-xl  lgrev:p-4'>
            <Gap>Review Order</Gap>
            <div className='flex flex-col gap-2'>
              {items.map((item,i)=>
              <div className='bg-white  rounded-lg divide-y-[1px] divide-black' key={i}>
              <div key={i} className=' flex justify-between items-center relative py-2 px-4'>
                <div className='space-y-2 w-32'>
                  <img className='' src={item.images[0]} />
                <h2 className='text-lg font-bold'>{item.name} <span className='text-green-500'>{item.size}</span></h2>
                </div>
                <div className='flex items-center gap-3 mr-4'>
                <FontAwesomeIcon icon={faCaretLeft} size='sm' onClick={()=>cartRemoveHandler(item._id,item.size,1)} className='cursor-pointer w-5 h-5 bg-gray-200 rounded-full'/>
                <h2 className=''>{item.amount}</h2>
                <FontAwesomeIcon icon={faCaretRight} size='sm' className='cursor-pointer w-5 h-5 bg-gray-200 rounded-full'
                  onClick={()=>addToCartHandler({
                    price: item.price,
                    name: item.name,
                    description: item.description,
                    images: item.images,
                    brand: item.brand,
                    _id: item.itemId,
                  },
                  1,
                  item.size
                  )}
                />
                </div>
                  <h2 className=''>₹ {item.price}</h2>
                <div className='absolute bottom-0 right-1'>
                <FontAwesomeIcon onClick={()=>cartRemoveHandler(item._id,item.size,item.amount)} icon={faTrash} color='red' size='sm' className='cursor-pointer mdrev:self-end hover:opacity-50 bg-gray-200 p-2 rounded-full '/>
                </div>
              </div>
              <div className='flex justify-between p-2'>
                <h2>SubTotal</h2>
                <h2>{(+item.price) * (+item.amount)}</h2>
              </div>

              </div>

              )}
                <Button variant='contained' className='bg-black text-white'
                onClick={()=>
                  paymentChecked===1 ?  createRazorpayOrder() : handleCreateOrder()
                }
                disabled={items.length===0 ? true : false}
                >{
                  paymentChecked===1 ? loading ? 'Loading...' : 'Pay Now' : loading ? 'Loading...' : 'Place Order'
                }</Button>

            </div>
          </div>
        </div>
    </div>
  )
}

export default CheckoutPage