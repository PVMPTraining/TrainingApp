"use client";

import { FC } from "react";
import { LoggedWorkoutEditor } from "@/src/components/UserWorkouts/LoggedWorkoutEditor/LoggedWorkoutEditor";
import { useSearchParams } from "next/navigation";
import NavLayout from "@/src/layouts/NavLayout";
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";

const LoggedWorkoutEditorPage: FC = () => {
	const strings = useLocalizedStrings();
	const searchParams = useSearchParams();
	const search = searchParams.get("workout");

	return (
		<NavLayout header={<div>{strings.logWorkoutEditor.header}</div>} content={<LoggedWorkoutEditor loggedUserWorkouts={JSON.parse(search as string)} />} />
	);
};

export default LoggedWorkoutEditorPage;
