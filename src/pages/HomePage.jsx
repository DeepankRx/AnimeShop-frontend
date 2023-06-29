import { faCrown, faHeadset, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addNewsletter } from '../services/APIs';
import React, { useState } from 'react';
import Collections from '../components/UI/Collections';
import HeroSection from '../components/UI/HeroSection';
// import ShopByAnime from '../components/UI/ShopByAnime';
import parallex from '../styles/css/parallex.module.css';

import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Helmet from '../util/Helmet';
import { homePageDescription,homePageKeywords,homePageTitle } from '../seoConstant';
const HomePage = () => {
  const [email, setEmail] = useState('');
  // const [topProducts, setTopProducts] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await getAProductFromEachCategory();
  //       setTopProducts(res.data.data);
  //     } catch (err) {
  //       console.log(err.message);
  //       // toast.error(err.response.data.message)
  //     }
  //   };
  //   fetchData();
  // }, []);
  const handleAddNewsletter = async (e) => {
    try {
      e.preventDefault();
      if (!email) {
        return toast.error('Email is required');
      }
      const re = /\S+@\S+\.\S+/;
      if (!re.test(email)) {
        return toast.error('Email is invalid');
      }
      const res = await addNewsletter(email);
      toast.success(res.data.message);
      setEmail('');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const ProductCard = ({ product }) => {
    return (
      <div className="flex flex-col">
        <div
          className="flex flex-col  space-y-4 w-[320px] h-[320px]  rounded-full  border-2 border-yellow-100"
          style={{
            backgroundImage: `url(${product.images[0]})
        `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxShadow: `0 0 10px 0 rgba(0,0,0,0.5)'
        `
          }}>
          <div className="flex flex-col items-center space-y-4 relative top-52 p-3">
            <h2 className="text-xl text-yellow-300">{product.category}</h2>
            {/* <p className='text-lg text-yellow-300'>₹{product.price}</p> */}
          </div>
        </div>
      </div>
    );
  };

  ProductCard.propTypes = {
    product: PropTypes.object
  };

  const testimonial = [
    {
      icon: faRankingStar,
      tagline: 'We offer a wide selection of anime merchandise for different seasons through out the year.'
    },
    {
      icon: faCrown,
      tagline: 'Our merchandise is made with premium materials and designed to last for years.'
    },
    {
      icon: faHeadset,
      tagline: 'We offer competitive prices and excellent customer service to ensure our customers have the best shopping experience.'
    }
  ];
  const Testimonial = ({ tagline, icon }) => {
    return (
      <div className="py-4 px-10 space-y-4 lgrev:px-4 flex flex-col items-center ">
        <FontAwesomeIcon icon={icon} size="5x" className="text-pink-600" />
        <p className="text-lg  text-center">{tagline}</p>
      </div>
    );
  };
  Testimonial.propTypes = {
    tagline: PropTypes.string,
    icon: PropTypes.object
  };

  return (
    <>
      <Helmet
        title={homePageTitle}
        keywords={homePageKeywords.join(',')}
        description=  {homePageDescription}
      />
      <HeroSection />
      <Collections />
      <div
        className={`${parallex.para3}   bg-repeat bg-contain lg:bg-cover flex flex-col items-center justify-center  md:grid  gap-4 p-20   lgrev:gap-2  bg-repeat-z bg-center bg-fixed`}>

      </div>
      {/* <ShopByAnime /> */}

      {/* <Categories/> */}
      <div className={`grid grid-cols-3 mdrev:grid-cols-1 px-20 py-20   smrev:p-6`}>
        {testimonial.map((item, i) => {
          return <Testimonial key={i} icon={item.icon} tagline={item.tagline} />;
        })}
      </div>

      <div className={`relative h-[400px] sm:bg-fixed bg-cover ${parallex.para2}`}>
        <div className="absolute w-[100%] h-[100%] flex justify-center items-center">
          <div className="w-[600px]  bg-white mdrev:w-[90%] p-8 space-y-4 ">
            <h2 className="text-xl uppercase mb-4">Subscribe to our Newsletter</h2>
            <div>
              <p>Promotions products ,discounts and sales</p>
              <p> Directly to your inbox!</p>
            </div>
            <div className="flex gap-2">
              <input
                placeholder="alexjersey@gmail.com"
                type="text"
                className="w-[100%] bg-blue-100 p-4 mdrev:p-2 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="uppercase bg-black text-white p-2" onClick={handleAddNewsletter}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
