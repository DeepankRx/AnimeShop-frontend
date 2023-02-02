import React from 'react'
import { assets } from '../assets'

const SellerDashboardDefault = () => {

    const BoxWrapper=({children,className})=>{
        return(
          <div className={`col-span-1 border-2 flex border-slate-300 p-2 rounded-lg hover:cursor-pointer  ${className}`}>
            {children}
          </div>
        )
      }
    
      const TopCustomer=()=>{
        return(
          <div className='flex justify-between items-center bg-yellow-500 p-2 rounded-xl shadow-lg'>
          <div className='w-12 h-12 overflow-hidden rounded-full'><img src={assets.person}/></div>
          <h2>Deepank Pushpad</h2>
          <h2>@deepika</h2>
          <h2>$200</h2>
        </div>
        )
      }

      const StatBox=()=>{
        return(
          <div className=' divide-y-2 divide-black flexflex-col items-center shadow-lg p-4 rounded-lg bg-gradient-to-r from-teal-50   to-white'>
          <h1>Sales</h1>
          <h1 className='font-semibold text-2xl'>200K</h1>
        </div>
        )
      }

  return (
    <div className='bg-background w-[100%] rounded-r-[40px] h-[100%]  flex lgrev:flex-col gap-4'>
    <div className='w-[60%] lgrev:w-[100%] rounded-2xl bg-white p-4 '>
    <h1 className='text-4xl font-bold'>SellerDashboard</h1>
    <h1 className='text-xl font-bold'>Hello , Sara</h1>
  <div className='grid grid-cols-4 gap-2 my-8  mdrev:grid-cols-2'>
    <StatBox/>
    <StatBox/>
    <StatBox/>
    <StatBox/>
  </div>



  </div>

  <div className='w-[40%]  p-4 space-y-4 lgrev:w-[100%] bg-white rounded-2xl '>
    <div className='rounded-lg h-[200px] shadow-lg'></div>

    <h1 className='text-2xl'>Top Customers</h1>
    <div className=''>
    <div className='flex flex-col gap-4 overflow-y-auto  '>
      <TopCustomer/>
      <TopCustomer/>

    </div>
    </div>

  </div>
  </div>
  )
}

export default SellerDashboardDefault