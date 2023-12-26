export const formatLongDate = (date: Date): string => {
	const getDayWithSuffix = (day: number): string => {
		return day + (day >= 11 && day <= 13 ? "ᵗʰ" : day % 10 === 1 ? "ˢᵗ" : day % 10 === 2 ? "ⁿᵈ" : day % 10 === 3 ? "ʳᵈ" : "ᵗʰ");
	};

	return `${getDayWithSuffix(date.getDate())} of ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
};

export const formatTimeHHMMSS = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const convertSecondsToTime = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	return {
		hours,
		minutes,
		seconds: remainingSeconds
	};
};
