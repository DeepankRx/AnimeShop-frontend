import { Formik ,Form} from 'formik'
import React from 'react'
import { assets } from '../assets'
import Button from '../components/UI/Button'
import InputField from '../components/UI/InputField'
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { ALL_LINKS } from '../constant'
import styles from '../styles/css/backgrounds.module.css'
const LoginPage = () => {
  const initialValues={
    username:'',
    password:''
  }

  const onSubmit=(values)=>{
    console.log(values)
  }

  const validateSchema=Yup.object({
    username:Yup.string().required('Required'),
    password:Yup.string().required('Required'),

  })
  return (
    <div className={`flex flex-col items-center`}>
        <div className='h-[400px] overflow-hidden'>
            <img src={assets.bg_01} />
        </div>
        <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
        <Form className='translate-y-[-200px] bg-white w-[600px] p-8 shadow-lg  rounded-lg flex flex-col items-center smrev:w-[90%]'>
            <div className='text-center text-2xl font-bold'>Login</div>
            <div className='w-[100%] space-y-4'>
            <InputField labelName='Username' type='text' uni='username' placeholder='Username' />
            <InputField labelName='Password' type='password' uni='password' placeholder='Password' />
            <div>Don't have an account ? <Link to={ALL_LINKS.SignupPage.pageLink} className='text-blue-500'>Signup</Link></div>
            <Button type='submit'>Login</Button>
            </div>
        </Form>
        </Formik>
    </div>
  )
}

export default LoginPage