"use client";

import { CustomButtonProps } from "@/types";
import Image from "next/image";

const CustomButton = ({ title, containerStyles, textStyles, rightIcon, handleClick, btnType }: CustomButtonProps) => {
  return (
    <button
        disabled={false}
        type={btnType}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}
    >
        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>
    </button>
  )
}

export default CustomButton