import React, { useEffect, useState } from 'react'
import Button from './Button'
import styles from '../../styles/css/backgrounds.module.css'
import  ArrowBackIcon from '@mui/icons-material/ArrowBack'
import  ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { assets } from '../../assets'
const HeroSection = () => {
    const heroData=[
        {
            image:assets.anime_bg_1,
            no:0,
            text:{
                para1:'New From ',
                para2:'ANIMART',
                para3:'Decorative Merchandise will bring you to life.'
            },
            order:'flex-row-reverse'
        },
        {
            image:assets.anime_bg_2,
            no:1,
            text:{
                para1:'Trending Latest ',
                para2:'Merchandise',
                para3:'50% off on your first purchase. .'
            },
            order:''
        }
    ];

    const [currentHero,setCurrentHero]=useState(heroData[0]);
    const [currentIndex,setCurrentIndex]=useState(0);
    
    const nextHeroHandler=()=>{
        setCurrentHero(heroData[(currentHero.no+1)%heroData.length]);
    }

    const prevHeroHandler=()=>{
        let no=(currentHero.no-1);
        if(no<0)no=heroData.length-1;
        setCurrentHero(heroData[no]);
    }

    useEffect(()=>{
        const timer= setInterval(()=>{
            const no=(currentHero.no+1)%heroData.length;
            setCurrentHero(heroData[no]);
        },2000)
        return()=>{clearInterval(timer);}
    },[currentHero])


  return (
    <div className={`md:h-[720px] flex  mdrev:flex-col text-white relative ${currentHero.order}`}>
        <div className={` md:w-[50%] bg-gradient-to-tl from-[#1BFFFF] to-[#2E3192]  flex flex-col justify-center px-10 smrev:px-2 mdrev:h-[400px] gap-4 `}>
            <div className='text-7xl font-semibold mdrev:text-5xl' id='Monton'>{currentHero.text.para1}</div>
            <div className='text-7xl font-semibold mdrev:text-5xl' id='RubyVinyl'>{currentHero.text.para2}</div>
            <div className='font-semibold text-xl mdrev:text-lg' id='Poppins'>{currentHero.text.para3}</div>
            <Button classname='bg-[#fff] w-[160px] text-[#000]'>Buy now</Button>
        </div>
        <div className='md:w-[60%] bg-slate-400 overflow-hidden'>
            <img src={currentHero.image} className='h-[100%] object-cover w-[100%]' />
        </div>
        <div className='absolute right-8 bottom-3 flex gap-1 translate-y-8'>
            <Button onClick={prevHeroHandler} classname='p-2 shadow-md rounded-full bg-[#fff]'><ArrowBackIcon sx={{color:'black'}}/></Button>
            <Button onClick={nextHeroHandler} classname='p-2 shadow-md rounded-full bg-[#fff]'><ArrowForwardIcon sx={{color:'black'}}/></Button>
        </div>
    </div>
  )
}

export default HeroSection
