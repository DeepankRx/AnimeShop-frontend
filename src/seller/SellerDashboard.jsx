import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import  InventoryIcon from '@mui/icons-material/Inventory';

const SellerDashboard = () => {

  const BoxWrapper=({children,className})=>{
    return(
      <div className={`col-span-1 border-2 flex border-slate-300 p-2 rounded-lg hover:cursor-pointer  ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div className='w-[90%] mx-auto  px-20 py-8  lgrev:w-[100%]  lgrev:p-4 '>
      <h1 className='text-3xl font-bold'>Your Account</h1>
      <h1 className='text-lg'>Hello Himanshu Chauhan</h1>
      <div className='grid grid-cols-3 gap-4 my-8 mdrev:grid-cols-1'>
        <BoxWrapper className='h-[120px]  border-pink-500  hover:bg-pink-100'>
          <div className='flex items-center'>
          <div className='mr-4'>
          <InventoryIcon sx={{fontSize:60}}  />
          </div>
          <div className=''>
            <h1 className='text-xl font-semibold'>Your Products</h1>
            <h1 className='text-base'>Add , Delete , Update Products</h1>
          </div>
          </div>
        </BoxWrapper>
        <BoxWrapper className='h-[120px] border-green-500 hover:bg-green-100'/>
        <BoxWrapper className='h-[120px] border-yellow-500 hover:bg-yellow-100'/>
        <BoxWrapper className='h-[120px] border-red-500 hover:bg-red-100'/>
        <BoxWrapper className='h-[120px] border-blue-500 hover:bg-blue-100'/>
        <BoxWrapper className='h-[120px] border-teal-500 hover:bg-teal-100'/>
      </div>

      <div className='border-[1px] border-black'/>

      <div className='grid grid-cols-3 gap-4 my-8 mdrev:grid-cols-1'>
        <BoxWrapper className='h-[300px]'/>
        <BoxWrapper className='h-[300px]'/>
        <BoxWrapper className='h-[300px]'/>
        <BoxWrapper className='h-[300px]'/>
        <BoxWrapper className='h-[300px]'/>
        <BoxWrapper className='h-[300px]'/>
      </div>
    </div>
  )
}

export default SellerDashboard