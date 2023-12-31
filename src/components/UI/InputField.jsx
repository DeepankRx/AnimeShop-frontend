import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const InputField = ({
  labelName,
  type,
  uni,
  placeholder,

  inputClass,

  className,
  min,
  fieldRequired,
  as,
  override,
  children,
  disabled
}) => {
  const [passVisibility, setPassVisibility] = useState(false);
  const hidePass = () => {
    setPassVisibility(false);
  };

  const showPass = () => {
    setPassVisibility(true);
  };

  return (
    <div className={className}>
      <label className=" text-slate-600  flex items-center" htmlFor={uni}>
        {labelName} {fieldRequired && <span className="text-red-500 ">*</span>}
      </label>
      <div className={`flex items-center space-x-2  rounded-lg  ${disabled ? 'bg-red-100' : 'bg-blue-100'}`}>
        <Field
          disabled={disabled}
          className={`p-2 w-[100%]  rounded-lg ${inputClass} ${disabled ? 'bg-red-100' : 'bg-blue-100'}`}
          placeholder={placeholder}
          type={type !== 'password' || type === undefined ? type : type === 'password' && passVisibility ? 'text' : 'password'}
          id={uni}
          name={uni}
          as={as}
          min={min}
        >
          {override ? children : null}
        </Field>
        {type === 'password' && passVisibility && (
          <FontAwesomeIcon onClick={() => hidePass()} className="p-1 cursor-pointer" icon={faEye} size="lg" color="black" />
        )}
        {type === 'password' && !passVisibility && (
          <FontAwesomeIcon onClick={() => showPass()} className="p-1 cursor-pointer" icon={faEyeSlash} size="lg" color="black" />
        )}
      </div>
      <ErrorMessage name={uni} component={(props) => <div className="text-red-500">{props.children}</div>} />
    </div>
  );
};

InputField.propTypes = {
  labelName: PropTypes.string,
  type: PropTypes.string,
  uni: PropTypes.string,
  placeholder: PropTypes.string,
  inputClass: PropTypes.string,
  className: PropTypes.string,
  min: PropTypes.string,
  fieldRequired: PropTypes.bool,
  as: PropTypes.string,
  override: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool
};

export default InputField;
