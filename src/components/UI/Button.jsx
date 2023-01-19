import React from 'react'

const Button = ({children,type}) => {
  return (
    <button type={type} className='w-[100%] bg-black text-white text-lg font-bold flex justify-center p-2 rounded-lg hover:cursor-pointer hover:bg-opacity-75'>{children}</button>
  )
}

export default Button