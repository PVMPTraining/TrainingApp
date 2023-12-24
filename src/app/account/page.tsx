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
		<NavLayout
			header={<div>Account</div>}
			content={
				<div className="flex-grow flex flex-col m-4">
					<div>{userID}</div>
					<Button className="bg-error" onClick={handleSignOut}>
						<span className="text-lg">Sign Out</span>
					</Button>
				</div>
			}
		></NavLayout>
	);
};

export default AccountPage;
