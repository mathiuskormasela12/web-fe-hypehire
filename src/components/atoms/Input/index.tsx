import React from "react";
import { IInputProps } from "./types";

const Input: React.FC<IInputProps> = ({className, errorMessage, ...rest}) => {
  return (
    <>
      <input 
        {...rest}
        className={`w-full outline-none border text-slate-700 border-solid invalid:border-red-500 ${errorMessage ? 'border-red-500' : ''} border-slate-300 pl-2 text-md py-2 rounded ${className}`}
      />
      {errorMessage && (
        <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
      )}
    </>
  )
}

export default Input