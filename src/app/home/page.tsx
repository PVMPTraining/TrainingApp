"use client";

import { FC } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { Card, CardBody } from "@/src/components/UI/Card/Card";

const HomePage: FC = () => {
	return (
		<NavLayout
			header={<div>Home</div>}
			content={
				<div>
					<Card className="bg-base-200">
						<CardBody>Recepies</CardBody>
					</Card>
				</div>
			}
		/>
	);
};

export default HomePage;
