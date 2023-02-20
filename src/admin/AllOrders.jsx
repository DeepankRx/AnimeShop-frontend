import React,{useEffect,useState} from 'react'
import { getAllOrdersOfAllUsers } from '../services/APIs'
const AllOrders = () => {
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        getAllOrdersOfAllUsers().then((res)=>{
            setOrders(res.data)
            console.log(res.data)
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

export default AllOrders