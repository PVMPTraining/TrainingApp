import { BottomNav } from "@/src/components/bottom-nav/BottomNav";
import { PageHeader } from "@/src/components/page-header/PageHeader";
import React, { ReactNode } from "react";

type BottomNavProps = {
	children: ReactNode;
};

const BottomNavLayout = ({ children }: BottomNavProps) => {
	return (
		<div className="flex flex-col min-h-screen">
			<PageHeader />
			<div className="flex-grow flex" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
				{children}
			</div>
			<BottomNav />
		</div>
	);
};

export default BottomNavLayout;
