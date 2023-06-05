import React from 'react';
import PropTypes from 'prop-types';
const FormWrapper = ({ children }) => {
  return <div className="grid grid-cols-3 lgrev:grid-cols-1 gap-4 my-2">{children}</div>;
};
FormWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default FormWrapper;
