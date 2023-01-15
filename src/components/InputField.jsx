import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className=" ">
      <div className={`col-span-1  ${rowWise ? 'grid grid-cols-3': 'flex flex-col' }`}>
        <label className=" text-slate-600 col-span-1 flex items-center" htmlFor={uni}>
          {labelName}
        </label>
        <div className={`flex items-center space-x-2   rounded-sm ${rowWise ? 'col-span-2' : 'flex'}`}>
        <input
          maxLength={maxLength}
          disabled={disabled}
          min='0'
          value={value}
          onChange={onChange}
          className={`p-2 w-[100%] bg-blue-100 rounded-lg ${disabled ? 'bg-green-100': ''} ${inputClass}`}
          placeholder={placeholder}
          type={type!=='password' || type===undefined ? type : type==='password' && passVisibility ? 'text' : 'password'}
          id={uni}
          name={uni}
          onBlur={onBlur}
        ></input>
       {type==='password' && passVisibility && <FontAwesomeIcon onClick={()=>hidePass()} className="p-1 cursor-pointer" icon={faEye} size='lg' color="black"/>}
       {type==='password' && !passVisibility && <FontAwesomeIcon onClick={()=>showPass()} className="p-1 cursor-pointer" icon={faEyeSlash} size='lg' color="black"/>}
      </div>
      </div>
      {touched && error && <p className="text-red-500 ">{error}</p>}

    </div>
  );
};

export default InputField;