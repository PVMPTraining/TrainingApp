"use client";
import { FC } from "react";

// Next

import { useRouter } from "next/navigation";

import NavLayout from "@/src/layouts/NavLayout";
import Introduction from "@/src/components/JournalSegment/Introduction";
import { useJournalLogic } from "@/src/utils/hooks/useJournalLogic";

import JournalSegmentWrapper from "@/src/components/JournalSegment/JournalSegmentWrapper";

const JournalPage: FC = () => {
	const router = useRouter();

	return (
		<NavLayout
			header={<div>Journal</div>}
			content={
				<div className="flex flex-col flex-grow p-4">
					<JournalSegmentWrapper />
				</div>
			}
		/>
	);
};

export default JournalPage;
