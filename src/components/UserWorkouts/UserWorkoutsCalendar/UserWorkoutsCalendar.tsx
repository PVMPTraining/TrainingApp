import useFetchLoggedUserWorkouts from "@/src/utils/hooks/useFetchLoggedUserWorkouts";
import { FC, ButtonHTMLAttributes, Key, useState, useEffect, HTMLAttributes } from "react";
import { Card, CardBody } from "src/components/UI/Card/Card";
import Calendar from "react-calendar";
import "./CustomCalendarStyles.css";
import { concatClassName } from "@/src/utils/helpers/functions";

interface UserWorkoutsCalendarProps extends HTMLAttributes<HTMLElement> {
	dateChangeCallback: (newDate: any) => void;
}

export const UserWorkoutsCalendar: FC<UserWorkoutsCalendarProps> = ({ className, dateChangeCallback, ...props }: UserWorkoutsCalendarProps) => {
	const { isLoading, loggedUserWorkouts } = useFetchLoggedUserWorkouts();
	const [date, setDate] = useState(new Date());

	const onDateChange = (newDate: Date) => {
		setDate(newDate);
		dateChangeCallback(newDate);
		// Additional logic here if needed
	};

	const workoutsForSelectedDate = loggedUserWorkouts.filter((workout: any) => new Date(workout.date).toDateString() === date.toDateString());

	return (
		<Card className={concatClassName("bg-base-200", className)} {...props}>
			<CardBody>
				<Calendar
					onChange={(e) => onDateChange(e as Date)}
					value={date}
					tileContent={({ date, view }) => {
						const workouts = loggedUserWorkouts.filter((workout: any) => new Date(workout.date).toDateString() === date.toDateString());
						return workouts.map((workout: any, index: number) => <div key={index}>{workout.name}</div>);
					}}
					tileClassName={({ date, view }) => {
						const workouts = loggedUserWorkouts.filter((workout: any) => new Date(workout.date).toDateString() === date.toDateString());
						return workouts.map((workout: any, index: number) => "bg-accent text-black");
					}}
				/>
				<div>{isLoading ? <p>Loading...</p> : workoutsForSelectedDate.map((workout: any, index: number) => <div key={index}>{workout.name}</div>)}</div>
			</CardBody>
		</Card>
	);
};
