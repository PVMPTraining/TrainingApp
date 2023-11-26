"use client";

import { FC } from "react";
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { useRouter } from "next/navigation";

const UserWorkoutsPage: FC = () => {
	const router = useRouter();
	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	return (
		<div className="flex flex-col justify-center gap-4 m-4">
			<div className="flex items-center gap-2 bg-base-300 rounded p-2">
				<Button
					onClick={() => {
						router.back();
					}}
				>
					BACK
				</Button>
				<h1 className="w-full uppercase text-center">Exercises</h1>
			</div>
			<Input className="bg-base-200" />
			<div className="flex flex-wrap gap-2 justify-center">
				{exercises.map((exercise: any, index: number) => {
					return (
						<Card key={index} className="bg-base-200 w-[48%]">
							<CardBody>
								<div>{exercise.name}</div>
							</CardBody>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default UserWorkoutsPage;
