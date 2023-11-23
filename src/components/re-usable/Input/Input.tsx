import { FC } from "react";

interface InputProps {
	className?: string;
	placeholder?: string;
	type?: string;
	name?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: any;
}

export const Input: FC<InputProps> = ({ className, placeholder, type, name, onChange, value }) => {
	return <input className={"input w-full " + className} placeholder={placeholder} type={type} name={name} onChange={onChange} value={value} />;
};
