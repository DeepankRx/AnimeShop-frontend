import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import * as Yup from 'yup';
import { Formik,Form ,FieldArray} from 'formik';
import InputField from '../components/UI/InputField';
import FormWrapper from './FormWrapper';
import Gap from '../components/UI/Gap';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from "@mui/material";
import React from "react";

const AddProduct = () => {


  const initialValues={
    name:'',
    brand:'',
    category:'',
    subCategories:[''],
    description:[''],
    hashtags:[''],

    variations:[{size:'',countInStock:''}],
  }

  const onSubmit=(values)=>{
    console.log(values)

  }

  const validationSchema=Yup.object({
    name:Yup.string().required('Required'),
    category:Yup.string().required('Required'),
    subCategories:Yup.array(Yup.string().required('Required')),
    brand:Yup.string().required('Required'),
    variations:Yup.array().of(Yup.object({size:Yup.string().required('Required'),countInStock:Yup.number().required('Required').min(0,'Min value should be 0')})),
    description:Yup.array(Yup.string().required('Required')),
  })

  const [image,setImage]=useState([]);
  const [preview,setPreview]=useState([]);

  useEffect(()=>{
    if(image.length===0)return;
    const objectUrl=URL.createObjectURL(image[image.length-1]);
    setPreview([...preview,objectUrl]);
  },[image])

  const addImages=(e)=>{
    setImage([...image,e.target.files[0]])
  }

  return (
    <div className="flex flex-col  bg-white w-[100%] rounded-2xl p-4 smrev:p-2">
      <div className='overflow-y-auto '>
            <div className='mr-4 p-4 smrev:mr-0'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className='flex flex-col gap-4'>
                    <Gap>Basic Info</Gap>
                    <FormWrapper>
                    <InputField labelName='Product Name' uni='name' placeholder='Shirt' fieldRequired={true} />
                    <InputField labelName='Brand' uni='brand' placeholder='Zerox' fieldRequired={true} />
                    <InputField labelName='Category' uni='category' placeholder='Fashion' fieldRequired={true}/>

                    </FormWrapper>

                    <FormWrapper>
                    <FieldArray name='subCategories'>
                        {fieldArrayProps=>{
                          const {push,remove,form}=fieldArrayProps;
                          const {values}=form;
                          const {subCategories}=values;
                          return(
                          <>
                          {subCategories.map((item,index)=>(
                          <div className='col-span-1' key={index} >
                          <InputField  fieldRequired={true} labelName='Sub Category' uni={`subCategories.${index}`} placeholder='Men Shirt'/>
                          {index>0 && <IconButton onClick={()=>remove(index)}  sx={{position:'absolute',top:8,right:-12}}  aria-label="delete" size="small"><CancelIcon /></IconButton>}
                          </div>
                          ))}
                          <div className='w-[100%]'>
                            <Button className='' onClick={()=>push('')} variant='contained'>Add Sub Category</Button>
                          </div>
                          </>
                          )
                        }}
                      </FieldArray>
                    </FormWrapper>
                    {/* <InputField labelName='Category' uni='name' placeholder='Shirt' /> */}

                    <Gap>Variations</Gap>
                    <FormWrapper>
                    <FieldArray name='variations'>
                        {fieldArrayProps=>{
                            const {push,remove,form}=fieldArrayProps;
                            const {values}=form;
                            const {variations}=values;
                            return(
                                <>
                                {variations.map((item,index)=>(
                                    <div className='relative col-span-2  grid grid-cols-2 lgrev:grid-cols-1  gap-4' key={index} >
                                    <InputField fieldRequired={true} labelName='Size' uni={`variations.${index}.size`} placeholder='XL'/>
                                    <InputField fieldRequired={true} type='number' labelName='Quantity In Stock' min={0} uni={`variations.${index}.countInStock`} placeholder='99'/>
                                    {index>0 && <IconButton onClick={()=>remove(index)}  sx={{position:'absolute',top:8,right:-12}}  aria-label="delete" size="small"><CancelIcon /></IconButton>}
                                    </div>
                                ))}
                                <div className='w-[100%]'>
                                <Button className='' onClick={()=>push('')} variant='contained'>Add Variation</Button>
                                </div>
                                    
                                </>
                            )
                        }}
                    </FieldArray>
                    </FormWrapper>
                    
                    <Gap>Description</Gap>
                    <FormWrapper>
                      <FieldArray name='description'>
                        {fieldArrayProps=>{
                          const {push,remove,form}=fieldArrayProps;
                          const {values}=form;
                          const {description}=values;
                          return(
                          <>
                          {description.map((item,index)=>(
                          <div  className='col-span-3 relative' key={index} >
                          <InputField as='textarea' fieldRequired={true} labelName='Description' uni={`description.${index}`} placeholder='Branded Shirt from Zerox.'/>
                          {index>0 && <IconButton onClick={()=>remove(index)}  sx={{position:'absolute',top:8,right:-12}}  aria-label="delete" size="small"><CancelIcon /></IconButton>}
                          </div>
                          ))}
                          <div className='w-[100%] '>
                            <Button className='' onClick={()=>push('')} variant='contained'>Add Description</Button>
                            </div>
                          </>
                          )
                        }}
                      </FieldArray>
                    </FormWrapper>

                    <Gap>Hashtags</Gap>
                    <FormWrapper>
                      <FieldArray name='hashtags'>
                        {fieldArrayProps=>{
                          const {push,remove,form}=fieldArrayProps;
                          const {values}=form;
                          const {hashtags}=values;
                          return(
                          <>
                          {hashtags.map((item,index)=>(
                          <div  className='col-span-1 relative' key={index} >
                          <InputField   labelName='Hashtag' uni={`hashtags.${index}`} placeholder='#naruto'/>
                          {index>0 && <IconButton onClick={()=>remove(index)}  sx={{position:'absolute',top:8,right:-12}}  aria-label="delete" size="small"><CancelIcon /></IconButton>}
                          </div>
                          ))}
                            <div className='w-[100%]'>
                            <Button className='' onClick={()=>push('')} variant='contained'>Add Hashtag</Button>
                            </div>
                          </>
                          )
                        }}
                      </FieldArray>
                    </FormWrapper>

                    <Gap>Product Images</Gap>

                    <FormWrapper>
                    {image && (
                    preview.map((item,i)=>
                    <div key={i} className="w-full h-60 rounded-md flex justify-center items-center overflow-hidden">
                      <img className='object-contain w-[100%] h-[100%]' src={item}></img>
                    </div>
                    )
                    )}
                    {image.length<=4 && <div className="border-2 border-dotted w-full h-60 border-black rounded-md flex justify-center items-center lgrev:my-2">
                    <div className=" right-0 bottom-8">
                      <label htmlFor="profile_pic">
                        <FontAwesomeIcon
                          className="text-2xl text-tertiary"
                          icon={faAdd}
                        ></FontAwesomeIcon>
                      </label>
                      <input
                        id="profile_pic"
                        hidden
                        type="file"
                        onChange={(e) =>addImages(e)}
                        accept="image/png, image/jpeg"
                      ></input>
                    </div>
                    </div>}
                    </FormWrapper>
                    <div className='flex justify-end my-10 mr-0'>
                    <Button className='w-[100]' type='submit' variant='contained'>Add Product</Button>
                    </div>
                </Form>
            </Formik>
        </div>
        </div>
    </div>
  );
};

export default AddProduct;
