import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
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

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <IconButton variant="text" sx={{ color: 'black' }} onClick={handleClick}>
        <PersonIcon sx={{ ':hover': { color: '#D61355' } }} fontSize="medium" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <div className="p-4 flex flex-col w-[300px] gap-2">
          <div className="flex flex-col items-center gap-2">
            {authCtx.isLoggedIn && (
              <p>
                Hello 👋 {user.firstName} {user.lastName}
              </p>
            )}
            {authCtx.role === 'customer' && authCtx.isLoggedIn && (
              <>
                <div className="w-[100%]">
                  <Button
                    variant="outlined"
                    className="w-[100%]"
                    onClick={() => {
                      navigate(ALL_LINKS.Order.pageLink);
                      {
                        handleClose();
                      }
                    }}
                  >
                    Order
                  </Button>
                </div>
                <div className="w-[100%]">
                  <Button
                    variant="outlined"
                    className="w-[100%]"
                    onClick={() => {
                      navigate(ALL_LINKS.UserProfile.pageLink);
                      {
                        handleClose();
                      }
                    }}
                  >
                    Profile
                  </Button>
                </div>
                <div className="w-[100%]">
                  <Button
                    variant="outlined"
                    className="w-[100%]"
                    onClick={() => {
                      navigate(ALL_LINKS.Wishlist.pageLink);
                      {
                        handleClose();
                      }
                    }}
                  >
                    Wishlist
                  </Button>
                </div>
                <div className="w-[100%]">
                  <Button
                    variant="outlined"
                    className="w-[100%]"
                    onClick={() => {
                      navigate(ALL_LINKS.OrderHistory.pageLink);
                      {
                        handleClose();
                      }
                    }}
                  >
                    Order History
                  </Button>
                </div>
              </>
            )}

            {authCtx.isLoggedIn && (
              <div className="w-[100%]">
                <Button className="w-[100%]" onClick={() => authCtx.logout()} variant="contained" endIcon={<PersonIcon />}>
                  logout
                </Button>
              </div>
            )}
            {!authCtx.isLoggedIn && (
              <Button className="w-[100%]" onClick={() => navigate(ALL_LINKS.LoginPage.pageLink)} variant="contained" endIcon={<PersonIcon />}>
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
}
