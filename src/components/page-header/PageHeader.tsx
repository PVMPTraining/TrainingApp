"use client";

import { accountPagePath } from "@/src/pathmap/pathmap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { FaChevronLeft, FaUser } from "react-icons/fa";
import { Button } from "src/components/UI/Button/Button";

interface PageHeaderProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({ children }: PageHeaderProps) => {
	const router = useRouter();

	return (
		<div className="fixed top-0 bg-base-200 h-[4rem] w-screen flex justify-between items-center px-4">
			<Button
				className="btn btn-circle bg-base-100"
				onClick={() => {
					router.back();
				}}
			>
				<FaChevronLeft />
			</Button>
			{children}
			<Link className="btn btn-circle bg-base-100" href={accountPagePath}>
				<FaUser />
			</Link>
		</div>
	);
};
