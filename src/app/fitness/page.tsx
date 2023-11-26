"use client";
import { FC } from "react";

// Next
import Link from "next/link";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";

const FitnessPage: FC = () => {
	const router = useRouter();

	return (
		<div className="min-h-screen flex flex-col justify-end gap-4 p-4">
			<div>Welcome to the Fitness Section!</div>
			<Button
				onClick={() => {
					router.push("/fitness/exercises");
				}}
			>
				Exercises
			</Button>
			<Button
				onClick={() => {
					router.push("/fitness/user-workouts");
				}}
			>
				Workouts
			</Button>
			<Button
				onClick={() => {
					router.push("/fitness/tools");
				}}
			>
				Tools
			</Button>
		</div>
	);
};

export default FitnessPage;
