import React,{useState,useEffect} from 'react'
import { getAllCarts } from '../services/APIs'
const AllCarts = () => {
  const [carts,setCarts]=useState([])
  useEffect(()=>{
    getAllCarts().then((res)=>{
      setCarts(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <div className="flex flex-col  bg-white w-[100%] rounded-2xl p-4 smrev:p-2 ">
    <div className="overflow-y-auto ">

    </div>
    </div>
  )
}

export default AllCarts