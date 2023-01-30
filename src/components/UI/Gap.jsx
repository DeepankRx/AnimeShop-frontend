import React from "react";

const Gap = (props) => {
    const className = props.className === undefined ? "" : props.className;
    return (
     <div
        className={`flex-none flex items-center justify-center text-white font-semibold ${className} my-4`}
      >
        <div className="rounded-lg bg-primary px-6 py-1.5 w-64 text-center ">
          {props.children}
        </div>
        <div className="w-[100%] bg-primary h-1"></div>
      </div>
    );
  };
export default Gap;