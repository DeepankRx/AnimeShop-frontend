import React, { useState } from 'react'
import Button from './Button'
import styles from '../../styles/css/backgrounds.module.css'
import  ArrowBackIcon from '@mui/icons-material/ArrowBack'
import  ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { assets } from '../../assets'
const HeroSection = () => {
    const heroData=[
        {
            image:assets.hero_1,
            no:0,
            text:{
                para1:'New From Zerox',
                para2:'Store',
                para3:'Decorative Merchandise will bring you to life.'
            }
        },
        {
            image:assets.hero_2,
            no:1,
            text:{
                para1:'Kharid le',
                para2:'Bsdk',
                para3:'Badiya maal hai gareeb nahi ho jayega.'
            }
        }
    ];

    const [currentHero,setCurrentHero]=useState(heroData[0]);
    
    const nextHero=()=>{
        setCurrentHero(heroData[(currentHero.no+1)%heroData.length]);
    }
  return (
    <div className='md:h-[600px] flex mdrev:flex-col text-white relative'>
        <div className={` md:w-[40%] bg-purple-400 flex flex-col justify-center px-10 smrev:px-2 mdrev:h-[400px] gap-4 ${styles.bg_flash}`}>
            <div className='text-6xl font-semibold'>{currentHero.text.para1}</div>
            <div className='text-6xl font-semibold'>{currentHero.text.para2}</div>
            <div className='font-semibold text-lg'>{currentHero.text.para3}</div>
            <Button className='w-[160px] rounded-none bg-white text-black'>Buy Now</Button>
        </div>
        <div className='md:w-[60%] bg-slate-400 overflow-hidden'>
            <img src={currentHero.image} className='h-[100%] w-[100%]' />
        </div>
        <div className='absolute right-4 bottom-2 flex gap-1 translate-y-8'>
            <Button className='p-2 shadow-md rounded-full bg-white'><ArrowBackIcon sx={{color:'black'}}/></Button>
            <Button onClick={nextHero} className='p-2 shadow-md rounded-full bg-white'><ArrowForwardIcon sx={{color:'black'}}/></Button>
        </div>
    </div>
  )
}

export default HeroSection
