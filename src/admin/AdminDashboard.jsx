import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { assets } from '../assets'
import LeftPane from '../components/menu/LeftPane'
import { ALL_LINKS, SELLER_LINKS,ADMIN_LINKS } from '../constant'
import DashboardIcon  from "@mui/icons-material/Dashboard";
import LogoutIcon  from "@mui/icons-material/Logout";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useSelector } from 'react-redux'
import { List, ListItemButton, ListItemIcon } from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../store/AuthContext'

export const AdminMenu=[
  {
    name:'Dashboard',
    pageLink:ADMIN_LINKS.AdminDashboardDefault.pageLink,
    icon:<DashboardIcon/>,
    showAlways:false
  },
  {
    name:'All Products',
    pageLink:ADMIN_LINKS.AllProducts.pageLink,
    icon:<ProductionQuantityLimitsIcon/>,
    showAlways:false
  },
  {
   name:'All Orders',
    pageLink:ADMIN_LINKS.AllOrders.pageLink,
    icon:<ProductionQuantityLimitsIcon/>,
    showAlways:false

  },
    {
    name:'All Users',
    pageLink:ADMIN_LINKS.AllUsers.pageLink,
    icon:<ProductionQuantityLimitsIcon/>,
    showAlways:false
    },
    {
        name:'All Carts',
        pageLink:ADMIN_LINKS.AllCarts.pageLink,
        icon:<ProductionQuantityLimitsIcon/>,
        showAlways:false
    },
    {
        name:'All Order History',
        pageLink:ADMIN_LINKS.AllOrderHistory.pageLink,
        icon:<ProductionQuantityLimitsIcon/>,
        showAlways:false
    },
    {
      name:'All Wishlist',
      pageLink:ADMIN_LINKS.AllWishlist.pageLink,
      icon:<ProductionQuantityLimitsIcon/>,
      showAlways:false
    }
]
const AdminDashboard = () => {

  const user=useSelector(state=>state.user.user);
  const authCtx=useContext(AuthContext);
  const [highlightIndex,setHighlightIndex]=useState(-1)

  const PAGES=[
    ADMIN_LINKS.AdminDashboardDefault,
    ADMIN_LINKS.AllProducts,
    ADMIN_LINKS.AllOrders,
    ADMIN_LINKS.AllUsers,
    ADMIN_LINKS.AllCarts,
    ADMIN_LINKS.AllOrderHistory,
    ADMIN_LINKS.AllWishlist
  ];


  return (
    <div className='flex flex-row min-h-[calc(100vh_-_110px)] max-w-[100%] md:h-[calc(100vh_-_110px)]  bg-background p-4 gap-4'>

    <div className='min-w-[300px]  h-[calc(100vh_-_142px)] mdrev:hidden bg-white rounded-2xl overflow-y-auto'>
    <div className='flex flex-col items-center my-8'>
        <div className='bg-green-100 w-28 h-28  rounded-full relative overflow-hidden shadow-lg'>
          <img src={`${user.profilePicture}`} className='w-[100%] h-[100%] object-cover'/>
        </div>
        <h1 className='font-bold  mt-4'>{`${user.firstName} ${user.lastName}`}</h1>
        {user.mobileNo && <h1 className='font-semibold'>{`${user.mobileNo}`}</h1>}
      </div>

      <List className='flex flex-col items-center gap-2'>
        {AdminMenu.map((item, index) =>
          <NavLink  to={item.pageLink} key={index} className={({isActive})=>`${isActive ? setHighlightIndex(index) : ''} ${index===highlightIndex ? 'bg-black text-white font-bold rounded-lg':''}`}>
            <ListItemButton sx={{width:240}}>
              <ListItemIcon sx={{color:`${index===highlightIndex ? 'white' :''} `}} >
                {item.icon}
              </ListItemIcon>

              <h1 className='p-1'>{item.name}</h1>
            </ListItemButton>
          </NavLink>
        )}

            <ListItemButton sx={{width:240}} onClick={()=>authCtx.logout()}>
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

export default AdminDashboard