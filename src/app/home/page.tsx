"use client";
import { FC } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";

const HomePage: FC = () => {
	return (
		<NavLayout>
			<div className="flex-grow flex flex-col gap-2 justify-end p-8"></div>
		</NavLayout>
	);
};

export default HomePage;
