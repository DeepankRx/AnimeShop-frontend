import React from 'react'

const DailyDeals = () => {
  return (
    <div className='shadow-lg p-2 h-[100px] flex justify-between space-x-2 items-center rounded-lg hover:cursor-pointer'>
        <div className='rounded-full shadow-md h-[80px] w-[80px]'></div>
        <div className='flex-1'>
            <div className='font-semibold'>beats new studio blue headset</div>
            <div>256 reviews | 1628 orders</div>
        </div>
        <div>$320</div>
    </div>
  )
}

export default DailyDeals