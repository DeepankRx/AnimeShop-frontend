import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { assets } from '../assets'
import Categories from '../components/UI/Categories'
import HeroSection from '../components/UI/HeroSection'
import styles from '../styles/css/backgrounds.module.css'
import parallex from '../styles/css/parallex.module.css'
const HomePage = () => {
  const testimonial = [
    {
      tagline :'We offer a wide selection of anime merchandise from popular shows like Naruto, Dragon Ball, and Death Note.'
    },
    {
      tagline : 'Our merchandise is made with premium materials and designed to last for years. We also offer a wide selection of anime figures.'
    },
    {
      tagline : 'We offer competitive prices and excellent customer service to ensure our customers have the best shopping experience.'
    }
  ]
  const Testimonial=({tagline})=>{
    return (
      <div className=' flex justify-center flex-col py-4 px-10'>
        <FontAwesomeIcon icon={faTag} size='5x' className='text-secondary'/>
        <p className='text-lg font-semibold text-center'>{tagline}</p>
      </div>
    )
  }
  return (
    <>
    <HeroSection/>
    <Categories/>
    <div className={`grid grid-cols-3 mdrev:grid-cols-1 px-20 py-20  items-center smrev:p-6`}>
     {
        testimonial.map((item,i)=>{
          return (
            <Testimonial key={i} tagline={item.tagline}/>
          )
        })
     }
    </div>

    <div className='grid grid-cols-2 mdrev:grid-cols-1 px-20 py-8 mdrev:p-4 gap-4'>
      <div className='bg-gray-200 h-[240px] col-span-1'></div>
      <div className='bg-gray-200 h-[240px] col-span-1'></div>
    </div>

    <div className={`h-[400px]  bg-fixed bg-cover ${parallex.masked}`}>
    </div>
    <div className='px-28 py-8 smrev:px-4 flex flex-col gap-4 '>
    <div className='text-3xl'>Spring Sales</div>
    <div className=' grid grid-cols-3 smrev:grid-cols-1 gap-4 '>
      <div className='bg-purple-300 w-[300px] h-[350px] col-span-1 m-auto'></div>
      <div className='bg-purple-300 w-[300px] h-[350px] col-span-1 m-auto'></div>
      <div className='bg-purple-300 w-[300px] h-[350px] col-span-1 m-auto'></div>
    </div>

    </div>
    </>
  )
}

export default HomePage