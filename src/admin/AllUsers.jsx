import React,{useState,useEffect} from 'react'
import {getAllUsers} from '../services/APIs'
const AllUsers = () => {
    const [users,setUsers]=useState([])
    useEffect(()=>{
        getAllUsers().then((res)=>{
            setUsers(res.data)
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

export default AllUsers