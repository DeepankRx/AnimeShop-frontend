import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";

const InputField = ({
  labelName,
  type,
  uni,
  placeholder,
  onChange,
  value,
  touched,
  error,
  onBlur,
  disabled,
  rowWise,
  inputClass,
  labelClass,
  min,
  maxLength,
}) => {

  const [passVisibility,setPassVisibility]=useState(false);
  const hidePass=()=>{
    setPassVisibility(false);
}

const showPass=()=>{
    setPassVisibility(true);
}

  return (
    <>
        <label className=" text-slate-600 col-span-1 flex items-center" htmlFor={uni}>
          {labelName}
        </label>
        <div className={`flex items-center space-x-2   rounded-lg bg-blue-100`}>
        <Field
          className={`p-2 w-[100%] bg-blue-100 rounded-lg ${inputClass}`}
          placeholder={placeholder}
          type={type!=='password' || type===undefined ? type : type==='password' && passVisibility ? 'text' : 'password'}
          id={uni}
          name={uni}
        ></Field>
       {type==='password' && passVisibility && <FontAwesomeIcon onClick={()=>hidePass()} className="p-1 cursor-pointer" icon={faEye} size='lg' color="black"/>}
       {type==='password' && !passVisibility && <FontAwesomeIcon onClick={()=>showPass()} className="p-1 cursor-pointer" icon={faEyeSlash} size='lg' color="black"/>}
      </div>
      <ErrorMessage name={uni} component={(props)=><div className="text-red-500">{props.children}</div>} />

    </>
  );
};

export default InputField;