import React from 'react';
import { assets } from '../../assets';
import PropTypes from 'prop-types';
const NoList = ({ message }) => {
  return (
    <div className="flex justify-center h-[400px] p-4 flex-col gap-2 ">
      <h2 className="text-xl font-bold text-center">{message}</h2>
      <img src={assets.cutout_01} className="object-cover sm:object-contain h-[100%]" alt="no list" />
    </div>
  );
};

NoList.propTypes = {
  message: PropTypes.string.isRequired
};

export default NoList;
