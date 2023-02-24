import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets'

const Footer = () => {
    const menu=[
        {
            title:'Home',
            link:'/'
        },
        {
            title:'Category',
            link:'/category'
        },
    ]
    const currentYear=new Date().getFullYear();
  return (
    <footer id='footer' className="absolute bottom-0 w-[100%]  p-4 bg-white   md:px-6 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center mb-4 sm:mb-0 gap-2 ">
            <img src={assets.art_01} className='w-16 h-16 rounded-full' alt='Logo'/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">Animart</span>
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-black sm:mb-0 ">
            {menu.map((item,i)=>
            <li key={i}>
                <Link to={item.link} className="mr-4 hover:underline md:mr-6 ">{item.title}</Link>
            </li>
            )}
        </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
    <span className="block text-sm text-gray-500 sm:text-center ">Copyright © {currentYear}<Link href="/" className="hover:underline"> Animart</Link>. All Rights Reserved.
    </span>
</footer>
  )
}

export default Footer