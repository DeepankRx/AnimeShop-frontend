import React from 'react'
import ProductCardSmall from '../components/cards/ProductCardSmall'
import ProductMediumCard from '../components/cards/ProductMediumCard'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import  FilterIcon  from '@mui/icons-material/Filter'
import DailyDeals from '../components/cards/DailyDeals'
import InputField from '../components/UI/InputField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/UI/Button'
const ProductsPage = () => {
  return (
    <div className='grid grid-cols-4 gap-4 m-4'>
        <div className='col-span-1  shadow-lg p-4 space-y-4'>
          {/* <div className='flex justify-center text-lg'>
            <FontAwesomeIcon icon={faFilter} size='xl' /> Filters
          </div>
          <InputField labelName='Category'/>
          <InputField labelName='Category'/>
          <InputField labelName='Category'/>
          <InputField labelName='Category'/>
          <Button>Submit</Button> */}
        </div>
        <div className='col-span-2 h-[200px] space-y-4'>
            <ProductMediumCard />
            <div className='flex gap-4 '>
                <ProductCardSmall/>
                <ProductCardSmall/>
                <ProductCardSmall/>
            </div>
        </div>
        <div className='col-span-1 h-[200px] space-y-4'>
          <div className='shadow-lg h-[200px] rounded-lg p-2 bg-gradient-to-tr from-green-400  to-blue-400 text-white'>
            <div className='text-xl font-semibold' >Summer Headphone</div>
            <div className='text-xl font-semibold' >Heavy Discount</div>
          </div>

          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
            <div className='text-2xl text-green-500 font-bold'>Daily Deals</div>
            <div className=''>View all <ArrowForwardIcon /></div>
            </div>
            <DailyDeals/>
            <DailyDeals/>
            <DailyDeals/>
            <DailyDeals/>
            <DailyDeals/>
            <DailyDeals/>
          </div>
        </div>
    </div>
  )
}

export default ProductsPage