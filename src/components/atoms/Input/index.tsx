import React from "react";
import { IInputProps } from "./types";

const Input: React.FC<IInputProps> = ({className, ...rest}) => {
  return (
    <input 
      {...rest}
      className={`w-full outline-none border text-slate-700 border-solid border-slate-300 pl-2 text-md py-2 rounded ${className}`}
    />
  )
}

export default Input