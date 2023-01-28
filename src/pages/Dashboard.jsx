import { Box } from '@mui/system'
import React from 'react'
import { assets } from '../assets'
import LeftPane from '../components/menu/LeftPane'
import SellerDashboard from '../seller/SellerDashboard'

const Dashboard = () => {
  const BoxWrapper=({children,className})=>{
    return(
      <div className={`col-span-1 border-2 flex border-slate-300 p-2 rounded-lg hover:cursor-pointer  ${className}`}>
        {children}
      </div>
    )
  }

  const TopSeller=()=>{
    return(
      <div className='flex justify-between items-center bg-yellow-500 p-2 rounded-xl'>
      <div className='w-12 h-12 overflow-hidden rounded-full'><img src={assets.person}/></div>
      <h2>Deepank Pushpad</h2>
      <h2>@deepika</h2>
      <h2>$200</h2>
    </div>
    )
  }

  const StatBox=()=>{
    return(
      <div className='w-20 divide-y-2 divide-black flexflex-col items-center'>
      <h1>Sales</h1>
      <h1 className='font-semibold text-2xl'>200K</h1>
    </div>
    )
  }
  return (
    <div className='flex flex-col'>
    <div className=' bg-lightbrown flex '>

    <div className='w-[300px]  h-[100%] smrev:hidden'> 
      <LeftPane/>
     </div>

      <div className='bg-lightbrown w-[100%] rounded-r-[40px] h-[100%] px-10 py-8 flex lgrev:flex-col mdrev:p-4'>
        <div className='w-[60%] lgrev:w-[100%] '>
        <h1 className='text-4xl font-bold'>Dashboard</h1>
        <h1 className='text-xl font-bold'>Hello , Sara</h1>
      <div className='grid grid-cols-4 gap-4 my-8  mdrev:grid-cols-2'>
        <StatBox/>
        <StatBox/>
        <StatBox/>
        <StatBox/>
      </div>


<div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg" src={assets.bg_01} alt="" />
    <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</div>

      </div>

      <div className='w-[40%]  p-4 space-y-4 lgrev:w-[100%]'>
        <div className='rounded-lg h-[200px] border-2 border-black'></div>

        <h1 className='text-2xl'>Top Sellers</h1>
        <div className='flex flex-col gap-4'>
          <TopSeller/>
          <TopSeller/>
          <TopSeller/>
          <TopSeller/>
        </div>

      </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard