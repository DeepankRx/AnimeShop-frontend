import React, { useState, useEffect } from 'react';
import { assets } from '../assets';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Link } from 'react-router-dom';
import { ALL_LINKS } from '../constant';
import { Checkbox, FormControlLabel, FormGroup, Slider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { getProducts } from '../services/APIs';
const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const looks = [
    {
      active: 'grid4x4',
      imageParent: 'h-[200px]',
      productParent: 'grid grid-cols-4 mdrev:grid-cols-1',
      product: 'flex-col',
    },
    {
      active: 'gridView',
      imageParent: 'h-[400px]',
      productParent: 'grid grid-cols-2 mdrev:grid-cols-1',
      product: 'flex-col',
    },
    {
      active: 'tableRows',
      imageParent: 'h-[200px]',
      productParent: 'flex flex-col',
      product: 'flex-row items-center',
      desc: 'flex-1',
    },
  ];

  const [currentLook, setCurrentLook] = useState(looks[0]);

  const Product = ({ image, name, brand, price }) => {
    return (
      <Link to={ALL_LINKS.Product.pageLink}>
        <div
          className={`cursor-pointer hover:scale-105 ease-linear duration-300 col-span-1 bg-white flex px-8 py-4 space-y-4 shadow-lg ${currentLook.product} `}
        >
          <div
            className={`flex justify-center items-center ${currentLook.imageParent}`}
          >
            <img src={image} className="w-[100%] h-[100%] object-contain " />
          </div>
          <div className={`p-2 ${currentLook.desc}`}>
            <p className="text-gray-700 text-lg">{name}</p>
            <p className="text-gray-500 text-sm">{brand}</p>
          </div>
          <p className="text-black font-bold text-sm p-2">₹{price}</p>
        </div>
      </Link>
    );
  };

  // Price Range
  const [value, setValue] = React.useState([0, 1000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value}`;
  }

  //Checkbox
  const [checkboxValue, setCheckboxValue] = useState({
    shirt: false,
  });

  //Collapsable States
  const [collapsableMenu, setCollapsableMenu] = useState({
    productsType: true,
    brand: true,
  });

  return (
    <div className="bg-stone-100">
      <div className=" mdrev:p-4 ">
        <div className="text-4xl py-8 border-b-2 border-gray-200 px-20 mdrev:p-4">
          Limited Editions
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
                      productsType: !collapsableMenu.productsType,
                    })
                  }
                  className="cursor-pointer shadow-md w-8 h-8 flex justify-center items-center rounded-full"
                >
                  <FontAwesomeIcon
                    icon={
                      collapsableMenu.productsType ? faCaretUp : faCaretDown
                    }
                  />
                </div>
              </div>
              {collapsableMenu.productsType && (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Shirt"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Shirt"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Shirt"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Shirt"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Shirt"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Shirt"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Shirt"
                  />
                </FormGroup>
              )}
            </div>

            <div>
              <div className="text-lg font-bold">Price Range</div>
              <div className="w-[90%] m-auto mdrev:w-[100%]">
                <Slider
                  min={0}
                  max={5000}
                  step={50}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                />
              </div>
            </div>

            <div>
              <div className="text-lg font-bold flex justify-between items-center ">
                <div>Brands</div>
                <div
                  onClick={() =>
                    setCollapsableMenu({
                      ...collapsableMenu,
                      brand: !collapsableMenu.brand,
                    })
                  }
                  className="cursor-pointer shadow-md w-8 h-8 flex justify-center items-center rounded-full"
                >
                  <FontAwesomeIcon
                    icon={
                      collapsableMenu.productsType ? faCaretUp : faCaretDown
                    }
                  />
                </div>
              </div>
              {collapsableMenu.brand && (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Zerox"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Zerox"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Zerox"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Zerox"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Zerox"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Zerox"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          setCheckboxValue({
                            ...checkboxValue,
                            shirt: !checkboxValue.shirt,
                          })
                        }
                        value={checkboxValue.shirt}
                      />
                    }
                    label="Zerox"
                  />
                </FormGroup>
              )}
            </div>
          </div>
          {/* Products Listing */}

          <div className="w-[80%] mdrev:w-[100%] flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-xl ">{products.size} products</p>
              <div className="flex justify-center items-center">
                <div className="border-r-2 border-r-gray-500 px-2">
                  Best Selling
                </div>
                <div className="px-4 flex gap-1 mdrev:px-0">
                  <div
                    onClick={() => setCurrentLook(looks[0])}
                    className={`p-1 cursor-pointer ${
                      currentLook.active === 'grid4x4' ? 'bg-white' : ''
                    }`}
                  >
                    <Grid4x4Icon sx={{ color: 'black' }} />
                  </div>
                  <div
                    onClick={() => setCurrentLook(looks[1])}
                    className={`p-1 cursor-pointer ${
                      currentLook.active === 'gridView' ? 'bg-white' : ''
                    }`}
                  >
                    <GridViewIcon sx={{ color: 'black' }} />
                  </div>
                  <div
                    onClick={() => setCurrentLook(looks[2])}
                    className={`p-1 cursor-pointer ${
                      currentLook.active === 'tableRows' ? 'bg-white' : ''
                    }`}
                  >
                    <TableRowsIcon sx={{ color: 'black' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className={`gap-4  -cols-1 ${currentLook.productParent}`}>
              {products.map((product, index) => {
                return (
                  <div
                    key={index}
                    className={`col-span-1 ${currentLook.productChild}`}
                  >
                    <Product
                      image={product.images[0]}
                      name={product.name}
                      price={product.price}
                      brand={product.brand}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
