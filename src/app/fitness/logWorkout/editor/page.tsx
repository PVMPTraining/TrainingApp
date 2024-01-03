"use client";

import { FC } from "react";
import { LoggedWorkoutEditor } from "@/src/components/UserWorkouts/LoggedWorkoutEditor/LoggedWorkoutEditor";
import { useSearchParams } from "next/navigation";
import NavLayout from "@/src/layouts/NavLayout";

const LoggedWorkoutEditorPage: FC = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get("workout");

	return <NavLayout header={<div>Editor</div>} content={<LoggedWorkoutEditor loggedUserWorkouts={JSON.parse(search as string)} />} />;
};

export default LoggedWorkoutEditorPage;
