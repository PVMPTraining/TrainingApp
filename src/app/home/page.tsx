"use client";

import { FC } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import { Button } from "@/src/components/UI/Button/Button";

const HomePage: FC = () => {
	return (
		<NavLayout
			header={<div>Home</div>}
			content={
				<div className="flex-grow flex flex-col gap-4 m-4 w-full">
					<div>
						<h1 className="text-4xl font-bold">Welcome to Name!</h1>
						<h2 className="text-2xl">Get ready for a killer day!</h2>
					</div>
					<div>
						<div>Test</div>
					</div>
					<div className="flex flex-wrap gap-2 w-full justify-center">
						<Button className="bg-[url(https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-48 w-[48%] items-start px-0 text-start font-normal">
							<CardBody>
								<span className="text-xl text-shadow-lg shadow-black backdrop-blur-sm">Recepies</span>
							</CardBody>
						</Button>
						<Button className="bg-[url(https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-48 w-[48%] items-start px-0 text-start font-normal">
							<CardBody>
								<span className="text-xl text-shadow-lg shadow-black backdrop-blur-sm">Workouts</span>
							</CardBody>
						</Button>
					</div>
					<div></div>
				</div>
			}
		/>
	);
};

export default HomePage;
