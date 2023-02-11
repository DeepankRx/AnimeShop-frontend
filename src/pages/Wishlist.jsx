import { faAppleAlt, faCarCrash, faCaretLeft, faCaretRight, faHeart, faRupeeSign, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { assets } from '../assets'
import {faPaypal} from '@fortawesome/free-brands-svg-icons'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import NoList from '../components/UI/NoList'
import {cartActions} from '../store/cartSlice'
import { ALL_LINKS } from '../constant'
const Wishlist = () => {
    const dispatch=useDispatch();
    const items=useSelector(state=>state.cart.items);


    const Product=({product})=>{
        return(
        <div className='col-span-1 flex flex-col items-center justify-between gap-4 mdrev:flex-col  mdrev:items-start shadow-lg p-4 rounded-lg relative '>
        <div className='flex  gap-2 items-center mdrev:w-[100%] '>
            <div className='w-[100%] mdrev:w-[50%]'><img src={product.images[0]}/> </div>
        </div>
            <div className='w-[100%] '>
            <h2 className='text-xl font-bold col-span-2 mdrev:col-span-4'>{product.name}</h2>
            <h2 className='text-xl font-bold col-span-1 mdrev:col-span-2'>₹ {product.price}</h2>
            <h2 className='text-xl font-bold col-span-1 mdrev:col-span-2'>{product.size}</h2>
            </div>
            <div className='absolute bottom-2 right-2'>
                <FontAwesomeIcon className='p-2 bg-pink-200 rounded-full text-red-500 hover:opacity-80 cursor-pointer' size='xl' icon={faHeart} />
            </div>
        </div>
        )
    }
  return (
    <div className=''>
    <div id='Poppins' className='p-8  flex flex-col gap-8 w-[80%] m-auto mdrev:w-[100%]'>
        <h2 className='text-5xl mdrev:text-4xl' id='Monton'><span className='border-b-4 border-black '>MY Wishlist ({items.length})</span></h2>

        <div className='grid grid-cols-3 mdrev:grid-cols-1 gap-4'>
            {items.map((item,i)=><Product key={i} product={item}/>)}
        </div>
            {items.length===0 && <NoList message="No Wishlist Products Found Senpai , Let's Add Together ?"/>}
        
    </div>
    </div>
  )
}

export default Wishlist