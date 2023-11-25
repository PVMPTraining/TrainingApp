"use client";
import { FC } from "react";

// Next
import Link from "next/link";
import { Button } from "@/src/components/re-usable/Button/Button";

const HomePage: FC = () => {
	return (
		<>
			<div className="min-h-screen flex flex-col justify-end gap-4 p-8">
				<Button>FITNESS</Button>
			</div>
		</>
	);
};

export default HomePage;
