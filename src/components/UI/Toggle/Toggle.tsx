import React, { FC, InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Toggle: FC<ToggleProps> = ({ className, ...props }) => {
	return <input type="checkbox" className={["toggle", className].join(" ")} {...props} />;
};
