import Image from "next/image";
import React from "react";
import { ICardProps } from "./types";
import Button from "../Button";

const Card: React.FC<ICardProps> = ({img, disabled, title, subtitle , tags, buttonText, onClick, secondButtonText, secondDisabled, secondOnClick}) => {
  return (
    <div className="bg-white w-full border border-slate-300 border-solid overflow-hidden rounded-md mb-5">
      <div className="bg-slate-400 w-full">
        <Image src={img} width={100} height={100} className="w-full" alt={title} />
      </div>
      <div className="container mx-auto bg-white py-3 px-3">
        <h4 className="text-md text-slate-700 my-1">{title}</h4>
        <p className="text-sm text-slate-700 mb-1">{subtitle}</p>
        <div className="flex gap-1 mt-2">
          {tags && tags.map(tag => (
            <span key={tag} className="text-white rounded-md px-1.5 py-0.5 text-xs bg-red-500">{tag}</span>
          ))}
        </div>
        {buttonText && (
          <Button className="mt-4" disabled={disabled!} onClick={onClick!}>
            {buttonText}
          </Button>
        )}
        {secondButtonText && (
          <Button className="mt-4" disabled={secondDisabled!} onClick={secondOnClick!}>
            {secondButtonText}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Card