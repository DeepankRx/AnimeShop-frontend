import { Formik, Form } from 'formik';
import React, { useContext } from 'react';
import { assets } from '../assets';
import Button from '../components/UI/Button';
import InputField from '../components/UI/InputField';
import * as Yup from 'yup';
import { ALL_LINKS } from '../constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../services/APIs';
import AuthContext from '../store/AuthContext';
import { useEffect } from 'react';
const SignupPage = () => {
  
  const navigate=useNavigate();
  const authCtx=useContext(AuthContext);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: '',
    repeatedPassword: '',
  };

  useEffect(() => {
    if(authCtx.isLoggedIn)navigate(ALL_LINKS.HomePage.pageLink)
    }, [authCtx.isLoggedIn]);

  const onSubmit = (values,{resetForm}) => {
    register(values)
      .then((res) => {
        toast.success('Signup Successful');
        resetForm();
        navigate(ALL_LINKS.LoginPage.pageLink);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const validateSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid Email Format').required('Required'),
    mobileNo: Yup.string().required('Required').max(10),
    password: Yup.string().required('Required'),
    repeatedPassword: Yup.string().required('Required'),
  });
  return (
    <div className='lg:flex h-[calc(100vh_-_73px)]'>
    <div className='w-[50%] lgrev:hidden bg-gradient-to-tr from-[#FCEE21] to-[#009245]'>
      <img src={assets.online_shop} className='w-[100%] h-[100%] object-contain'/>
    </div>
    <div className="lg:w-[50%] h-[100%] flex flex-col items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
      >
        <Form
          className=" bg-white w-[80%] p-8 shadow-lg  rounded-lg flex flex-col gap-2 smrev:w-[90%]"
        >
          <div className="text-center text-2xl font-bold">Signup</div>
          <div className="w-[100%] gap-4 grid grid-cols-2">
            <InputField
              className="col-span-1 smrev:col-span-2"
              labelName="First Name"
              type="text"
              uni="firstName"
              placeholder="First Name"
            />
            <InputField
              className="col-span-1 smrev:col-span-2"
              labelName="Last  Name"
              type="text"
              uni="lastName"
              placeholder="Last Name"
            />
            <InputField
              className="col-span-2"
              labelName="Email"
              type="text"
              uni="email"
              placeholder="Email"
            />
            <InputField
              className="col-span-2"
              labelName="Mobile No"
              type="text"
              uni="mobileNo"
              placeholder="Mobile No"
            />
            <InputField
              className="col-span-1 smrev:col-span-2"
              labelName="Password"
              type="password"
              uni="password"
              placeholder="Password"
            />
            <InputField
              className="col-span-1 smrev:col-span-2"
              labelName="Confirm Password"
              type="password"
              uni="repeatedPassword"
              placeholder="Password"
            />
          </div>
          <div>
            Already have an account ?{' '}
            <Link to={ALL_LINKS.LoginPage.pageLink} className="text-blue-500">
              Login
            </Link>
          </div>
          <Button type="submit">Signup</Button>
        </Form>
      </Formik>
    </div>
    </div>
  );
};

export default SignupPage;
