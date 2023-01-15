import React from 'react'

const Button = ({children}) => {
  return (
    <div className='w-[100%] bg-black text-white text-lg font-bold flex justify-center p-2 rounded-lg hover:cursor-pointer hover:bg-opacity-75'>{children}</div>
  )
}

export default Button