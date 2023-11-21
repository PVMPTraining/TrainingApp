import { FC, ReactNode } from 'react';

interface ButtonProps {
	children: React.ReactNode;
	formAction?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, formAction, type, onClick }) => {
	return <button className='btn' formAction={formAction} onClick={onClick} type={type}>{children}</button>;
};

export default Button;