import React, { useEffect, useState } from 'react';
import { getProducts ,deleteProduct} from '../services/APIs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { SELLER_LINKS } from '../constant';
const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleDelete = (id) => {
    deleteProduct(id)
      .then((res) => {
        const data = products.filter((item) => item._id !== id);
        setProducts(data);
        toast.success("Product deleted successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const PopoverCard = ({ productId }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let edit_link = SELLER_LINKS.EditProduct.pageLink;
    // edit_link=edit_link.substring(0,edit_link.length-4);

    return (
      <div>
        <div
          className="flex justify-center items-center w-8 h-8 cursor-pointer"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div className="rounded-lg flex flex-col">
            <Button
              onClick={() =>
                navigate()
                  `/dashboard/${edit_link}?productId=${productId}&edit=true`
              }
              size="medium"
            >
              Edit
            </Button>
            <Button size="medium"
             onClick={() => {navigate(`/product/${productId}`)}}
            >View</Button>
            <Button
              size="medium"
              onClick={() => {
                handleDelete(productId);
                handleClose();
              }}
            >
              Delete
            </Button>
          </div>
        </Popover>
      </div>
    );
  };
  const ProductCard = ({ product }) => {
    return (
      <div className="col-span-1 bg-white  rounded-xl overflow-hidden relative border-2 border-black">
        <div className="w-[100%] max-h-[200px] flex justify-center items-center overflow-hidden relative">
          <img src={product.images[0]} className="w-[100%]  object-cover" />
          <h2 className="absolute right-2 bottom-2 text-white bg-transparent px-2 py-1 backdrop-blur-sm rounded-lg text-xl font-bold">
            ₹ {product.price}
          </h2>
        </div>
        <div className="p-2 rounded-xl">
          <h2 className=" font-semibold">{product.name}</h2>
          {product.variants.map((item, i) => (
            <h2 key={i} className=" text-sm">
              {item.size} -{' '}
              <span className="font-bold text-lg">{item.countInStock}</span>
            </h2>
          ))}
          <h2 className=" text-sm">Category : {product.category}</h2>
        </div>
        <div className="absolute top-2 right-2 rounded-full w-8 h-8 bg-white">
          <PopoverCard productId={product._id} />
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col  bg-white w-[100%] rounded-2xl p-4 smrev:p-2 ">
      <div className="overflow-y-auto ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
