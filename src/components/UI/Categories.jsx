import React from 'react'
import { assets } from '../../assets'
import styles from '../../styles/css/backgrounds.module.css'
const Categories = () => {
    const CategoryBox=()=>{
        return (
            <div className='space-y-2 text-xl'>
            <div className='w-[240px] h-[240px] rounded-full bg-white hover:translate-y-[-8px] transition-all ease-in duration-200 hover:bg-white shadow-lg cursor-pointer flex justify-center items-center'>
                <img src={assets.dummy} className='w-[60%] h-auto hover:scale-125 ease-linear duration-200'/>
            </div>
            <div className='text-center font-semibold'>Fashion</div>
            </div>
        )
    }
  return (
    <div className={`py-20 px-28 flex flex-col gap-4 smrev:px-4 `}>
        <div className='text-3xl'>Popular Picks</div>
        <div className='flex gap-8 flex-wrap justify-center'>
            <CategoryBox/>
            <CategoryBox/>
            <CategoryBox/>
            <CategoryBox/>
            <CategoryBox/>
            <CategoryBox/>
            <CategoryBox/>
            <CategoryBox/>
            <CategoryBox/>
            <CategoryBox/>
        </div>
    </div>
  )
}

export default Categories