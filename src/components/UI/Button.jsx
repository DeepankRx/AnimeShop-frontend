import React from 'react'

const Button = ({children,type,className,onClick}) => {
  return (
    <button type={type} onClick={onClick} className={`w-[100%] bg-white text-black text-lg font-bold flex justify-center p-2 hover:cursor-pointer hover:bg-opacity-90 ${className}`}>{children}</button>
  )
}

export default Button