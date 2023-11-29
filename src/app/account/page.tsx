"use client";
import { FC } from "react";

import CalorieCalculator from "@/src/components/calorie-calculator/CalorieCalculator";
import useFetchUserID from "@/src/utils/hooks/useFetchUserID";
import BodyFatCalculator from "@/src/components/body-fat/BodyFatCalculator";
import FoodScanner from "@/src/components/food-scanner/FoodScanner";

import { SignOut } from "../../utils/helpers/supabase";
import { Button } from "@/src/components/UI/Button/Button";

import { useRouter } from "next/navigation";

const AccountPage: FC = () => {
	const router = useRouter();
	const { isLoading, userID } = useFetchUserID();

	const handleSignOut = async () => {
		SignOut();
		router.push("/");
	};

	return (
		<>
			<div>
				Account
				<div>{userID}</div>
				<FoodScanner />
				<Button onClick={handleSignOut}>Sign Out</Button>
			</div>
		</>
	);
};

export default AccountPage;
