import { Button, Popover } from "@mui/material";
import React from "react";
import LeftPane from "../components/menu/LeftPane";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { ALL_LINKS, SELLER_LINKS } from "../constant";
import { useEffect } from "react";
import { deleteProduct } from "../services/APIs";
import { useState } from "react";
import { getSellerProducts } from "../services/APIs";
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
import NoList from "../components/UI/NoList";
const SellerProducts = () => {
  const navigate=useNavigate();
  const authCtx=useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading ,setLoading] =useState(true);
  const [search,setSearch]=useState("");
  const [filteredProducts,setFilteredProducts]=useState([]);
  useEffect(() => {
    getSellerProducts(authCtx.userid)
      .then((res) => {
        setProducts(res.data.data);
        setFilteredProducts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);
  //Search
  useEffect(() => {
    const filtered = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase()) || product.brand.toLowerCase().includes(search.toLowerCase()) || product.hashtags.join(' ').toLowerCase().includes(search.toLowerCase())  || product.subCategories.join(' ').toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase()) || product.descriptions.join(' ').toLowerCase().includes(search.toLowerCase());
    })
    setFilteredProducts(filtered);

  }, [search, products])
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
  // const TableRow = () => {
  //   return (
  //     <tr className="bg-white border-b ">
  //       <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
  //         Apple MacBook Pro 17"
  //       </th>
  //       <td className="px-6 py-4">Sliver</td>
  //       <td className="px-6 py-4">Laptop</td>
  //       <td className="px-6 py-4">$2999</td>
  //       <td className="px-6 py-4">
  //         <Link to="#" className="font-medium text-blue-600  hover:underline">
  //           Edit
  //         </Link>
  //       </td>
  //       <td className="px-6 py-4">
  //         <Link to="#" className="font-medium text-blue-600  hover:underline">
  //           Delete
  //         </Link>
  //       </td>
  //     </tr>
  //   );
  // };

  const PopoverCard = ({productId}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let edit_link=SELLER_LINKS.EditProduct.pageLink;
    // edit_link=edit_link.substring(0,edit_link.length-4);

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
            <Button onClick={()=>navigate(`/dashboard/${edit_link}?productId=${productId}&edit=true`)} size="medium">Edit</Button>
            <Button size="medium">View</Button>
            <Button size="medium"
              onClick={() => {
                handleDelete(productId);
                handleClose();
              }}
            >Delete</Button>
          </div>
        </Popover>
      </div>
    );
  };

  const ProductCard=({product})=>{
    return(
      <div className="col-span-1 bg-white  rounded-xl overflow-hidden relative border-2 border-black">
        <div className="w-[100%] max-h-[200px] flex justify-center items-center overflow-hidden relative">
          <img src={product.images[0]} className='w-[100%]  object-cover' />
          <h2 className="absolute right-2 bottom-2 text-white bg-transparent px-2 py-1 backdrop-blur-sm rounded-lg text-xl font-bold">₹ {product.price}</h2>
        </div>
        <div className="p-2 rounded-xl">
        <h2 className=" font-semibold">{product.name}</h2>
        {product.variants.map((item,i)=>(
          <h2 key={i} className=" text-sm">{item.size} - <span className="font-bold text-lg">{item.countInStock}</span></h2>
        ))}
        <h2 className=" text-sm">Category : {product.category}</h2>

        </div>
        <div className="absolute top-2 right-2 rounded-full w-8 h-8 bg-white">
          <PopoverCard
            productId={product._id}
          />
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
          <div className="relative  shadow-md sm:rounded-2xl  overflow-x-auto overflow-y-auto bg-white h-[100%]">
            <table className=" text-sm text-left text-gray-500  w-[100%] ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th className="px-6 py-3">Product name</th>
                  <th className="px-6 py-3">Color</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Edit</th>
                  <th className="px-6 py-3">Delete</th>
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
          <div className='p-2 bg-blue-100 rounded-md shadow-xl flex items-center'>
          <SearchIcon className='' fontSize='small' color='primary'/>
          <input placeholder='Search' className='appearance-none bg-blue-100 text-sm  w-[100%] !outline-none  ' type='text' name='search'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
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
            filteredProducts.length>0 &&
            filteredProducts.map((product,i)=>(
              <ProductCard key={i} product={product}/>
            )) 
            }
            </div>

            {filteredProducts.length===0 && !loading && <NoList message="No Products Found , Let Add Together !"/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProducts;
