import React from "react";
import { IButtonProps } from "./types";

const Button: React.FC<IButtonProps> = ({children, className, ...rest}) => {
  return (
    <button {...rest} className={`w-full bg-sky-600 rounded text-white text-sm py-2 hover:opacity-55 ${className}`}>
      {children}
    </button>
  )
}

export default Button