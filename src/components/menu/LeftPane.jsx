import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { ALL_LINKS, SELLER_LINKS } from '../../constant';
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import HomeIcon  from "@mui/icons-material/Home";
import LogoutIcon  from "@mui/icons-material/Logout";
import AddIcon  from "@mui/icons-material/Add";
import DashboardIcon  from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useSelector } from 'react-redux';
import { assets } from '../../assets';
import { useState } from 'react';
import { SellerMenu } from '../../seller/SellerDashboard';
const LeftPane = () => {
    const authCtx=useContext(AuthContext);
    const user=useSelector(state=>state.user.user)
    const [highlightIndex,setHighlightIndex]=useState(-1);

    const menu={
        Home:{
          name:'Home',
          pageLink:ALL_LINKS.HomePage.pageLink,
          icon:<HomeIcon/>,
          showAlways:true
        },
        Signup:{
          name:'Signup',
          pageLink:ALL_LINKS.SignupPage.pageLink,
          icon:<PersonIcon/>,
          showLoggedIn:false
        },
        Login:{
          name:'Login',
          pageLink:ALL_LINKS.LoginPage.pageLink,
          icon:<LoginIcon/>,
          showLoggedIn:false
        },
        Dashboard:{
          name:'Dashboard',
          pageLink:'/dashboard',
          icon:<DashboardIcon/>,
          showAlways:false
        },
        MyProducts:{
          name:'MyProducts',
          pageLink:'dashboard/'+SELLER_LINKS.SellerProducts.pageLink,
          icon:<ProductionQuantityLimitsIcon/>,
          showAlways:false
        },
        AddProduct:{
          name:'Add Product',
          pageLink:'dashboard/'+SELLER_LINKS.AddProduct.pageLink,
          icon:<AddIcon/>,
          showAlways:false
        },
    }
  
    const showMenu={
        'logout':[menu['Home'],menu['Login']],
        '':[menu['Home'],menu['Login']],
        'seller':[menu['Home'],menu['Dashboard'],menu['MyProducts'],menu['AddProduct']],
      }
    
    
      let loadMenu=[];
      if(authCtx.isLoggedIn){
        loadMenu=showMenu[authCtx.role]
      }else{
        loadMenu=showMenu.logout;
      }

    return (
    
    <>

      {authCtx.isLoggedIn &&
      <div className='flex flex-col items-center my-8'>
        <div className='bg-green-100 w-28 h-28  rounded-full relative overflow-hidden shadow-lg'>
          <img src={user.profilePicture} className='object-fit'/>
        </div>
        <h1 className='font-bold  mt-4'>{`${user.firstName} ${user.lastName}`}</h1>
        <h1 className='font-semibold'>{`${user.mobileNo}`}</h1>
      </div>
      }
      {/* <NavLink 
          to={menuSections[item].pageLink}
          className={({ isActive }) =>
          isActive && menuSections[item].pageLink
            ? `flex border-l-4 ml-2 border-primary text-primary`
            : ""
        }
           key={index} ></NavLink> */}
      <List className='flex flex-col items-center gap-2'>
        {loadMenu.map((item, index) => 
          <NavLink  to={item.pageLink} key={index} className={({isActive})=>`${isActive ? setHighlightIndex(index) : ''} ${index===highlightIndex ? 'bg-black text-white font-bold rounded-lg':''}`}>
            <ListItemButton sx={{width:200}}>
              <ListItemIcon sx={{color:`${index===highlightIndex ? 'white' :''} `}} >
                {item.icon}
              </ListItemIcon>

              <h1 className='p-1'>{item.name}</h1>
            </ListItemButton>
          </NavLink>
        )}
          {authCtx.isLoggedIn &&
            <ListItemButton sx={{width:200}} onClick={()=>authCtx.logout()}>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
        }
      </List>
    </>
  )
}

export default LeftPane