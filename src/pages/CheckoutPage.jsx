import { Button, Divider } from '@mui/material'
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import Gap from '../components/UI/Gap';
import InputField from '../components/UI/InputField';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { cartActions } from '../store/cartSlice';
const CheckoutPage = () => {
  const dispatch=useDispatch()
  const [paymentChecked,setPaymentChecked]=useState(1);
  const [addressChecked,setAddressChecked]=useState(1);

  const items=useSelector(state=>state.cart.items)

  const Address=({name})=>{
    return(
      <div className='flex items-center gap-4 shadow-lg rounded-xl p-2 bg-white'>
      <input onClick={()=>setAddressChecked(name)} checked={addressChecked===name ? true : false} name={name} className='w-8 h-8 ring-0 rounded' type='radio'/>
      <div>
      <h3 className='text-xl font-semibold'>Himanshu Chauhan</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti pariatur magnam doloribus </p>
      <p className='font-semibold'>Dehradun , Uttarakhand , India</p>
      <p className='font-semibold'>8941983289</p>
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
              <Address name={1} />
              <Address name={2} />
              <Address name={3} />
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
            <label for='payment1' className='text-lg font-bold'>Credit Card</label>
            </div>
            { paymentChecked===1 &&
            <Formik  initialValues={initialValues} validationSchema={validationSchema} >
            <Form className='grid grid-cols-1 bg-white p-2  rounded-lg '>
              <InputField uni='cardNo' labelName='Card Number' placeholder='XXXX XXXX XXXX XXXX'/>
              <InputField uni='expirationDate' labelName='Expiration Date' placeholder='MM/YY'/>
              <InputField uni='cvv' labelName='CVV' placeholder='XXX'/>
            </Form>
            </Formik>
          }

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
              <div className='bg-white  rounded-lg divide-y-[1px] divide-black'>
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
            </div>
          </div>
        </div>
    </div>
  )
}

export default CheckoutPage