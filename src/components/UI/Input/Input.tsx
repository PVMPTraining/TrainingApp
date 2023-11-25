import React, { FC, InputHTMLAttributes } from "react";

/**
 * Props for the Input component.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * A reusable input component.
 * @param className - Additional CSS class names for the input element.
 * @param props - Additional props to be spread onto the input element.
 * @returns The input element.
 */
export const Input: FC<InputProps> = ({ className, ...props }) => {
	return <input className={["input w-full", className].join(" ")} {...props} />;
};
