import { concatClassName } from "@/src/utils/helpers/functions";
import { FC, ButtonHTMLAttributes, ReactNode, HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
}

export const Skeleton: FC<SkeletonProps> = ({ className, children, ...props }: SkeletonProps): JSX.Element => {
	return (
		<div className={concatClassName("skeleton", className)} {...props}>
			{children}
		</div>
	);
};
