import React from 'react'

const Button = ({children,type,classname,onClick}) => {
  return (
    <div type={type} onClick={onClick} className={`w-[100%] bg-black text-white text-lg font-bold flex justify-center p-2 hover:cursor-pointer hover:bg-opacity-90 ${classname}`}>{children}</div>
  )
}

export default Button