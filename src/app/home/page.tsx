"use client";

import { FC } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import { Button } from "@/src/components/UI/Button/Button";

const HomePage: FC = () => {
	const partialBlur: React.CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage: "inherit",
		backgroundSize: "cover",
		backgroundPosition: "center",
		filter: "blur(8px)",
		maskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
		WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 50%)"
	};

	return (
		<NavLayout
			header={<div>Home</div>}
			content={
				<div className="flex-grow flex flex-col gap-4 m-4 w-full">
					<div className="mx-2">
						<h1 className="text-4xl font-bold">Welcome to Name!</h1>
						<h2 className="text-2xl">Get ready for a killer day!</h2>
					</div>
					<div className="flex flex-wrap gap-2 w-full justify-center">
						<Button className="bg-[url(https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-48 w-[48%] items-start px-0 text-start font-normal overflow-hidden relative">
							<div style={partialBlur}></div>
							<CardBody className="relative z-10">
								<span className="text-xl text-shadow-lg shadow-black">Recepies</span>
							</CardBody>
						</Button>
						<Button className="bg-[url(https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-48 w-[48%] items-start px-0 overflow-hidden relative text-start font-normal">
							<div style={partialBlur}></div>
							<CardBody className="relative z-10">
								<span className="text-xl text-shadow-lg shadow-black">Workout</span>
							</CardBody>
						</Button>
						<Button className="bg-[url(https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-48 w-[98%] items-start px-0 text-start font-normal overflow-hidden relative">
							<div style={partialBlur}></div>
							<CardBody className="relative z-10">
								<span className="text-xl text-shadow-lg shadow-black">Workout Programs</span>
							</CardBody>
						</Button>
					</div>
					<div>
						<h1 className="text-2xl font-bold mx-2">Trackers</h1>
					</div>
					<div className="flex flex-wrap gap-2 w-full justify-center">
						<Button className="bg-[url()] bg-cover bg-center card-compact h-48 w-[31%] items-start px-0 text-start font-normal overflow-hidden relative">
							<div style={partialBlur}></div>
							<CardBody className="relative z-10">
								<span className="text-xl text-shadow-lg shadow-black">Water</span>
							</CardBody>
						</Button>
						<Button className="bg-[url()] bg-cover bg-center card-compact h-48 w-[31%] items-start px-0 overflow-hidden relative text-start font-normal">
							<div style={partialBlur}></div>
							<CardBody className="relative z-10">
								<span className="text-xl text-shadow-lg shadow-black">Sleep</span>
							</CardBody>
						</Button>
						<Button className="bg-[url()] bg-cover bg-center card-compact h-48 w-[31%] items-start px-0 overflow-hidden relative text-start font-normal">
							<div style={partialBlur}></div>
							<CardBody className="relative z-10">
								<span className="text-xl text-shadow-lg shadow-black">Weight</span>
							</CardBody>
						</Button>
					</div>
				</div>
			}
		/>
	);
};

export default HomePage;
