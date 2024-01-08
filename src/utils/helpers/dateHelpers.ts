export const formatLongDate = (date: Date): string => {
	const getDayWithSuffix = (day: number): string => {
		return day + (day >= 11 && day <= 13 ? "ᵗʰ" : day % 10 === 1 ? "ˢᵗ" : day % 10 === 2 ? "ⁿᵈ" : day % 10 === 3 ? "ʳᵈ" : "ᵗʰ");
	};

	return `${getDayWithSuffix(date.getDate())} of ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
};

export const padTime = (time: number, length = 2) => String(time).padStart(length, "0");

export const formatTime = ({
	hours = 0,
	minutes = 0,
	seconds = 0,
	milliseconds = 0
}: {
	hours?: number;
	minutes?: number;
	seconds?: number;
	milliseconds?: number;
}) => {
	return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padTime(milliseconds)}`;
};

export const msCountToTime = (ms: number) => {
	const totalSeconds = Math.floor(ms / 100);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	const milliseconds = ms % 100; // This will now correctly capture the remaining milliseconds

	return {
		hours,
		minutes,
		seconds,
		milliseconds
	};
};
