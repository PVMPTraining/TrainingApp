import { FC, ButtonHTMLAttributes, ReactNode, HTMLAttributes } from "react";

/**
 * Props for the Card component.
 */
interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

/**
 * Card component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the button.
 * @param {ReactNode} props.children - The content of the button.
 * @returns {JSX.Element} The rendered Button component.
 */
export const Card: FC<CardProps> = ({ className, children, ...props }) => {
	return (
		<div className={["card", className].join(" ")} {...(props as HTMLAttributes<HTMLDivElement>)}>
			{children}
		</div>
	);
};
