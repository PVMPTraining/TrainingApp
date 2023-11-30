"use client";
import { FC } from "react";
import { RootState } from "@/src/utils/redux/store";
import { useSelector } from "react-redux";
import Link from "next/link";

const FoodDetailsPage: FC = () => {
	const { currentFood, keywordValue } = useSelector((state: RootState) => state.foodFetch);

	console.log(currentFood);

	return (
		<>
			<div className="min-h-screen flex flex-col justify-end gap-4 p-8">
				<Link href={"/nutrition/tools"}>Back {keywordValue} search results</Link>
				<div>{currentFood?.description}</div>
			</div>
		</>
	);
};

export default FoodDetailsPage;
