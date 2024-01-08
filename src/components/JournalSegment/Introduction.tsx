import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../UI/Button/Button";
import { useJournalLogic } from "@/src/utils/hooks/useJournalLogic";

type IntroductionProps = {
	// setIsJournalStarted: Dispatch<SetStateAction<boolean>>;
};

const Introduction: FC<IntroductionProps> = ({}) => {
	const { setIsJournalStarted, isJournalStarted } = useJournalLogic();

	console.log(isJournalStarted);

	return (
		<div className="flex flex-col gap-5">
			<p>So, what&apos;s this journal all about?</p>
			<p>
				Unleash the full potential of our app with our free personalized journal! Answer a few quick questions (it takes about 3 minutes) about you and
				your goals and we&apos;ll tailor the app just for you. Once you complete the journal, you&apos;ll unlock access to these amazing features:
			</p>
			<ul>
				<li>Track your daily calories/macros</li>
				<li>Bla bla</li>
				<li>Bla bla</li>
				<li>Bla bla</li>
				<li>Bla bla</li>
				<li>Bla bla</li>
				<li>Bla bla</li>
				<li>Bla bla</li>
			</ul>
			<div className="flex w-full justify-between">
				<Button>I&apos;ll complete it later</Button>
				<Button onClick={() => setIsJournalStarted(true)}>Let&apos;s go!</Button>
			</div>
		</div>
	);
};

export default Introduction;
