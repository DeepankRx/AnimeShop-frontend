import React from 'react'
import { assets } from '../assets'

const SizingGuide = () => {
  return (
    <div className='bg-[#f9f9f9]'>
        <div className='text-4xl font-bold text-center p-4'>Find My Size</div>
        <div className='flex p-8 mdrev:flex-col mdrev:p-4'>
            <div className=''>
            <img src={assets.size_guide} alt="Size Guide"/>
            </div>
            <div>
            <img className='w-[80%] mdrev:w-[100%]' src={assets.size_dummy_01} alt="Size Dummy"/>
            </div>
        </div>
            <div className='p-4 bg-white'>
                <img src={assets.size_dummy_02} alt='Size Dummy 2'/>
            </div>
    </div>
  )
}

export default SizingGuide