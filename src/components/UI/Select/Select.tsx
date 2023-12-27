import React, { FC, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: React.ReactNode;
}

export const Select: FC<SelectProps> = ({ options, className, ...props }) => {
	return (
		<select className={["select select-bordered w-full", className].join(" ")} {...props}>
			{options}
		</select>
	);
};
