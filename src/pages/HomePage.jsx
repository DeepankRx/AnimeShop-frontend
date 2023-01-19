import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Categories from '../components/UI/Categories'
import HeroSection from '../components/UI/HeroSection'
import styles from '../styles/css/backgrounds.module.css'
const HomePage = () => {
  const Testimonial=()=>{
    return (
      <div className=' flex justify-center flex-col py-4 px-10'>
        <FontAwesomeIcon icon={faTag} size='5x' className='text-secondary'/>
        <p className='text-lg font-semibold text-center'>Lorem ipsum dolor sit amet consectetur adipis elit. Placeat, optio!</p>
      </div>
    )
  }
  return (
    <>
    <HeroSection/>
    <Categories/>
    <div className={`grid grid-cols-3 mdrev:grid-cols-1 px-20 py-20  items-center smrev:p-6`}>
      <Testimonial/>
      <Testimonial/>
      <Testimonial/>
    </div>
    </>
  )
}

export default HomePage