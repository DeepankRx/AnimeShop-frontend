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
import {toast} from 'react-toastify';
import { createProduct, getProduct, updateProduct } from '../services/APIs';
import { useLocation, useNavigate } from 'react-router-dom';
import { ALL_LINKS, SELLER_LINKS } from '../constant';
import { useContext } from 'react';
import AuthContext from '../store/AuthContext';


const AddProduct = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const authCtx=useContext(AuthContext);
  const [image,setImage]=useState([]);
  const [preview,setPreview]=useState([]);
  const [editingMode,setEditingMode]=useState(false);
  const queryParams=new URLSearchParams(location.search);
  const [fetchedValues,setFetchedValues]=useState({
    name:'',
    brand:'',
    category:'',
    subCategories:[''],
    descriptions:[''],
    hashtags:[''],
    price:'',
    variants:[{size:'',countInStock:''}],
});

  useEffect(() => {
    console.log(queryParams)
    if(queryParams.get('edit')==='true'){
      setEditingMode(true);
      console.log('test')
      getProduct(queryParams.get('productId'))
      .then((res)=>{
        const data=res.data.data;
        console.log(data)
        setFetchedValues({
          name:data.name,
          brand:data.brand,
          category:data.category,
          subCategories:data.subCategories,
          descriptions:data.descriptions,
          hashtags:data.hashtags,
          price:data.price,
          variants:data.variants,
        })
        setPreview(data.images)

      })
      .catch((err)=>{
        console.log(err)
      })
    }

  }, [])
  


  const initialValues={
    name:'',
    brand:'',
    category:'',
    subCategories:[''],
    descriptions:[''],
    hashtags:[''],
    price:'',
    variants:[{size:'',countInStock:''}],
  }

  const onSubmit=(values,{resetForm})=>{
    if(preview.length===0){toast.error("Please add atleast 1 Image !");}
    else{

      if(editingMode){
        const formData=new FormData();
        formData.append('name',values.name);
        formData.append('brand',values.brand);
        formData.append('category',values.category);
        formData.append('createdBy',authCtx.userid);
        values.subCategories.forEach((sub)=>formData.append('subCategories',sub));
        values.hashtags.forEach((hashtag)=>formData.append('hashtags',hashtag));
        values.descriptions.forEach((desc)=>formData.append('descriptionss',desc));
        formData.append('variants',JSON.stringify(values.variants));
        formData.append('price',values.price);
        image.forEach((img)=>formData.append('images',img));
        updateProduct(queryParams.get('productId'),formData).then((res)=>{
          toast.success('Product updated successfully');
          resetForm({values:''});
          navigate('/dashboard/'+SELLER_LINKS.SellerProducts.pageLink)
        }
        ).catch((err)=>{
          toast.error(err.message);
        }
        )
      }else{
        const formData=new FormData();
        formData.append('name',values.name);
        formData.append('brand',values.brand);
        formData.append('category',values.category);
        formData.append('createdBy',authCtx.userid);
        values.subCategories.forEach((sub)=>formData.append('subCategories',sub));
        values.hashtags.forEach((hashtag)=>formData.append('hashtags',hashtag));
        values.descriptions.forEach((desc)=>formData.append('descriptionss',desc));
        formData.append('variants',JSON.stringify(values.variants));
        formData.append('price',values.price);
        image.forEach((img)=>formData.append('images',img));
        createProduct(formData).then((res)=>{
          toast.success('Product added successfully');
          resetForm({values:''});
          navigate('/dashboard/'+SELLER_LINKS.SellerProducts.pageLink)
        }
        ).catch((err)=>{
          toast.error(err.message);
        }
        )
      }


    }
      
  }

  const validationSchema=Yup.object({
    name:Yup.string().required('Required'),
    category:Yup.string().required('Required'),
    subCategories:Yup.array(Yup.string().required('Required')),
    brand:Yup.string().required('Required'),
    variants:Yup.array().of(Yup.object({size:Yup.string().required('Required'),countInStock:Yup.number().required('Required').min(0,'Min value should be 0')})),
    descriptions:Yup.array(Yup.string().required('Required')),
    price:Yup.number().required('Required').min(0,'Min value should be 0'),
  })



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
            <Formik initialValues={fetchedValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize >
                <Form className='flex flex-col gap-4'>
                    <Gap>Basic Info</Gap>
                    <FormWrapper>
                    <InputField labelName='Product Name' uni='name' placeholder='Shirt' fieldRequired={true} />
                    <InputField labelName='Brand' uni='brand' placeholder='Zerox' fieldRequired={true} />
                    <InputField labelName='Price' uni='price'  type={'number'} placeholder='1000' fieldRequired={true} />
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
                          <div className='relative col-span-1' key={index} >
                          <InputField  fieldRequired={true} labelName='Sub Category' uni={`subCategories.${index}`} placeholder='Men Shirt'/>
                          {index>0 && <IconButton onClick={()=>remove(index)}  sx={{position:'absolute',top:8,right:-12}}  aria-label="delete" size="small"><CancelIcon /></IconButton>}
                          </div>
                          ))}
                          <div className='col-span-full'>
                            <Button className='' onClick={()=>push('')} variant='contained'>Add Sub Category</Button>
                          </div>
                          </>
                          )
                        }}
                      </FieldArray>
                    </FormWrapper>
                    {/* <InputField labelName='Category' uni='name' placeholder='Shirt' /> */}

                    <Gap>Variants</Gap>
                    <FormWrapper>
                    <FieldArray name='variants'>
                        {fieldArrayProps=>{
                            const {push,remove,form}=fieldArrayProps;
                            const {values}=form;
                            const {variants}=values;
                            return(
                                <>
                                {variants.map((item,index)=>(
                                    <div className='relative col-span-2  grid grid-cols-2 lgrev:grid-cols-1  gap-4' key={index} >
                                    <InputField override={true} as='select' fieldRequired={true} labelName='Size' uni={`variants.${index}.size`} placeholder='XL'>
                                    <option value="" disabled>Choose</option>
                                    <option value="4XS">4XS</option>
                                    <option value="3XS">3XS</option>
                                    <option value="2XS">2XS</option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                    <option value="4XL">4XL</option>
                                    </InputField>
                                    <InputField fieldRequired={true} type='number' labelName='Quantity In Stock' min={0} uni={`variants.${index}.countInStock`} placeholder='99'/>
                                    {index>0 && <IconButton onClick={()=>remove(index)}  sx={{position:'absolute',top:8,right:-12}}  aria-label="delete" size="small"><CancelIcon /></IconButton>}
                                    </div>
                                ))}
                                <div className='col-span-full'>
                                <Button className='' onClick={()=>push('')} variant='contained'>Add Variant</Button>
                                </div>

                                </>
                            )
                        }}
                    </FieldArray>
                    </FormWrapper>
                    <a href={ALL_LINKS.SizingGuide.pageLink} target='_blank' className='text-blue-500 cursor-pointer'>Check Size Chart</a>


                    <Gap>Descriptions</Gap>
                    <FormWrapper>
                      <FieldArray name='descriptions'>
                        {fieldArrayProps=>{
                          const {push,remove,form}=fieldArrayProps;
                          const {values}=form;
                          const {descriptions}=values;
                          return(
                          <>
                          {descriptions.map((item,index)=>(
                          <div  className='col-span-3 relative' key={index} >
                          <InputField as='textarea' fieldRequired={true} labelName='descriptions' uni={`descriptions.${index}`} placeholder='Branded Shirt from Zerox.'/>
                          {index>0 && <IconButton onClick={()=>remove(index)}  sx={{position:'absolute',top:8,right:-12}}  aria-label="delete" size="small"><CancelIcon /></IconButton>}
                          </div>
                          ))}
                          <div className='col-span-full '>
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
                            <div className='col-span-full'>
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
                    <div className='relative'>
                    <div key={i} className=" w-full h-60 rounded-md flex justify-center items-center overflow-hidden">
                      <img className='object-contain w-[100%] h-[100%]' src={item}></img>
                    </div>
                    <IconButton onClick={()=>{setPreview(preview.filter((item2=>item!==item2)))}}  sx={{position:'absolute',top:-16,right:-16,zIndex:10}}  aria-label="delete" size="small"><CancelIcon /></IconButton>
                    </div>
                    )
                    )}
                    {preview.length<=4 && <div className="border-2 border-dotted w-full h-60 border-black rounded-md flex justify-center items-center lgrev:my-2">
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
                    <Button className='w-[100]' type='submit' variant='contained'>{editingMode ? 'Update Product' : 'Add Product'}</Button>

                    </div>
                </Form>
            </Formik>
        </div>
        </div>
    </div>
  );
};

export default AddProduct;
