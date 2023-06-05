import React from 'react';
import PropTypes from 'prop-types';
const Button = ({ children, type, classname, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[100%] bg-black text-white  font-bold flex justify-center p-2 hover:cursor-pointer hover:bg-opacity-90 ${classname}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  classname: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
