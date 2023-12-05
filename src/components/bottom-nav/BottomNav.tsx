"use client";

import { fitnessHomePagePath, homePagePath, nutritionHomePagePath } from "@/src/pathmap/pathmap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ButtonHTMLAttributes, useState, useEffect } from "react";
import { FaDumbbell, FaHome } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";

interface BottomNavProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const BottomNav: FC<BottomNavProps> = () => {
	const currentPath = usePathname();

	return (
		<div className="btm-nav bg-base-200">
			<Link href={fitnessHomePagePath} className={currentPath === fitnessHomePagePath ? "active" : ""}>
				<FaDumbbell />
			</Link>
			<Link href={homePagePath} className={currentPath === homePagePath ? "active" : ""}>
				<FaHome />
			</Link>
			<Link href={nutritionHomePagePath} className={currentPath === nutritionHomePagePath ? "active" : ""}>
				<FaBowlFood />
			</Link>
		</div>
	);
};
