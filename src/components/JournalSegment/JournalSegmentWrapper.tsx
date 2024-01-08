import { FC } from "react";
import { useJournalLogic } from "@/src/utils/hooks/useJournalLogic";

import Introduction from "./Introduction";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";

import StepButtons from "./buttons/StepButtons";
import StartButtons from "./buttons/StartButtons";

interface JournalSegmentWrapperProps {}

const JournalSegmentWrapper: FC<JournalSegmentWrapperProps> = ({}) => {
	const { currentStep, isJournalStarted, setIsJournalStarted, setCurrentStep } = useJournalLogic();

	return (
		<div className="p-4 flex flex-col gap-2">
			<p>Step {currentStep} / 3</p>
			{isJournalStarted ? currentStep === 1 ? <StepOne /> : <StepTwo /> : <Introduction />}
			{isJournalStarted ? (
				<StepButtons currentStep={currentStep} setCurrentStep={setCurrentStep} />
			) : (
				<StartButtons setIsJournalStarted={setIsJournalStarted} />
			)}
		</div>
	);
};

export default JournalSegmentWrapper;
