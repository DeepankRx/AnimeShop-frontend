import { Button } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import {getAllUsers,changeRole} from '../services/APIs'
const AllUsers = () => {
    const [users,setUsers]=useState([])

    useEffect(()=>{
        getAllUsers().then((res)=>{
            setUsers(res.data.data)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    const handleRoleChange=(id,role)=>{
        if(role===''){
            toast.error('Please select a role')
            return
        }
        changeRole(id,role).then((res)=>{

            toast.success('Role Changed Successfully')
        })
        .catch((err)=>{
            console.log(err)
            toast.error(err.response.data.message)
        })
    }
    const Card = ({user}) => {
        const [role,setRole]=useState('')
       return(

              <div className=' border-2 border-gray-200 rounded-2xl
              flex  gap-4 justify-center items-center p-4
                mdrev:flex-col mdrev:gap-2 mdrev:justify-start mdrev:items-start

              '>
              <div className='flex flex-col gap-4'>
              <img src={user.profilePicture} alt="" className='w-20 h-20 rounded-full'/>
                <h2 className='text-2xl'>{user.firstName +' '+ user.lastName}</h2>
                <h2 className='text-2xl'>{user.email}</h2>
                <h2 className='text-2xl'>{user.role}</h2>
                </div>
                <select className='border-[1px] border-black rounded-md p-1'
                        value={role ? role : user.role}
                        onChange={(e)=>setRole(e.target.value)}
                        >
                            <option value=''>Change Role</option>
                            <option value='admin'>Admin</option>
                            <option value='customer'>Customer</option>
                            <option value='seller'>Seller</option>
                        </select>
                        <Button
                        variant='contained'
                        color='primary'
                        onClick={()=>{
                            handleRoleChange(user._id,role)
                        }}
                        >Change Role</Button>

                </div>


         )
    }


    return (
        <div className="flex flex-col  bg-white w-[100%] rounded-2xl p-4 smrev:p-2 ">
        <div className="overflow-y-auto ">
        <h2 className='text-5xl mdrev:text-4xl md:p-4 md:gap-10' id='Monton'>All Users</h2>
        <div className='flex flex-col gap-10'>
        {
            users.map((item,index)=>{
                return(
                    <Card key={index} user={item}/>
                )
            })
        }
        </div>
        </div>
        </div>
      )
}

export default AllUsers