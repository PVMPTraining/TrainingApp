import { Dispatch, FC, SetStateAction } from "react";
import { useJournalLogic } from "@/src/utils/hooks/useJournalLogic";
import StepOne from "./steps/StepOne";

type JournalStepsWrapperProps = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

const JournalStepsWrapper: FC<JournalStepsWrapperProps> = ({ currentStep, setCurrentStep }) => {
	return (
		<div className="flex flex-col gap-5">
			<p>Step {currentStep} / 7</p>
			{currentStep === 1 ? <StepOne /> : currentStep === 2 ? "" : ""}
		</div>
	);
};

export default JournalStepsWrapper;
