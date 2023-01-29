import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import { Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_LINKS } from '../../constant';
import { useSelector } from 'react-redux';
export default function MenuPopOver() {
//Default
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //
  const authCtx=useContext(AuthContext);
  const navigate=useNavigate();
  const user=useSelector(state=>state.user.user);

  return (
    <div>
      <Button variant='text' sx={{color:'black'}} onClick={handleClick}>
      <div className="flex justify-center items-center  space-x-2 "><PersonIcon sx={{':hover':{color:'#D61355'}}} fontSize='small'/><span className="font-bold  smrev:hidden"></span></div>
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
        {authCtx.isLoggedIn ? 
        <div className='p-4 flex flex-col w-[300px] gap-2'>
            <div className='flex flex-col items-center gap-2'>
            <p>Hello 👋 {user.firstName} {user.lastName}</p>
            <Button onClick={()=>authCtx.logout()} variant='contained' endIcon={<PersonIcon/>}>logout</Button>
            </div>
            {/* <div className='h-[1px] bg-black'></div> */}


        </div>:
        <div className='p-4 flex flex-col w-[300px]'>
            <div className='flex items-center flex-col'>
            <Button onClick={()=>navigate(ALL_LINKS.LoginPage.pageLink)} variant='contained' endIcon={<PersonIcon/>}>Login</Button>
            <p>New Customer ? <Link className='text-blue-500' to={ALL_LINKS.SignupPage.pageLink}>Sign up</Link></p>
            </div>
        </div>
        }
      </Popover>
    </div>
  );
}