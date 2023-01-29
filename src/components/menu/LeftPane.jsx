import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { ALL_LINKS } from '../../constant';
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import HomeIcon  from "@mui/icons-material/Home";
import LogoutIcon  from "@mui/icons-material/Logout";
import DashboardIcon  from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useSelector } from 'react-redux';
import { assets } from '../../assets';
import { useState } from 'react';
const LeftPane = () => {
    const authCtx=useContext(AuthContext);
    const user=useSelector(state=>state.user.user)
    const [highlightIndex,setHighlightIndex]=useState(-1);

    const menu=[
        {
          name:'Home',
          pageLink:ALL_LINKS.HomePage.pageLink,
          icon:<HomeIcon/>,
          showAlways:true
        },
        {
          name:'Signup',
          pageLink:ALL_LINKS.SignupPage.pageLink,
          icon:<PersonIcon/>,
          showLoggedIn:false
        },
        {
          name:'Login',
          pageLink:ALL_LINKS.LoginPage.pageLink,
          icon:<LoginIcon/>,
          showLoggedIn:false
        },
        {
          name:'Dashboard',
          pageLink:ALL_LINKS.Dashboard.pageLink,
          icon:<DashboardIcon/>,
          showAlways:false
        },
        {
          name:'MyProducts',
          pageLink:ALL_LINKS.SellerProducts.pageLink,
          icon:<ProductionQuantityLimitsIcon/>,
          showAlways:false
        },
      ]
  
    const showMenu={
        'logout':[menu[0],menu[1],menu[2]],
        'customer':[menu[3],menu[0],menu[4]],
      }
    
    
      let loadMenu=[];
      if(authCtx.isLoggedIn){
        loadMenu=showMenu[authCtx.role]
      }else{
        loadMenu=showMenu.logout;
      }

    return (
    
    <>
        {/* <div className=" p-2 flex justify-center  text-xl font-bold space-x-4 pt-4">
        <span className="text-red-500">Z</span>
        <span className="text-yellow-500">E</span>
        <span className="text-blue-500">R</span>
        <span className="text-green-500">O</span>
        <span className="text-orange-500">X</span>
      </div> */}
      {authCtx.isLoggedIn &&
      <div className='flex flex-col items-center my-8'>
        <div className='bg-green-100 w-28 h-28  rounded-full relative overflow-hidden shadow-lg'>
          <img src={assets.person} className='object-fit'/>
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
          <NavLink exact={true} to={item.pageLink} key={index} className={({isActive})=>`${isActive ? setHighlightIndex(index) : ''} ${index===highlightIndex ? 'bg-black text-white font-bold rounded-lg':''}`}>
            <ListItemButton sx={{width:200}}>
              <ListItemIcon sx={{color:`${index===highlightIndex ? 'white' :''} `}} >
                {item.icon}
              </ListItemIcon>

              <h1 className='p-1'>{item.name}</h1>
            </ListItemButton>
          </NavLink>
        )}
          {authCtx.isLoggedIn &&
            <ListItemButton sx={{width:200}}>
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