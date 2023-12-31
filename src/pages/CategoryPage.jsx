import React, { useState, useEffect } from 'react';
import { assets } from '../assets';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useLocation, useNavigate } from 'react-router-dom';
import { ALL_LINKS } from '../constant';
import { Checkbox, FormControlLabel, FormGroup, Slider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { getProducts, getFilters, searchProducts } from '../services/APIs';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import styles from '../styles/css/Premium.module.css';
import CardPlaceHolderSkelton from '../components/skeltons/CardPlaceHolderSkelton';
import NoList from '../components/UI/NoList';
import Helmet from '../util/Helmet';
import { productPageTitle, productPageDescription, productPageKeywords } from '../seoConstant';
import { Pagination } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productsType, setProductsType] = useState([]);
  const [productsBrand, setProductsBrand] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const storeProducts = useSelector((state) => state.products.products);
  const itemsPerPage = 20;
  const queryPage = new URLSearchParams(location.search).get('page');
  const [page, setPage] = useState(queryPage || 1);

  useEffect(() => {
    if (queryPage) {
      setPage(Number(queryPage));
    }
    setLoading(true);
    // Scroll to top
    window.scrollTo(0, 0);
    if (!storeProducts.length) {
      getProducts(page)
        .then((res) => {
          setPaginationData(res.data.data.pagination);
          setProducts(res.data.data.products);
          setFilteredProducts(res.data.data.products);
          setLoading(false);
        })
        .catch(() => {
          toast.error('Something Went Wrong');
        });
    } else {
      const totalPages = Math.ceil(storeProducts.length / itemsPerPage);
      setPaginationData({
        totalPages: totalPages
      });
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const slicedProducts = storeProducts.slice(startIndex, endIndex);
      setProducts(slicedProducts);
      setFilteredProducts(slicedProducts);
      setLoading(false);
    }
  }, [page, storeProducts]);
  useEffect(() => {
    getFilters()
      .then((res) => {
        setProductsType(res.data.data.subCategories);
        setProductsBrand(res.data.data.brands);
      })
      .catch(() => {
        toast.error('Something Went Wrong');
      });
  }, []);
  const looks = [
    {
      active: 'grid4x4',
      imageParent: 'h-[200px]',
      productParent: 'grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4',
      product: 'flex-col'
    },
    {
      active: 'gridView',
      imageParent: 'h-[400px]',
      productParent: 'grid grid-cols-2 mdrev:grid-cols-1',
      product: 'flex-col'
    },
    {
      active: 'tableRows',
      imageParent: 'h-[200px]',
      productParent: 'flex flex-col',
      product: 'flex-row items-center',
      desc: 'flex-1'
    }
  ];
  const handleRedirect = (product) => {
    navigate(`${ALL_LINKS.Product.pageLink.substring(0, ALL_LINKS.Product.pageLink.length - 3)}${product._id}`, { state: { product } });
  };
  const [currentLook, setCurrentLook] = useState(looks[0]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [search, setSearch] = useState('');
  // const ProductDetailLink = ALL_LINKS.Product.pageLink.substring(0, ALL_LINKS.Product.pageLink.length - 3);

  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    if (queryParams.get('search') !== null) setSearch(queryParams.get('search').toLocaleLowerCase());
  }, []);

  const Product = ({ image, name, brand, price, _id, images }) => {
    return (
      <div
        onClick={() => handleRedirect({ images, name, brand, price, _id })}
        className={`cursor-pointer hover:scale-105 ease-linear duration-300 col-span-1 bg-white flex px-2 py-4 space-y-2 shadow-lg ${currentLook.product} ${styles.card_box}`}>
        {brand.toLowerCase() === 'zerox' && <span />}
        <div className="gap-2 flex flex-col">
          <div className={`flex justify-center items-center ${currentLook.imageParent}`}>
            <img src={image} className="w-[100%] h-[100%] object-contain " alt={name} />
          </div>
          <div className="flex  items-center gap-1">
            <div
              className="w-6 h-6 rounded-full
            flex items-center justify-center bg-blue-500 text-white font-bold">
              {brand.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-blue-500 text-sm font-bold">{brand}</h2>
          </div>
        </div>
        <div className={`p-2 ${currentLook.desc}`}>
          <p className="text-gray-700 text-sm overflow-hidden break-normal">{name}</p>
          <p className="text-gray-500 text-xs overflow-hidden break-normal">{brand}</p>
        </div>
        <p className="text-black font-bold text-sm p-2">₹{price}</p>
      </div>
    );
  };

  Product.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired
  };

  // Price Range
  const [value, setValue] = React.useState([0, 10000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Checkbox
  const [checkboxValue, setCheckboxValue] = useState({
    productsType: [],
    brand: []
  });

  //Collapsable States
  const [collapsableMenu, setCollapsableMenu] = useState({
    productsType: false,
    brand: false
  });
  // Search
  useEffect(() => {
    const filtered = products.filter((product) => {
      if (search.length > 0 && checkboxValue.productsType.length === 0 && checkboxValue.brand.length === 0) {
        return (
          product.price >= value[0] &&
          product.price <= value[1] &&
          (product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase()) ||
            product.hashtags.join(' ').toLowerCase().includes(search.toLowerCase()) ||
            product.subCategories.join(' ').toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase()) ||
            product.descriptions.join(' ').toLowerCase().includes(search.toLowerCase()))
        );
      }
      if (search.length > 0 && checkboxValue.productsType.length > 0 && checkboxValue.brand.length === 0) {
        return (
          checkboxValue.productsType.includes(product.subCategories.join(' ')) &&
          (product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase()) ||
            product.hashtags.join(' ').toLowerCase().includes(search.toLowerCase()) ||
            product.subCategories.join(' ').toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase()) ||
            product.descriptions.join(' ').toLowerCase().includes(search.toLowerCase()))
        );
      }
      if (search.length > 0 && checkboxValue.productsType.length === 0 && checkboxValue.brand.length > 0) {
        return (
          checkboxValue.brand.includes(product.brand) &&
          (product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase()) ||
            product.hashtags.join(' ').toLowerCase().includes(search.toLowerCase()) ||
            product.subCategories.join(' ').toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase()) ||
            product.descriptions.join(' ').toLowerCase().includes(search.toLowerCase()))
        );
      }
      if (search.length > 0 && checkboxValue.productsType.length > 0 && checkboxValue.brand.length > 0) {
        return (
          checkboxValue.brand.includes(product.brand) &&
          checkboxValue.productsType.includes(product.subCategories.join(' ')) &&
          (product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase()) ||
            product.hashtags.join(' ').toLowerCase().includes(search.toLowerCase()) ||
            product.subCategories.join(' ').toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase()) ||
            product.descriptions.join(' ').toLowerCase().includes(search.toLowerCase()))
        );
      }
      if (checkboxValue.productsType.length > 0 && checkboxValue.brand.length === 0) {
        return checkboxValue.productsType.includes(product.subCategories.join(' ')) && product.price >= value[0] && product.price <= value[1];
      }
      if (checkboxValue.brand.length > 0 && checkboxValue.productsType.length === 0) {
        return checkboxValue.brand.includes(product.brand) && product.price >= value[0] && product.price <= value[1];
      }
      if (checkboxValue.brand.length > 0 && checkboxValue.productsType.length > 0) {
        return (
          checkboxValue.brand.includes(product.brand) &&
          checkboxValue.productsType.includes(product.subCategories.join(' ')) &&
          product.price >= value[0] &&
          product.price <= value[1]
        );
      }
      if (checkboxValue.brand.length === 0 && checkboxValue.productsType.length === 0) {
        return product.price >= value[0] && product.price <= value[1];
      }
      if (search.length === 0 && checkboxValue.brand.length === 0 && checkboxValue.productsType.length === 0) {
        return product.price >= value[0] && product.price <= value[1];
      }
    });
    setFilteredProducts(filtered);
  }, [products, value, checkboxValue]);

  const handlePageChange = (e, page) => {
    setPage(page);
    navigate(`/category?page=${page}`, { replace: true });
  };
  const handleSearch = () => {
    if(!search) {
      setProducts(products);
      return;
    }
    setLoading(true);
    searchProducts(search)
      .then((res) => {
        setProducts(res.data.data.products);
        setPaginationData(res.data.data.pagination);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Helmet
        title={queryParams.get('search') ? queryParams.get('search') + ' | Animart' : productPageTitle}
        description={productPageDescription}
        keywords={productPageKeywords.join(',')}
      />

      <div className="bg-light">
        <div className="text-4xl  border-b-2  h-[320px] overflow-hidden bg-[#27203b] mdrev:h-[160px] relative">
          <img src={assets.art_01} className="w-[200%] h-[200%]  object-contain" alt="art" />
          <div className="absolute top-0 flex flex-col justify-center items-center h-[100%]  text-white w-[100%] ">
            <h1 className="text-6xl font-bold mdrev:text-3xl" id="Monton">
              Limited Editions
            </h1>
            <h1 className="text-3xl font-bold text-center mdrev:text-xl">The Ultimate Collection !</h1>
          </div>
        </div>
        <div className="p-3 flex justify-center items-center translate-y-[-32px] bg-white rounded-xl shadow-xl w-[50%] m-auto smrev:w-[80%]  ">
          <input
            placeholder="Search"
            className="appearance-none  w-[100%] !outline-none  "
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              navigate(`/category?search=${encodeURIComponent(e.target.value)}`, { replace: true });
            }}
          />
          <button
            onClick={() => {
              handleSearch();
            }}
            className="appearance-none  !outline-none  ">
            <SearchIcon className="mx-1" fontSize="large" color="primary" />
          </button>
        </div>

        <div className="px-20 py-8 lgrev:p-4 flex mdrev:flex-col gap-4">
          {/* Filters */}
          <div className=" w-[20%] mdrev:w-[100%] mdrev:p-4 flex flex-col gap-4">
            <div>
              <div className="text-lg font-bold flex justify-between items-center ">
                <div>Products Type</div>
                <div
                  onClick={() =>
                    setCollapsableMenu({
                      ...collapsableMenu,
                      productsType: !collapsableMenu.productsType
                    })
                  }
                  className="cursor-pointer shadow-md w-8 h-8 flex justify-center items-center rounded-full bg-white">
                  <FontAwesomeIcon icon={collapsableMenu.productsType ? faCaretUp : faCaretDown} />
                </div>
              </div>
              {collapsableMenu.productsType && (
                <FormGroup>
                  {productsType.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={() =>
                              setCheckboxValue({
                                ...checkboxValue,
                                productsType: checkboxValue.productsType.includes(item)
                                  ? checkboxValue.productsType.filter((i) => i !== item)
                                  : [...checkboxValue.productsType, item]
                              })
                            }
                            value={checkboxValue.shirt}
                          />
                        }
                        label={item}
                      />
                    );
                  })}
                </FormGroup>
              )}
            </div>

            <div>
              <div className="text-lg font-bold">Price Range</div>
              <div className="w-[90%] m-auto mdrev:w-[100%]">
                <Slider min={0} max={10000} step={50} value={value} onChange={handleChange} valueLabelDisplay="auto" />
              </div>
            </div>

            <div>
              <div className="text-lg font-bold flex justify-between items-center ">
                <div>Brands</div>
                <div
                  onClick={() =>
                    setCollapsableMenu({
                      ...collapsableMenu,
                      brand: !collapsableMenu.brand
                    })
                  }
                  className="cursor-pointer shadow-md w-8 h-8 flex justify-center items-center rounded-full bg-white">
                  <FontAwesomeIcon icon={collapsableMenu.brand ? faCaretUp : faCaretDown} />
                </div>
              </div>
              {collapsableMenu.brand && (
                <FormGroup>
                  {productsBrand.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={() =>
                              setCheckboxValue({
                                ...checkboxValue,
                                brand: checkboxValue.brand.includes(item) ? checkboxValue.brand.filter((i) => i !== item) : [...checkboxValue.brand, item]
                              })
                            }
                            value={checkboxValue.shirt}
                          />
                        }
                        label={item}
                      />
                    );
                  })}
                </FormGroup>
              )}
            </div>
          </div>
          {/* Products Listing */}

          <div className="w-[80%] mdrev:w-[100%] flex flex-col gap-2">
            <div className="flex justify-between pb-4">
              <p className="text-xl ">{filteredProducts.length} products</p>
              <div className="flex justify-center items-center">
                {/* <div className="border-r-2 border-r-gray-500 px-2">
                  Best Selling
                </div> */}
                <div className="px-4 flex gap-1 mdrev:px-0">
                  <div onClick={() => setCurrentLook(looks[0])} className={`p-1 cursor-pointer ${currentLook.active === 'grid4x4' ? 'bg-white' : ''}`}>
                    <Grid4x4Icon sx={{ color: 'black' }} />
                  </div>
                  <div onClick={() => setCurrentLook(looks[1])} className={`p-1 cursor-pointer ${currentLook.active === 'gridView' ? 'bg-white' : ''}`}>
                    <GridViewIcon sx={{ color: 'black' }} />
                  </div>
                  <div onClick={() => setCurrentLook(looks[2])} className={`p-1 cursor-pointer ${currentLook.active === 'tableRows' ? 'bg-white' : ''}`}>
                    <TableRowsIcon sx={{ color: 'black' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`gap-4  ${currentLook.productParent}`}>
              {loading ? (
                <>
                  <CardPlaceHolderSkelton />
                  <CardPlaceHolderSkelton />
                  <CardPlaceHolderSkelton />
                  <CardPlaceHolderSkelton />
                  <CardPlaceHolderSkelton />
                  <CardPlaceHolderSkelton />
                  <CardPlaceHolderSkelton />
                  <CardPlaceHolderSkelton />
                </>
              ) : (
                filteredProducts.length > 0 &&
                filteredProducts.map((product, index) => {
                  return (
                    <div key={index} className={`col-span-1 ${currentLook.productChild}`}>
                      <Product
                        image={product.images[0]}
                        name={product.name}
                        price={product.price}
                        brand={product.brand}
                        _id={product._id}
                        images={product.images}
                      />
                    </div>
                  );
                })
              )}
            </div>
            {filteredProducts.length === 0 && !loading && <NoList message="No Products Found Senpai !" />}
            <div className="flex justify-center items-center">
              <Pagination
                count={paginationData.totalPages}
                variant="outlined"
                onChange={(event, value) => {
                  handlePageChange(event, value);
                }}
                page={page}
                size="large"
                className="mt-5"
                color="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
