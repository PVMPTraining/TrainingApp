import { BottomNav } from "@/src/components/BottomNav/BottomNav";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import React, { ReactNode } from "react";

type BottomNavProps = {
	header: ReactNode;
	content: ReactNode;
};

const NavLayout = ({ header, content }: BottomNavProps) => {
	return (
		<div className="flex flex-col min-h-screen">
			<PageHeader>{header}</PageHeader>
			<div className="flex-grow flex" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
				{content}
			</div>
			<BottomNav />
		</div>
	);
};

export default NavLayout;
