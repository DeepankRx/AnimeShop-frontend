import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets'
import { ALL_LINKS } from '../../constant'

const Collections = () => {
  const navigate=useNavigate()
  const Card=({className,title,image})=>{
    return(
      <div className={`h-[600px]  bg-red-200 ${className} relative mdrev:col-span-6 mdrev:h-[400px] `}>
        <img src={image} className='object-cover w-[100%] h-[100%]'/>
        <div className='absolute top-0 w-[100%] h-[100%] backdrop-brightness-[.60] hover:backdrop-brightness-[.50]  text-white flex justify-center items-center flex-col gap-4'>
          <h2 className='text-4xl font-bold uppercase px-8'>{title}</h2>
          <button onClick={()=>navigate(ALL_LINKS.Category.pageLink)} className='w-28 bg-white text-black h-12'>SHOP ALL</button>
        </div>
      </div>
    )
}
  return (
    <div className='p-8  grid grid-cols-6 gap-8 mdrev:p-4'>
      <Card className='col-span-2' title='T-SHIRT' image={assets.collections.shirt} />
      <Card className='col-span-2' title='T-SHIRT' image={assets.collections.shirt} />
      <Card className='col-span-2' title='T-SHIRT' image={assets.collections.shirt} />
      <Card className='col-span-3' title='accessories' image={assets.collections.accessories} />
      <Card className='col-span-3' title='accessories' image={assets.collections.accessories} />

    </div>
  )
}

export default Collections