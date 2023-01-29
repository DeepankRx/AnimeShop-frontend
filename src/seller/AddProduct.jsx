import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

import * as Yup from 'yup';
import { Formik,Form ,FieldArray} from 'formik';
import InputField from '../components/UI/InputField';
import { Input } from '@mui/material';
import Button2 from '../components/UI/Button';
import FormWrapper from './FormWrapper';
import Gap from '../components/UI/Gap';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues={
    name:'',
    description:'',
    quantity:'',
    categories:[''],
  }

  const onSubmit=(values)=>{
    console.log(values)

  }

  const validationSchema=Yup.object({
    name:Yup.string().required('Required'),
    quantity:Yup.number().required('Required'),
    categories:Yup.array(Yup.string().required('Required')),
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
    <div>
      <div className='bg-black w-12 h-12 flex justify-center items-center rounded-full cursor-pointer '  onClick={handleClickOpen}>
        <AddIcon fontSize='large' sx={{color:'white'}}/>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Product
            </Typography>
          </Toolbar>
        </AppBar>

        <div className='p-8  smrev:p-4'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className='flex flex-col gap-4'>
                    <Gap>Basic Info</Gap>
                    <FormWrapper>
                    <InputField labelName='Product Name' uni='name' placeholder='Shirt' />
                    <InputField min={0} type='number' labelName='Quantity' uni='quantity'  placeholder='0' />
                    </FormWrapper>
                    {/* <InputField labelName='Category' uni='name' placeholder='Shirt' /> */}

                    <Gap>Categories</Gap>
                    <FormWrapper>
                    <FieldArray name='categories'>
                        {fieldArrayProps=>{
                            const {push,remove,form}=fieldArrayProps;
                            const {values}=form;
                            const {categories}=values;
                            return(
                                <>
                                {categories.map((item,index)=>(
                                    <div className='col-span-1 relative' key={index} >
                                    <InputField labelName='Category' uni={`categories.${index}`} placeholder='Fashion'/>
                                    {index>0 && <IconButton onClick={()=>remove(index)}  sx={{position:'absolute',top:8,right:-12}}  aria-label="delete" size="small"><CancelIcon /></IconButton>}
                                    </div>
                                ))}
                                <div className='col-span-3 smrev:col-span-1 sm:grid sm:grid-cols-3 sm:gap-4 '>
                                <Button className='w-[100%]' onClick={()=>push('')} variant='contained'>Add Category</Button>
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
                    {image.length<=4 && <div className="border-2 border-dotted w-full h-60 border-black rounded-md flex justify-center items-center smrev:my-2">
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
                    <Button className='w-[100]' variant='contained'>Add Product</Button>
                    </div>
                </Form>
            </Formik>
        </div>
      </Dialog>
    </div>
  );
}
