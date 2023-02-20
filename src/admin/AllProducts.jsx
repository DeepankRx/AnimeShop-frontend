import React,{useEffect,useState} from 'react'
import { getProducts } from '../services/APIs'
const AllProducts = () => {
    const [products,setProducts]=useState([])
    useEffect(()=>{
        getProducts().then((res)=>{
            setProducts(res.data)
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

export default AllProducts