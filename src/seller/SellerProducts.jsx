import { Button, Popover } from "@mui/material";
import React from "react";
import LeftPane from "../components/menu/LeftPane";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { ALL_LINKS, SELLER_LINKS } from "../constant";
import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "../services/APIs";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import SearchIcon  from "@mui/icons-material/Search";
import { assets } from "../assets";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import Spinner from "../components/UI/Spinner";
import CardPlaceHolderSkelton from "../components/skeltons/CardPlaceHolderSkelton";

const SellerProducts = () => {
  const authCtx=useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading ,setLoading] =useState(true);
  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = res.data.data.filter((item)=>item.createdBy===authCtx.userid);
        console.log(data)
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  const TableRow = () => {
    return (
      <tr class="bg-white border-b ">
        <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
          Apple MacBook Pro 17"
        </th>
        <td class="px-6 py-4">Sliver</td>
        <td class="px-6 py-4">Laptop</td>
        <td class="px-6 py-4">$2999</td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600  hover:underline">
            Edit
          </a>
        </td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600  hover:underline">
            Delete
          </a>
        </td>
      </tr>
    );
  };

  const PopoverCard = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        <div className="flex justify-center items-center w-8 h-8 cursor-pointer" onClick={handleClick}>
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
            <Button size="medium">Edit</Button>
            <Button size="medium">View</Button>
            <Button size="medium">Delete</Button>
          </div>
        </Popover>
      </div>
    );
  };

  const ProductCard=({product})=>{
    return(
      <div className="col-span-1 bg-white  rounded-xl overflow-hidden relative">
        <div className="w-[100%] max-h-[200px] flex justify-center items-center overflow-hidden relative">
          <img src={product.images[0]} className='w-[100%]  object-cover' />
          <h2 className="absolute right-2 bottom-2 text-white bg-transparent px-2 py-1 backdrop-blur-sm rounded-lg text-xl font-bold">₹ 999</h2>
        </div>
        <div className="p-2 border-[1px] border-black border-t-0 rounded-xl rounded-t-none">
        <h2 className=" font-semibold">{product.name}</h2>
        {product.variants.map((item,i)=>(
          <h2 key={i} className=" text-sm">{item.size} - <span className="font-bold text-lg">{item.countInStock}</span></h2>
        ))}
        <h2 className=" text-sm">Category : {product.category}</h2>

        </div>
        <div className="absolute top-2 right-2 rounded-full w-8 h-8 bg-white">
          <PopoverCard/>
        </div>

      </div>

    )
  }

  return (
    <>
      <div className="absolute right-8 bottom-8 z-10 ">
        <Link
          to={"/dashboard/" + SELLER_LINKS.AddProduct.pageLink}
          className="bg-black w-12 h-12 flex justify-center items-center rounded-full cursor-pointer "
        >
          <AddIcon fontSize="large" sx={{ color: "white" }} />
        </Link>
      </div>

      {/* <div className=" overflow-x-hidden  flex-1  flex flex-col gap-4 rounded-2xl">
          <div class="relative  shadow-md sm:rounded-2xl  overflow-x-auto overflow-y-auto bg-white h-[100%]">
            <table class=" text-sm text-left text-gray-500  w-[100%] ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th class="px-6 py-3">Product name</th>
                  <th class="px-6 py-3">Color</th>
                  <th class="px-6 py-3">Category</th>
                  <th class="px-6 py-3">Price</th>
                  <th class="px-6 py-3">Edit</th>
                  <th class="px-6 py-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                <TableRow />
                <TableRow />
                <TableRow />
                <TableRow />
              </tbody>
            </table>
          </div>
        </div> */}

      <div className="flex flex-col  bg-white w-[100%] rounded-2xl p-4 smrev:p-2 smrev:py-4">
        <div className="overflow-y-auto ">
          <div className="mr-4  smrev:mr-0 flex flex-col gap-4">
            {/* Navbar */}
            <div className="flex justify-between smrev:flex-col gap-2">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon color="purple" icon={faCalendar} size='lg'/>
              <h2 className="font-semibold ">{new Date().toDateString()}</h2>
            </div>

          <div>
          <div className='p-2 bg-blue-100 rounded-xl shadow-xl flex items-center'>
          <SearchIcon className='' fontSize='small' color='primary'/>
          <input placeholder='Search' className='appearance-none bg-blue-100 text-sm  w-[100%] !outline-none  ' type='text' name='search'
          // value={search}
          onChange={(e) => {
            // setSearch(e.target.value);
          }}
          />
        </div>
            </div>
            </div>

            {/* Products Page */}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
            {loading ? 
            <>
            <CardPlaceHolderSkelton/>
            <CardPlaceHolderSkelton/>
            <CardPlaceHolderSkelton/>
            <CardPlaceHolderSkelton/>
            <CardPlaceHolderSkelton/>
            <CardPlaceHolderSkelton/>
            <CardPlaceHolderSkelton/>
            <CardPlaceHolderSkelton/>
            </>:
            products.map((item,i)=>
              <ProductCard product={item} key={i}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProducts;
