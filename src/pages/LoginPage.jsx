import { Formik ,Form} from 'formik'
import React, { useContext, useEffect ,useState} from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { assets } from '../assets'
import Button from '../components/UI/Button'
import InputField from '../components/UI/InputField'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import { ALL_LINKS } from '../constant'
import { toast } from 'react-toastify';
import { getUserProfile, login,loginWithGoogle } from '../services/APIs';
import AuthContext from '../store/AuthContext'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/userSlice'
import { faJarWheat } from '@fortawesome/free-solid-svg-icons';
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
 var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
   return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
 }).join(''));
 return JSON.parse(jsonPayload);
};
const LoginPage = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const authCtx=useContext(AuthContext);
  const initialValues={
    email:'',
    password:''
  }
useEffect(() => {
    if(authCtx.isLoggedIn)navigate(ALL_LINKS.HomePage.pageLink)
    }, [authCtx.isLoggedIn]);

  const onSubmit=(values)=>{
    login(values)
    .then((res)=>{
      const data=res.data.data;
      authCtx.login(data.token,data.id,'seller');
      getUserProfile(data.id)
      .then(res=>{
        console.log(res.data.data)
        dispatch(userActions.setUserDetails(res.data.data))
      })
      .catch(err=>console.log(err));
      navigate(ALL_LINKS.HomePage.pageLink);
      toast.success('Login Successful');
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
    })
  }

  const validateSchema=Yup.object({
    email:Yup.string().required('Required'),
    password:Yup.string().required('Required'),

  })
  return (
    <div className={`flex flex-col items-center`}>
        <div className='h-[400px] overflow-hidden'>
            <img src={assets.bg_01} />
        </div>
        <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
        <Form className='translate-y-[-200px] bg-white w-[600px] p-8 shadow-lg  rounded-lg flex flex-col gap-4 items-center smrev:w-[90%]'>
            <div className='text-center text-2xl font-bold'>Login</div>
            <div className='w-[100%] space-y-4'>
            <InputField labelName='Email' type='text' uni='email' placeholder='Email' />
            <InputField labelName='Password' type='password' uni='password' placeholder='Password' />
            <div>Don't have an account ? <Link to={ALL_LINKS.SignupPage.pageLink} className='text-blue-500'>Signup</Link></div>
            <Button type='submit' >Login</Button>
            </div>
            <div className='mt-4'>
            <GoogleLogin
            shape='rectangular'
            size='large'
            onSuccess={credentialResponse => {
            const { email,family_name,given_name,picture } = parseJwt(credentialResponse.credential);
            loginWithGoogle({email,family_name,given_name,picture})
            .then((res)=>{
            const data=res.data.data;
            console.log(data.id)
            authCtx.login(data.token,data.id,'seller');
            getUserProfile(data.id)
            .then(res=>{
            console.log(res.data.data)
            dispatch(userActions.setUserDetails(res.data.data))
            })
      .catch(err=>console.log(err));
      navigate(ALL_LINKS.HomePage.pageLink);
      toast.success('Login Successful');
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
    })
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
            />
            </div>
        </Form>
        </Formik>
    </div>
  )
}

export default LoginPage
