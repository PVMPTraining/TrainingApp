import { FC } from "react";

interface InputProps {
	className?: string;
	type?: string;
	name?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
}

const Input: FC<InputProps> = ({ className, type, name, onChange, value }) => {
	return <input className={"input " + className} type={type} name={name} onChange={onChange} value={value} />;
};

export default Input;
