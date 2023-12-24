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
	const randomX = Math.floor(Math.random() * 100);
	const randomY = Math.floor(Math.random() * 100);

	const backgroundStyles = {
		background: `radial-gradient(farthest-corner at ${randomX}% ${randomY}%, rgba(84, 226, 16, 1) -150%, rgba(18, 18, 18, 1) 100%)`
	};

	return (
		<div className={["card", className].join(" ")} {...(props as HTMLAttributes<HTMLDivElement>)} style={backgroundStyles}>
			{children}
		</div>
	);
};

interface CardBodyProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const CardBody: FC<CardBodyProps> = ({ className, children, ...props }) => {
	return (
		<div className={["card-body", className].join(" ")} {...(props as HTMLAttributes<HTMLDivElement>)}>
			{children}
		</div>
	);
};
