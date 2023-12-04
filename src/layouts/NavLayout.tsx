import { BottomNav } from "@/src/components/bottom-nav/BottomNav";
import { PageHeader } from "@/src/components/page-header/PageHeader";
import React, { ReactNode } from "react";

type NavLayoutProps = {
	children: ReactNode;
};

const NavLayout = ({ children }: NavLayoutProps) => {
	return (
		<div className="flex flex-col min-h-screen">
			<PageHeader />
			<div className="flex-grow flex my-[4rem]">{children}</div>
			<BottomNav />
		</div>
	);
};

export default NavLayout;
