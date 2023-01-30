import React from 'react'

const FormWrapper = ({children}) => {
  return (
    <div className='grid grid-cols-3 lgrev:grid-cols-1 gap-4'>{children}</div>
  )
}

export default FormWrapper