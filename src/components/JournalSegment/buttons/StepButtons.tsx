import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../../UI/Button/Button";

type StepButtonsProps = {
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<number>>;
};

const StepButtons: FC<StepButtonsProps> = ({ currentStep, setCurrentStep }) => {
	return (
		<div className={`flex w-full ${currentStep === 1 ? "justify-end" : "justify-between"}`}>
			{currentStep !== 1 ? <Button onClick={() => setCurrentStep((prev) => prev - 1)}>Previous step</Button> : null}
			<Button onClick={() => setCurrentStep((prev) => prev + 1)}>Next step</Button>
		</div>
	);
};

export default StepButtons;
