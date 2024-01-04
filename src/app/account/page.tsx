"use client";

import useFetchUserID from "@/src/utils/hooks/useFetchUserID";

import { SignOut } from "src/utils/helpers/supabase";
import { Button } from "@/src/components/UI/Button/Button";

import { useRouter } from "next/navigation";
import { rootPagePath } from "@/src/pathmap/pathmap";

import NavLayout from "@/src/layouts/NavLayout";
import { LanguageSelector } from "@/src/components/LanguageSelector/LanguageSelector";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { LabelsDropdown } from "@/src/components/UI/Labels/LabelsDropdown";
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";

const AccountPage = () => {
	const router = useRouter();
	const strings = useLocalizedStrings();
	const { isLoading, userID } = useFetchUserID();

	const handleSignOut = async () => {
		SignOut();
		router.push(rootPagePath);
	};

	return (
		<NavLayout
			header={<div>{strings.accountPage.account}</div>}
			content={
				<div className="flex-grow flex flex-col m-4">
					<div>{userID}</div>
					<LabelsDropdown topLeftLabel="Language Selection" input={<LanguageSelector />} />
					<Button className="bg-error" onClick={handleSignOut}>
						<span className="text-lg">{strings.accountPage.logout}</span>
					</Button>
				</div>
			}
		></NavLayout>
	);
};

export default AccountPage;
