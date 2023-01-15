import React from 'react'
import { assets } from '../assets'
import Button from '../components/Button'
import InputField from '../components/InputField'

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center'>
        <div className='h-[400px] overflow-hidden'>
            <img src={assets.bg_01} />
        </div>
        <div className='translate-y-[-200px] bg-white w-[600px] p-8 shadow-lg  rounded-lg flex flex-col items-center smrev:w-[90%]'>
            <div className='text-center text-2xl font-bold'>Login</div>
            <div className='rounded-full w-[80px] h-[80px] shadow-lg'></div>
            <div className='w-[100%] space-y-4'>
            <InputField labelName='Username'/>
            <InputField labelName='Password'/>
            <Button>Login</Button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage