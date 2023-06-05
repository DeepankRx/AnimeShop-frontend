import React from 'react';
import PropTypes from 'prop-types';
const Gap = (props) => {
  const className = props.className === undefined ? '' : props.className;
  return (
    <div className={`flex-none flex items-center justify-center text-white font-semibold ${className} my-4`}>
      <div className="rounded-lg bg-primary px-6 py-1.5 flex text-center ">{props.children}</div>
      <div className=" flex-1 bg-primary h-1"></div>
    </div>
  );
};
Gap.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Gap;
