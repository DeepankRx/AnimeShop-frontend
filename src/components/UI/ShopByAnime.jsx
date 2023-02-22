import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets'
import { ALL_LINKS } from '../../constant';

const ShopByAnime = () => {
    const navigate=useNavigate();
    const data = [
        {
            title: 'Attack On Titan',
            image: assets.anime_cat.attack_on_titan
        },
        {
            title: 'Black Clover',
            image: assets.anime_cat.black_clover
        },
        {
            title:'Chainsaw man',
            image:assets.anime_cat.chainsaw_man
        },
        {
            title:'Dragon Ball Z',
            image:assets.anime_cat.dragon_ball_z
        },
        {
            title:'Death Note',
            image:assets.anime_cat.death_note
        },
        {
            title:'Haikyuu',
            image:assets.anime_cat.haikyuu
        },
        {
            title:'Hunter X Hunter',
            image:assets.anime_cat.hunter_x_hunter
        },
        {
            title:"Jojo's Bizzare",
            image:assets.anime_cat.jojos_bizzare
        },
        {
            title:'Hero Acedmia',
            image:assets.anime_cat.my_hero_academia
        },
        {
            title:'Naruto',
            image:assets.anime_cat.naruto
        },
       ]

    const Card=({title,image})=>{
        return(
            <button onClick={()=>navigate(ALL_LINKS.Category.pageLink.slice(0,ALL_LINKS.Category.pageLink.length-9)+title.toLowerCase())
            }>
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
            {data.map((item,index)=>(
                <Card key={index} title={item.title} image={item.image}/>
            ))}
        </div>
    </div>
  )
}

export default ShopByAnime