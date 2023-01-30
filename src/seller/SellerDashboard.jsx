import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { assets } from '../assets'
import LeftPane from '../components/menu/LeftPane'
import { ALL_LINKS, SELLER_LINKS } from '../constant'
import DashboardIcon  from "@mui/icons-material/Dashboard";
import LogoutIcon  from "@mui/icons-material/Logout";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useSelector } from 'react-redux'
import { List, ListItemButton, ListItemIcon } from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../store/AuthContext'

export const SellerMenu=[
  {
    name:'Dashboard',
    pageLink:SELLER_LINKS.SellerDashboardDefault.pageLink,
    icon:<DashboardIcon/>,
    showAlways:false
  },
  {
    name:'My Products',
    pageLink:SELLER_LINKS.SellerProducts.pageLink,
    icon:<ProductionQuantityLimitsIcon/>,
    showAlways:false
  },
  {
    name:'Add Product',
    pageLink:SELLER_LINKS.AddProduct.pageLink,
    icon:<AddIcon/>,
    showAlways:false
  },
]
const SellerDashboard = () => {

  const user=useSelector(state=>state.user.user);
  const authCtx=useContext(AuthContext);

  const [highlightIndex,setHighlightIndex]=useState(-1)

  const PAGES=[
    SELLER_LINKS.SellerDashboardDefault,
    SELLER_LINKS.AddProduct,
    SELLER_LINKS.SellerProducts,
  ];





  return (
    <div className='flex flex-row h-[calc(100vh_-_110px)] mdrev:h-[200px] bg-background p-4 gap-4'>

    <div className='min-w-[300px]  h-[calc(100vh_-_142px)] mdrev:hidden bg-white rounded-2xl'> 
    <div className='flex flex-col items-center my-8'>
        <div className='bg-green-100 w-28 h-28  rounded-full relative overflow-hidden shadow-lg'>
          <img src={assets.person} className='object-fit'/>
        </div>
        <h1 className='font-bold  mt-4'>{`${user.firstName} ${user.lastName}`}</h1>
        <h1 className='font-semibold'>{`${user.mobileNo}`}</h1>
      </div>

      <List className='flex flex-col items-center gap-2'>
        {SellerMenu.map((item, index) => 
          <NavLink  to={item.pageLink} key={index} className={({isActive})=>`${isActive ? setHighlightIndex(index) : ''} ${index===highlightIndex ? 'bg-black text-white font-bold rounded-lg':''}`}>
            <ListItemButton sx={{width:200}}>
              <ListItemIcon sx={{color:`${index===highlightIndex ? 'white' :''} `}} >
                {item.icon}
              </ListItemIcon>

              <h1 className='p-1'>{item.name}</h1>
            </ListItemButton>
          </NavLink>
        )}

            <ListItemButton sx={{width:200}} onClick={()=>authCtx.logout()}>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <h1 className='p-1'>Logout</h1>
            </ListItemButton>

      </List>
     </div>
     
     <Routes>
     {PAGES.map((item,i)=>(
        <Route key={i} path={item.pageLink}  element={<item.view/>} />
     ))}
     </Routes>
    </div>
    // </div>
  )
}

export default SellerDashboard