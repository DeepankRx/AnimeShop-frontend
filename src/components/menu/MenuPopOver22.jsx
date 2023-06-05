import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import { Divider, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_LINKS } from '../../constant';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none'
  },
  popoverContent: {
    pointerEvents: 'auto'
  }
}));
const CartPopOver = () => {
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);

  const popoverEnter = ({ currentTarget }) => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false);
  };

  const classes = useStyles();

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <div ref={popoverAnchor} aria-owns="mouse-over-popover" aria-haspopup="true" onMouseEnter={popoverEnter} onMouseLeave={popoverLeave}>
        <IconButton>
          <PersonIcon sx={{ color: 'black' }} fontSize="medium" className="" />
        </IconButton>
      </div>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      >
        <div className="p-4 flex flex-col w-[300px] gap-2">
          <div className="flex flex-col items-center gap-2">
            {authCtx.isLoggedIn && (
              <p>
                Hello 👋 {user.firstName} {user.lastName}
              </p>
            )}
            {authCtx.isLoggedIn && (
              <Button
                onClick={() => {
                  navigate(ALL_LINKS.UserProfile.pageLink);
                }}
              >
                Profile
              </Button>
            )}
            {authCtx.isLoggedIn && (
              <Button onClick={() => authCtx.logout()} variant="contained" endIcon={<PersonIcon />}>
                logout
              </Button>
            )}
            {!authCtx.isLoggedIn && (
              <Button onClick={() => navigate(ALL_LINKS.LoginPage.pageLink)} variant="contained" endIcon={<PersonIcon />}>
                Login
              </Button>
            )}
            {!authCtx.isLoggedIn && (
              <p>
                New Customer ?{' '}
                <Link className="text-blue-500" to={ALL_LINKS.SignupPage.pageLink}>
                  Sign up
                </Link>
              </p>
            )}
          </div>
          {/* <div className='h-[1px] bg-black'></div> */}
        </div>
      </Popover>
    </div>
  );
};

export default CartPopOver;
