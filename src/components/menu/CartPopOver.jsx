import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ALL_LINKS } from '../../constant';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'

export default function CartPopOver() {
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

  return (
    <div>
      <Button variant='text' sx={{color:'black'}} onClick={handleClick}>
      <div className="flex justify-center items-center  space-x-2 "><ShoppingCartIcon sx={{':hover':{color:'#D61355'}}} fontSize='small'/><span className="font-bold  smrev:hidden"></span></div>
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
        <div className='p-4 flex flex-col w-[300px]'>
            <div className='flex items-center flex-col'>
            <Button onClick={()=>{navigate(ALL_LINKS.Cart.pageLink);handleClose();}} variant='contained' endIcon={<ShoppingBagIcon/>}>View Cart</Button>
            </div>
        </div>
      </Popover>
    </div>
  );
}