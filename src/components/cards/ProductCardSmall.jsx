import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
const ProductCardSmall = () => {
  return (
    <div className="bg-white w-[200px]  rounded-md shadow-lg">
      <div className="h-[160px]"></div>
      <div className="p-2 font-semibold">
        <div>Original Beats Solo Pro</div>
        <div>Price : 44.99</div>
        <div className="flex justify-between items-center">
          <div>
            <StarIcon fontSize="small" />
            4.9
          </div>
          <div className="rounded-full bg-pink-300 p-1 cursor-pointer ">
            <AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSmall;
