import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import HeartIcon from '@mui/icons-material/HeartBroken';
const ProductMediumCard = () => {
  return (
    <div className="shadow-lg  p-4 flex space-x-8 rounded-lg">
      <div className="bg-pink-500 w-[500px] rounded-md">image</div>
      <div className="space-y-1 ">
        <div className="font-bold text-lg">Lorem ipsum dolor sit amet.</div>
        <div>
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" />
          <StarIcon fontSize="small" />
          (2000+ Reviews)
        </div>
        <div className="text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corrupti voluptatum necessitatibus vitae tempore quas. Et exercitationem ad quam nobis
          ea molestias animi rem dignissimos{' '}
        </div>
        <div className="text-lg">Price $349</div>
        <div className="flex  space-x-2 items-center">
          <div>Colors</div>
          <div className="w-3 h-3  bg-pink-500 rounded-full" />
          <div className="w-3 h-3  bg-orange-500 rounded-full" />
          <div className="w-3 h-3  bg-black rounded-full" />
          <div className="w-3 h-3  bg-green-500 rounded-full" />
        </div>

        <div className="flex space-x-2">
          <div className="border-2 rounded-md px-2 border-purple-500">
            <HeartIcon fontSize="large" />
          </div>
          <div className="border-2 rounded-md px-2 border-purple-500 flex justify-center items-center font-bold">Add to Cart</div>
          <div className="border-2 rounded-md px-2 bg-purple-500 text-white flex justify-center items-center font-bold">Buy Now</div>
        </div>
      </div>
    </div>
  );
};

export default ProductMediumCard;
