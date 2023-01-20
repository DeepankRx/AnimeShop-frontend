// const dataToSend={
//   pName:'',
//   pImages:[],
//   pDescription:[],

//   pID:'',
//   pPrice:'',
//   pTags:''

// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const ProductDetailed = (props) => {

  const [currentImage, SetCurrentImage] = useState(
    props.dtr.pImages[0]
  );

  const onImageTabButtonHandler = (item) => {
    SetCurrentImage(item);
  };


  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className={`flex flex-col `}>
      <div className={`flex justify-center items-center lgrev:flex-col`}>
        <div className='flex flex-col w-[600px] m-8 gap-4 lgrev:w-[90%] lgrev:m-4'>
          <h4 className='text-lg'>Products / {props.dtr.name}</h4>
          <div className=' w-[100%] h-[400px]   lgrev:h-auto'>
            <img
              id="productImage"
              alt={props.name + "Image"}
              src={currentImage}
              className='w-[100%] h-auto '
            />
          </div>
          <div className='w-[200px] my-2 flex space-x-4'>
            {props.dtr.pImages.map((element, i) => (
              <div className="w-[100%]  cursor-pointer shadow-lg ">
              <img
                className="object-fill"
                alt={props.name + "Image"}
                key={i}
                onClick={() => onImageTabButtonHandler(element)}
                src={element}
                ></img>
                </div>
            ))}
          </div>
          <div className=''>
            {props.dtr.description}
          </div>
        </div>

        <div className='flex flex-col m-8 w-[600px] gap-4 lgrev:w-[90%] lgrev:m-4'>

            <h2>{props.dtr.name}</h2>
            <p>{props.dtr.id}</p>
            <h2 className='text-green-500 text-4xl'>{"₹" + props.dtr.pPrice}</h2>
            <label>Quantity</label>
            <input type="number" className="bg-blue-100 p-2 w-[80px]" min="1" defaultValue={1}></input>
            <Button className='w-[100%'>ADD TO CART</Button>
            <Button className=''>BUY NOW</Button>
            <h2>SHIPPING</h2>
            <p>
              Currently we are not Shipping anything as as our site is in
              development mode , you could visit our store and purchase our
              products , Thank you.
            </p>

            <h2>REFUND</h2>
            <p>
              We hope you will be pleased with your purchase. Should you wish to
              return anything bought from us, we will be happy to refund or
              exchange a product provided it is in a fully resalable condition
              .Return should be made within a resalable time (7 days) and in
              orignal , undamaged packaging .
            </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailed;