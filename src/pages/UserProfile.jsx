import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, IconButton } from '@mui/material'
import { Container } from '@mui/system'
import { Field, FieldArray, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { assets } from '../assets'
import InputField from '../components/UI/InputField'
import FormWrapper from '../seller/FormWrapper'
import * as Yup from 'yup'
import Gap from '../components/UI/Gap'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
const UserProfile = () => {

    const [image,setImage]=useState(null);
    const [preview,setPreview]=useState(null);
    const [isEditing,setIsEditing]=useState(false);

    const contactInitialValues={
        firstName:'',
        lastName:'',
        email:'',
        mobileNo:'',
    }

    const addressInitialValues={
      address:[{
        customerName:'',
        addressLine1:'',
        addressLine2:'',
        landmark:'',
        pinCode:'',
        city:'',
        state:'',
        mobileNo:'',
      }]
    }



    const contactValidationSchema=Yup.object({
      firstName:Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid Email Format').required('Required'),
      mobileNo: Yup.string().required('Required').max(10),
    })

    const addressValidationSchema=Yup.object({
      address:Yup.array().of(
        Yup.object({
          customerName:Yup.string().required('Required'),
          addressLine1:Yup.string().required('Required'),
          addressLine2:Yup.string().required('Required'),
          landmark:Yup.string().required('Required'),
          pinCode:Yup.number().required('Required'),
          city:Yup.string().required('Required'),
          state:Yup.string().required('Required'),
          mobileNo:Yup.number().required('Required').max(10),
        })
      )
    })

    const contactSubmitHandler=(values)=>{
        console.log(values);

    }

    const addressSubmitHandler=(values)=>{
      console.log(values)
    }

    useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
  }, [image]);
  
  return (
    <div>
        <div className="text-4xl    h-[320px] overflow-hidden bg-[#2f015c] mdrev:h-[160px] relative">
        <img src={assets.art_02} className='w-[200%] h-[200%]  object-contain' />
        <div className='absolute top-0 flex flex-col justify-center items-center h-[100%]  text-white w-[100%] '>
        <h1 className='text-6xl font-bold mdrev:text-3xl' id='Monton' >User Profile</h1>
        <h1 className='text-3xl font-bold text-center mdrev:text-xl' ></h1>
        </div>
        </div>

        <Container>
        <div className='flex justify-between translate-y-[-40px] text-black'>
        <div className='flex'>
          <div className="relative w-[150px] h-[150px]">
            <div className="w-[150px] h-[150px] bg-white   overflow-hidden rounded-full flex-none shadow-xl ">
              <img
                src={preview}
                className='w-[100%] h-[100%] rounded-full p-1'
              />
            <div className="absolute right-0 bottom-8">
              <label htmlFor="profile_pic">
                <FontAwesomeIcon
                  className="text-2xl text-tertiary text-blue-800"
                  icon={faEdit}
                ></FontAwesomeIcon>
              </label>
              <input
                id="profile_pic"
                hidden
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/png, image/jpeg"
              ></input>
            </div>
            </div>
          </div>

          <div className='flex flex-col justify-center ml-4 smrev:justify-end smrev:pb-4'>
          <h2  className=' text-2xl font-bold'>Himanshu Chauhan</h2>
          <h2 className=' text-sm font-bold'>@theeastwindz0</h2>

          </div>
        </div>
        </div>

        <div className='flex flex-col'>
          <div className='self-end'>
            <Button onClick={()=>setIsEditing(!isEditing)} variant='contained' endIcon={ !isEditing ? <EditIcon/> : <CancelIcon/>}>{!isEditing ? 'Edit' :'Cancel'}</Button>
          </div>
            <Formik initialValues={contactInitialValues}  onSubmit={contactSubmitHandler} validationSchema={contactValidationSchema}>
                <Form className='flex flex-col'>
                  <Gap>Contact Details</Gap>
                    <FormWrapper>
                      <InputField  uni='firstName' placeholder="Alex" labelName='First Name' disabled={!isEditing}/>
                      <InputField uni='lastName' placeholder="Jersey" labelName='Last Name' disabled={!isEditing}/>
                      <InputField uni='mobileNo' placeholder="9876097261" labelName='Mobile No' disabled={!isEditing}/>
                      
                    </FormWrapper>

                      <FormWrapper>
                      <InputField className='col-span-2' uni='email' placeholder="alexjersey@gmail.com" labelName='Email' disabled={!isEditing}/>
                      </FormWrapper>

                    <div className='flex justify-end my-4 mr-0'>
                    {isEditing && <Button type='submit' variant='contained'>Save</Button>}
                    </div>
                </Form>
            </Formik>

            <Formik initialValues={addressInitialValues} onSubmit={addressSubmitHandler} validationSchema={addressValidationSchema}>
              <Form className='flex flex-col'>
                  <FieldArray name='address'>
                    {fielArrayProps=>{
                      const address=fielArrayProps.form.values.address;
                      const {push,remove}=fielArrayProps;
                      
                      return(
                        <>
                        {address.map((item,i)=>
                        <div key={i} className='flex flex-col '>
                        <Gap>Address {i+1} Details</Gap>
                        <div  className='self-end'>
                        {i>0 && <Button onClick={()=>remove(i)} color='error' variant='contained' endIcon={<DeleteIcon/>}>Delete</Button>}
                        </div>
                        <FormWrapper>
                        <InputField placeholder='Alex Jersey' uni={`address.${i}.customerName`} labelName='Customer Name' disabled={!isEditing}/>
                        <InputField placeholder='9876543210' uni={`address.${i}.mobileNo`} labelName='Customer Mobile No' disabled={!isEditing}/>
                        </FormWrapper>
                        
                        <FormWrapper>
                        <InputField className='col-span-2' placeholder='Alex Jersey' uni={`address.${i}.addressLine1`} labelName='Address Line 1' disabled={!isEditing}/>
                        <InputField className='col-span-2' placeholder='Alex Jersey' uni={`address.${i}.addressLine2`} labelName='Address Line 2' disabled={!isEditing}/>
                        <InputField className='col-span-2' placeholder='Alex Jersey' uni={`address.${i}.landmark`} labelName='Landmark' disabled={!isEditing}/>
                        </FormWrapper>

                        <FormWrapper>
                        <InputField placeholder='240991' uni={`address.${i}.pinCode`} labelName='Pincode' disabled={!isEditing}/>
                        <InputField placeholder='Bangalore' uni={`address.${i}.city`} labelName='City' disabled={!isEditing}/>
                        <InputField placeholder='Karnataka' uni={`address.${i}.state`} labelName='State' disabled={!isEditing}/>
                        </FormWrapper>

                        </div>
                    )}
                          <div className='col-span-full'>
                          {isEditing && <Button className='' onClick={()=>push('')} variant='contained'>Add Address</Button>}
                          </div>
                        </>
                      )}}
                  </FieldArray>
                        <div className='self-end my-4'>
                        {isEditing && <Button type='submit' variant='contained'>Save</Button>}
                        </div>
              </Form>
            </Formik>

            <div className='pb-20'/>
        </div>
        </Container>
    </div>
  )
}

export default UserProfile