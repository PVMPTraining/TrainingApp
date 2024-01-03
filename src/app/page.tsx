"use client";
import { FC, useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

import { authPagePath } from "src/pathmap/pathmap";

const AppPage: FC = () => {
	const router = useRouter();

	useEffect(() => {
		router.push(authPagePath);
	}, []);

	return <></>;
};

export default AppPage;
