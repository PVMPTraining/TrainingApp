import { useEffect, useState } from "react";

export const useJournalLogic = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [isJournalStarted, setIsJournalStarted] = useState(false);

	return { currentStep, isJournalStarted, setCurrentStep, setIsJournalStarted };
};
