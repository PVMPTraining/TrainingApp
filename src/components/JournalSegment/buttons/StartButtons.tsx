import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../../UI/Button/Button";

import { useRouter } from "next/navigation";

type StepButtonsProps = {
	setIsJournalStarted: Dispatch<SetStateAction<boolean>>;
};

const StartButtons: FC<StepButtonsProps> = ({ setIsJournalStarted }) => {
	const router = useRouter();

	return (
		<div className="flex w-full justify-between">
			<Button onClick={() => router.back()}>I'll complete it later</Button>
			<Button onClick={() => setIsJournalStarted(true)}>Let's go!</Button>
		</div>
	);
};

export default StartButtons;
