import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets'
import { ALL_LINKS } from '../../constant';

const ShopByAnime = () => {
    const navigate=useNavigate();
    const Card=({title,image})=>{
        return(
            <button onClick={()=>navigate(ALL_LINKS.Category.pageLink)}>
            <div className='cursor-pointer hover:scale-110 duration-500 space-y-2 flex flex-col items-center'>
            <div className='w-32 h-32'>
            <img className='rounded-full bg-white' src={image}/>
            </div>
            <h2 className='text-center text-lg font-bold text-white'>{title}</h2>
            </div>
            </button>
        )
    }
  return (
    <div className='px-20 py-40 bg-gradient-to-br from-[#FBB03B]  to-[#D4145A] flex justify-center mdrev:px-8 mdrev:py-12'>
        <div className='grid grid-cols-5 gap-10 mdrev:grid-cols-2'>
            <Card title='Attack On Titan' image={assets.anime_cat.attack_on_titan}/>
            <Card title='Black Clover' image={assets.anime_cat.black_clover}/>
            <Card title='Chainsaw man' image={assets.anime_cat.chainsaw_man}/>
            <Card title='Dragon Ball Z' image={assets.anime_cat.dragon_ball_z}/>
            <Card title='Death Note' image={assets.anime_cat.death_note}/>
            <Card title='Haikyuu' image={assets.anime_cat.haikyuu}/>
            <Card title='Hunter X Hunter' image={assets.anime_cat.hunter_x_hunter}/>
            <Card title="Jojo's Bizzare" image={assets.anime_cat.jojos_bizzare}/>
            <Card title='Hero Acedmia' image={assets.anime_cat.my_hero_academia}/>
            <Card title='Naruto' image={assets.anime_cat.naruto}/>
        </div>
    </div>
  )
}

export default ShopByAnime