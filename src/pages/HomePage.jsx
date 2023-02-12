import { faCrown, faHeadset, faRankingStar, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { assets } from '../assets'
import Categories from '../components/UI/Categories'
import Collections from '../components/UI/Collections'
import HeroSection from '../components/UI/HeroSection'
import ShopByAnime from '../components/UI/ShopByAnime'
import styles from '../styles/css/backgrounds.module.css'
import parallex from '../styles/css/parallex.module.css'
const HomePage = () => {
  const testimonial = [
    {
      icon:faRankingStar,
      tagline :'We offer a wide selection of anime merchandise for different seasons through out the year.'
    },
    {
      icon:faCrown,
      tagline : 'Our merchandise is made with premium materials and designed to last for years.'
    },
    {
      icon:faHeadset,
      tagline : 'We offer competitive prices and excellent customer service to ensure our customers have the best shopping experience.'
    }
  ]
  const Testimonial=({tagline,icon})=>{
    return (
      <div className='py-4 px-10 space-y-4 lgrev:px-4 flex flex-col items-center '>
        <FontAwesomeIcon icon={icon} size='5x' className='text-pink-600'/>
        <p className='text-lg  text-center'>{tagline}</p>
      </div>
    )
  }
  return (
    <>
    <HeroSection/>
    <Collections/>
    <div className={`${parallex.para3}  sm:bg-fixed bg-cover h-[600px]`}/>
    <ShopByAnime/>

    {/* <Categories/> */}
    <div className={`grid grid-cols-3 mdrev:grid-cols-1 px-20 py-20   smrev:p-6`}>
     {
        testimonial.map((item,i)=>{
          return (
            <Testimonial key={i} icon={item.icon} tagline={item.tagline}/>
          )
        })
     }
    </div>


    <div className={`relative h-[400px] sm:bg-fixed bg-cover ${parallex.para2}`}>
      <div className='absolute w-[100%] h-[100%] flex justify-center items-center'>
        <div className='w-[600px]  bg-white mdrev:w-[90%] p-8 space-y-4 '>
          <h2 className='text-xl uppercase mb-4'>Subscribe to our Newsletter</h2>
          <div>
          <p>Promotions products ,discounts and sales</p>
          <p> Directly to your inbox!</p>
          </div>
          <div className='flex gap-2'>
          <input placeholder='alexjersey@gmail.com' type='text' className='w-[100%] bg-blue-100 p-4 mdrev:p-2 ' />
          <button className='uppercase bg-black text-white p-2'>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default HomePage