import { FC, ReactNode } from 'react';

interface ButtonProps {
	children: React.ReactNode;
	formAction?: string;
	onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, formAction, onClick }) => {
	return <button className='btn' formAction={formAction} onClick={onClick}>{children}</button>;
};

export default Button;