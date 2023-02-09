import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ALL_LINKS } from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { cartActions } from '../../store/cartSlice';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Badge } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { clear } from '@testing-library/user-event/dist/clear';

export default function CartPopOver2() {
  const dispatch=useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const authCtx=useContext(AuthContext);
  const navigate=useNavigate();
  const user=useSelector(state=>state.user.user);

  const cartRemoveHandler=(_id,size,amount)=>{
    dispatch(cartActions.removeItemFromCart({_id,size,amount}))
  }

  const [itemAdded,setItemAdded]=useState(false);
  const items=useSelector(state=>state.cart.items);

  useEffect(()=>{
    setItemAdded(true);
    const timer=setTimeout(() => {
      setItemAdded(false);
    }, 500);

    return()=>{
      clearTimeout(timer);
    }
  },[items])

  return (
    <div>
      <Button variant='text' sx={{color:'black'}}   onClick={handleClick}>
      <div className={`flex justify-center items-center relative  space-x-2  ${itemAdded ? 'scale-110 duration-200  ease-linear' : ''}`}>
      <Badge  badgeContent={items.length} color="secondary">
        <ShoppingBagIcon sx={{':hover':{color:'#D61355'},color:`${itemAdded ? 'red': 'black'} `}} fontSize='medium' className=''/>
      </Badge>
        </div>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className='p-2 flex flex-col w-[300px] max-h-[240px] gap-2 '>
            <div className='flex items-center flex-col gap-2 overflow-auto pr-4'>
              <div className='w-[100%] flex flex-col gap-2'>
                {items.map((item,i)=>
                <div key={i} className='grid grid-cols-4 p-2 bg-pink-50 rounded-lg' >
                <h2 className='col-span-2 overflow-hidden'>{item.name}</h2>
                <h2 className='col-span-1'>{item.amount} X {item.size}</h2>
                <div className='flex justify-end'>
                <FontAwesomeIcon onClick={()=>cartRemoveHandler(item._id,item.size,item.amount)} color='red' className='cursor-pointer' icon={faTrash}/>
                </div>
                </div>)}
                {items.length===0 && <h2 className='text-center'>No Products Added</h2>}
              </div>
            </div>
            <Button  onClick={()=>{navigate(ALL_LINKS.Cart.pageLink);handleClose();}} variant='outlined' endIcon={<ShoppingBagIcon/>}>View Cart</Button>

        </div>
      </Popover>
    </div>
  );
}