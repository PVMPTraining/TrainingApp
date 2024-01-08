import { useJournalLogic } from "@/src/utils/hooks/useJournalLogic";
import { FC, useState } from "react";

import Introduction from "./Introduction";
import JournalStepsWrapper from "./JournalStepsWrapper";

interface JournalSegmentWrapperProps {}

const JournalSegmentWrapper: FC<JournalSegmentWrapperProps> = ({}) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [isJournalStarted, setIsJournalStarted] = useState(false);

	// const { currentStep, isJournalStarted, setIsJournalStarted } = useJournalLogic();

	console.log(isJournalStarted);

	return (
		<div>
			{isJournalStarted ? (
				<JournalStepsWrapper currentStep={currentStep} setCurrentStep={setCurrentStep} />
			) : (
				<Introduction setIsJournalStarted={setIsJournalStarted} />
			)}
		</div>
	);
};

export default JournalSegmentWrapper;
