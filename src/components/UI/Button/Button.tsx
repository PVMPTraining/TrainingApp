import { concatClassName } from "@/src/utils/helpers/functions";
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
export const Button: FC<ButtonProps> = ({ className, children, ...props }: ButtonProps): JSX.Element => {
	return (
		<button className={concatClassName("btn text-white", className)} {...props}>
			{children}
		</button>
	);
};

export const ButtonSmall: FC<ButtonProps> = ({ className, children, ...props }: ButtonProps): JSX.Element => {
	return (
		<Button className={concatClassName("btn-sm", className)} {...props}>
			{children}
		</Button>
	);
};

/**
 * Renders a circular button.
 *
 * @component
 * @param {ButtonProps} props - The button props.
 * @returns {JSX.Element} - The rendered circular button.
 */
export const ButtonCircle: FC<ButtonProps> = ({ className, children, ...props }: ButtonProps): JSX.Element => {
	return (
		<Button className={concatClassName("btn-circle", className)} {...props}>
			{children}
		</Button>
	);
};
