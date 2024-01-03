"use client";

import { fitnessHomePagePath, homePagePath, nutritionHomePagePath } from "@/src/pathmap/pathmap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ButtonHTMLAttributes } from "react";
import { FaDumbbell, FaHome } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";

interface BottomNavProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BottomNav: FC<BottomNavProps> = () => {
	const currentPath = usePathname();

	return (
		<div className="btm-nav bg-base-200 text-3xl z-50 rounded-t-3xl">
			<Link href={fitnessHomePagePath} className={currentPath === fitnessHomePagePath ? "text-accent border-hidden" : ""}>
				<FaDumbbell />
			</Link>
			<Link href={homePagePath} className={currentPath === homePagePath ? "text-accent border-hidden" : ""}>
				<FaHome />
			</Link>
			<Link href={nutritionHomePagePath} className={currentPath === nutritionHomePagePath ? "text-accent border-hidden" : ""}>
				<FaBowlFood />
			</Link>
		</div>
	);
};
