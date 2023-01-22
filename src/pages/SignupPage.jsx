import { Formik, Form } from 'formik';
import React from 'react';
import { assets } from '../assets';
import Button from '../components/UI/Button';
import InputField from '../components/UI/InputField';
import * as Yup from 'yup';
import { ALL_LINKS } from '../constant';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../services/APIs';
const SignupPage = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    password: '',
    repeatedPassword: '',
  };

  const onSubmit = (values) => {
    alert('SignupPage');
    register(values)
      .then((res) => {
        toast.success('Signup Successful');
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
    <div className="flex flex-col items-center">
      <div className="h-[400px] overflow-hidden">
        <img className="" src={assets.bg_01} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={onSubmit}
      >
        <Form
          className="translate-y-[-300px] smrev:translate-y-[-300px] bg-white w-[600px] p-8 shadow-lg  rounded-lg flex flex-col gap-2 smrev:w-[90%]"
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
  );
};

export default SignupPage;
