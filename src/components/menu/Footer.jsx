import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
const Footer = () => {
  const menu = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Category',
      link: '/category'
    },
    {
      title: 'Terms & Conditions',
      link: '/terms-and-conditions'
    },
    {
      title: 'Privacy Policy',
      link: '/privacy-policy'
    }
  ];
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer" className="absolute   w-[100%]  p-4 bg-white  md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center mb-4 sm:mb-0 gap-2 ">
          <img src={assets.logo} className="w-16 h-16 rounded-full" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">Animart</span>
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-md text-black sm:mb-0 gap-2 ">
          {menu.map((item, i) => (
            <li key={i}>
              <Link to={item.link} className="mr-4 hover:underline md:mr-6 ">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-around mt-6 space-x-6 md:order-2 w-full p-4  lg:flex-row md:flex-row gap-6 flex-col">
        <div className="flex flex-col items-center gap-2">
          <LocationOnIcon fontSize="large" />
          <h4 className="text-md text-center font-extrabold">
            19/36 A , Gandhi Nagar, <br />
            Aligarh (202001) Uttar Pradesh, India
          </h4>
          <span className="flex gap-2 items-center text-md">Our Address</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <EmailIcon fontSize="large" />
          <Link to="mailto:admin@animart.in" className="hover:underline">
          <h4 className="text-md text-center font-extrabold">
            admin@animart.in
          </h4>
          </Link>
          <span className="flex gap-2 items-center text-md">Our Mailbox</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <PermPhoneMsgIcon fontSize="large" />
          <h4 className="text-md text-center font-extrabold">
          <Link to="tel:+91 7983 491 349" className="hover:underline">
            +91 7983 491 349
          </Link>
          </h4>
          <span className="flex gap-2 items-center text-md">Our Phone</span>
        </div>

      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <span className="block text-md text-gray-500 sm:text-center ">
        Copyright © {currentYear}
        <Link href="/" className="hover:underline">
          {' '}
          Animart
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
