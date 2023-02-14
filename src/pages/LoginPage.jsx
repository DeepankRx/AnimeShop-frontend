import { Formik ,Form} from 'formik'
import React, { useContext, useEffect ,useState} from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { assets } from '../assets'
import Button from '../components/UI/Button'
import InputField from '../components/UI/InputField'
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  const location=useLocation()
  const authCtx=useContext(AuthContext);
  const initialValues={
    email:'',
    password:''
  }
useEffect(() => {
    if(authCtx.isLoggedIn)navigate(ALL_LINKS.HomePage.pageLink)
    }, []);
  
  const queryParameters=new URLSearchParams(location.search);
  
  const onSubmit=(values)=>{
    login(values)
    .then((res)=>{
      const data=res.data.data;
      authCtx.login(data.token,data.id,data.role);
      getUserProfile(data.id)
      .then(res=>{
        console.log(res.data.data)
        dispatch(userActions.setUserDetails(res.data.data))
      })
      .catch(err=>console.log(err));
      toast.success('Login Successful');
      if(queryParameters.get('redirect')===null){
        navigate(ALL_LINKS.HomePage.pageLink);
      }
      else{
        navigate(+queryParameters.get('redirect'))
      }
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
    })
  }

  console.log(queryParameters);
  const validateSchema=Yup.object({
    email:Yup.string().required('Required'),
    password:Yup.string().required('Required'),

  })
  return (
    <div className='lg:flex h-[calc(100vh_-_73px)]'>
    <div className='w-[50%] lgrev:hidden bg-gradient-to-tr from-[#FCEE21] to-[#009245]'>
      <img src={assets.online_shop} className='w-[100%] h-[100%] object-contain'/>
    </div>
    <div className={`lg:w-[50%] flex flex-col items-center justify-center h-[100%] `}>
        <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
        <Form className=' bg-white w-[80%] p-8 shadow-lg  rounded-lg flex flex-col gap-4 items-center smrev:w-[90%]'>
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
    </div>
  )
}

export default LoginPage
