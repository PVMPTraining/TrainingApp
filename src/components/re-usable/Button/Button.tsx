import { FC, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Props for the Button component.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

/**
 * Button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the button.
 * @param {ReactNode} props.children - The content of the button.
 * @returns {JSX.Element} The rendered Button component.
 */
export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
	return (
		<button className={["btn", className].join(" ")} {...props}>
			{children}
		</button>
	);
};
