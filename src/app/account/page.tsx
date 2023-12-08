"use client";

import useFetchUserID from "@/src/utils/hooks/useFetchUserID";

import { SignOut } from "src/utils/helpers/supabase";
import { Button } from "@/src/components/UI/Button/Button";

import { useRouter } from "next/navigation";
import { rootPagePath } from "@/src/pathmap/pathmap";
import NavLayout from "@/src/layouts/NavLayout";

const AccountPage = () => {
	const router = useRouter();
	const { isLoading, userID } = useFetchUserID();

	const handleSignOut = async () => {
		SignOut();
		router.push(rootPagePath);
	};

	return (
		<NavLayout>
			<div>
				Account
				<div>{userID}</div>
				{/* <FoodScanner /> */}
				<Button onClick={handleSignOut}>Sign Out</Button>
			</div>
		</NavLayout>
	);
};

export default AccountPage;
