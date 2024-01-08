import { concatClassName } from "@/src/utils/helpers/functions";
import React, { FC, InputHTMLAttributes, Ref } from "react";

/**
 * Props for the Input component.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	innerRef?: Ref<HTMLInputElement>;
}

/**
 * A reusable input component.
 * @param className - Additional CSS class names for the input element.
 * @param props - Additional props to be spread onto the input element.
 * @returns The input element.
 */
export const Input: FC<InputProps> = ({ className, innerRef, ...props }) => {
	return <input className={concatClassName("input w-full", className)} ref={innerRef} {...props} />;
};

export const InputLarge: FC<InputProps> = ({ className, innerRef, ...props }) => (
	<Input className={concatClassName("input-lg", className)} innerRef={innerRef} {...props} />
);
