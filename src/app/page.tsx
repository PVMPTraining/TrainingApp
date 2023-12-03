"use client";
import { FC, useEffect } from "react";

// Next
import { useRouter } from "next/navigation";
import { on } from "events";

import { fitnessHomePagePath } from "src/pathmap/pathmap";

const AppPage: FC = () => {
	const router = useRouter();

	useEffect(() => {
		router.push(fitnessHomePagePath);
	}, [router]);

	return <></>;
};

export default AppPage;
