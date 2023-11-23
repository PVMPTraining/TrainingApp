import { FC, ReactNode } from "react";

/**
 * Props for the Button component.
 */
interface ButtonProps {
	children: React.ReactNode;
	formAction?: string;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
}

/**
 * A reusable button component.
 *
 * @component
 * @param {ButtonProps} props - The button props.
 * @param {ReactNode} props.children - The content of the button.
 * @param {string} props.formAction - The form action for the button.
 * @param {string} props.type - The type of the button.
 * @param {() => void} props.onClick - The click event handler for the button.
 * @returns {JSX.Element} The rendered button element.
 */
const Button: FC<ButtonProps> = ({ children, formAction, type, onClick }) => {
	return (
		<button className="btn" formAction={formAction} onClick={onClick} type={type}>
			{children}
		</button>
	);
};

export default Button;
