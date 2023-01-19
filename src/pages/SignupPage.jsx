import { Formik ,Form} from 'formik'
import React from 'react'
import { assets } from '../assets'
import Button from '../components/Button'
import InputField from '../components/InputField'
import * as Yup from 'yup';
const SignupPage = () => {
  const initialValues={
    firstName:'',
    lastName:'',
    email:'',
    username:'',
    password:'',

  }

  const onSubmit=(values)=>{
    console.log(values)
  }

  const validateSchema=Yup.object({
    firstName:Yup.string().required('Required'),
    lastName:Yup.string().required('Required'),
    email:Yup.string().email('Invalid Email Format').required('Required'),
    username:Yup.string().required('Required'),
    password:Yup.string().required('Required'),

  })
  return (
    <div className='flex flex-col items-center'>
        <div className='h-[600px] overflow-hidden'>
            <img src={assets.bg_01} />
        </div>
        <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
        <Form className='translate-y-[-300px] bg-white w-[600px] p-8 shadow-lg  rounded-lg flex flex-col items-center smrev:w-[90%]'>
            <div className='text-center text-2xl font-bold'>Signup</div>
            <div className='rounded-full w-[80px] h-[80px] shadow-lg'></div>
            <div className='w-[100%] space-y-4'>
            <InputField labelName='First Name' type='text' uni='firstName' placeholder='First Name' />
            <InputField labelName='Last  Name' type='text' uni='lastName' placeholder='Last Name' />
            <InputField labelName='Email' type='text' uni='email' placeholder='Email' />
            <InputField labelName='Username' type='text' uni='username' placeholder='Username' />
            <InputField labelName='Password' type='password' uni='password' placeholder='Password' />
            <Button type='submit'>Signup</Button>
            </div>
        </Form>
        </Formik>
    </div>
  )
}

export default SignupPage