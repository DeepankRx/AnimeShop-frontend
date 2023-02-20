import { Box } from '@mui/system'
import React from 'react'
import { assets } from '../assets'
import LeftPane from '../components/menu/LeftPane'
import SellerDashboard from '../seller/SellerDashboard'
import AdminDashboard from '../admin/AdminDashboard'

const Dashboard = () => {
  return (
    <div className='flex flex-col h-[calc(100vh_-_110px)] bg-background '>
      {/* <SellerDashboard/> */}
      <AdminDashboard/>
    </div>
  )
}

export default Dashboard