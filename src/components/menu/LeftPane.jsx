import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { ALL_LINKS, SELLER_LINKS, ADMIN_LINKS } from '../../constant';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HistoryIcon from '@mui/icons-material/History';
const LeftPane = () => {
  const authCtx = useContext(AuthContext);
  const user = useSelector((state) => state.user.user);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const menu = {
    Home: {
      name: 'Home',
      pageLink: ALL_LINKS.HomePage.pageLink,
      icon: <HomeIcon />,
      showAlways: true
    },
    Signup: {
      name: 'Signup',
      pageLink: ALL_LINKS.SignupPage.pageLink,
      icon: <PersonIcon />,
      showLoggedIn: false
    },
    Login: {
      name: 'Login',
      pageLink: ALL_LINKS.LoginPage.pageLink,
      icon: <LoginIcon />,
      showLoggedIn: false
    },
    Dashboard: {
      name: 'Dashboard',
      pageLink: '/dashboard',
      icon: <DashboardIcon />,
      showAlways: false
    },
    MyProducts: {
      name: 'MyProducts',
      pageLink: 'dashboard/' + SELLER_LINKS.SellerProducts.pageLink,
      icon: <ProductionQuantityLimitsIcon />,
      showAlways: false
    },
    AddProduct: {
      name: 'Add Product',
      pageLink: 'dashboard/' + SELLER_LINKS.AddProduct.pageLink,
      icon: <AddIcon />,
      showAlways: false
    },
    Profile: {
      name: 'Profile',
      pageLink: ALL_LINKS.UserProfile.pageLink,
      icon: <AccountCircleIcon />,
      showAlways: false
    },
    Cart: {
      name: 'Cart',
      pageLink: ALL_LINKS.Cart.pageLink,
      icon: <ShoppingBagIcon />,
      showAlways: false
    },
    Wishlist: {
      name: 'Wishlist',
      pageLink: ALL_LINKS.Wishlist.pageLink,
      icon: <FavoriteIcon />,
      showAlways: false
    },
    History: {
      name: 'History',
      pageLink: ALL_LINKS.OrderHistory.pageLink,
      icon: <HistoryIcon />,
      showAlways: false
    },
    Orders: {
      name: 'Orders',
      pageLink: ALL_LINKS.Order.pageLink,
      icon: <AccessTimeIcon />,
      showAlways: false
    },
    AllProducts: {
      name: 'All Products',
      pageLink: 'dashboard/' + ADMIN_LINKS.AllProducts.pageLink,
      icon: <ProductionQuantityLimitsIcon />,
      showAlways: false
    },
    AllCarts: {
      name: 'All Carts',
      pageLink: 'dashboard/' + ADMIN_LINKS.AllCarts.pageLink,
      icon: <ProductionQuantityLimitsIcon />,
      showAlways: false
    },
    AllOrders: {
      name: 'All Orders',
      pageLink: 'dashboard/' + ADMIN_LINKS.AllOrders.pageLink,
      icon: <ProductionQuantityLimitsIcon />,
      showAlways: false
    },
    AllUsers: {
      name: 'All Users',
      pageLink: 'dashboard/' + ADMIN_LINKS.AllUsers.pageLink,
      icon: <ProductionQuantityLimitsIcon />,
      showAlways: false
    },
    AllOrderHistory: {
      name: 'All Order History',
      pageLink: 'dashboard/' + ADMIN_LINKS.AllOrderHistory.pageLink,
      icon: <ProductionQuantityLimitsIcon />,
      showAlways: false
    },
    AllWishlist: {
      name: 'All Wishlist',
      pageLink: 'dashboard/' + ADMIN_LINKS.AllWishlist.pageLink,
      icon: <ProductionQuantityLimitsIcon />,
      showAlways: false
    }
  };

  const showMenu = {
    '': [menu['Home'], menu['Login']],
    customer: [menu['Home'], menu['Profile'], menu['Wishlist'], menu['Orders'], menu['History'], menu['Cart']],
    seller: [menu['Home'], menu['Dashboard'], menu['MyProducts'], menu['AddProduct']],
    admin: [
      menu['Home'],
      menu['Dashboard'],
      menu['AllProducts'],
      menu['AllCarts'],
      menu['AllOrders'],
      menu['AllUsers'],
      menu['AllOrderHistory'],
      menu['AllWishlist']
    ]
  };

  let loadMenu = [];
  if (authCtx.isLoggedIn) {
    loadMenu = showMenu[authCtx.role];
  } else {
    loadMenu = showMenu[''];
  }

  return (
    <>
      {authCtx.isLoggedIn && (
        <div className="flex flex-col items-center my-8">
          <div className="bg-green-100 w-28 h-28  rounded-full relative overflow-hidden shadow-lg">
            <img src={user.profilePicture} className="w-[100%] h-[100%]" alt="profile" />
          </div>
          <h1 className="font-bold  mt-4">{`${user.firstName} ${user.lastName}`}</h1>
          {user.mobileNo && <h1 className="font-semibold">{`${user.mobileNo}`}</h1>}
        </div>
      )}
      {/* <NavLink
          to={menuSections[item].pageLink}
          className={({ isActive }) =>
          isActive && menuSections[item].pageLink
            ? `flex border-l-4 ml-2 border-primary text-primary`
            : ""
        }
           key={index} ></NavLink> */}
      <List className="flex flex-col items-center gap-2">
        {loadMenu.map((item, index) => (
          <NavLink
            to={item.pageLink}
            key={index}
            className={({ isActive }) =>
              `${isActive ? setHighlightIndex(index) : ''} ${index === highlightIndex ? 'bg-black text-white font-bold rounded-lg' : ''}`
            }
          >
            <ListItemButton sx={{ width: 200 }}>
              <ListItemIcon sx={{ color: `${index === highlightIndex ? 'white' : ''} ` }}>{item.icon}</ListItemIcon>

              <h1 className="p-1">{item.name}</h1>
            </ListItemButton>
          </NavLink>
        ))}
        {authCtx.isLoggedIn && (
          <ListItemButton sx={{ width: 200 }} onClick={() => authCtx.logout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        )}
      </List>
    </>
  );
};

export default LeftPane;
