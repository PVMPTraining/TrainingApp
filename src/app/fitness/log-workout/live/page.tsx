"use client";

import { FC, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchUserExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { ExerciseData } from "@/src/types/types";
import { ComboBox } from "@/src/components/UI/combobox/combobox";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { Field, FieldArray, Form, Formik } from "formik";
import { Card, CardBody } from "@/src/components/UI/Card/Card";
import { Log, LogLevel } from "@/src/utils/helpers/debugLog";
import { AddLoggedWorkout, GetUserID } from "@/src/utils/helpers/supabase";

enum workoutState {
	NOT_STARTED,
	STARTED,
	EXERCISE,
	REST,
	PAUSED,
	FINISHED
}

enum workoutAction {
	START,
	PAUSE,
	RESUME,
	ADD_EXERCISE,
	ADD_SET,
	SKIP_EXERCISE,
	SKIP_SET,
	FINISH_SET,
	FINISH_REST,
	FINISH,
	NONE
}

interface timedWorkout {
	name: string;
	date: Date;
	exercises: timedExercise[];
	time: number;
}

interface timedExercise {
	name: string;
	sets: timedSets[];
	rest: number;
	time: number;
}

interface timedSets {
	reps: number;
	weight: number;
	rest: number;
	time: number;
}

// Constants
const EMPTY_TIMED_SET: timedSets = {
	reps: 0,
	weight: 0,
	rest: 0,
	time: 0
};

const EMPTY_TIMED_EXERCISE: timedExercise = {
	name: "",
	sets: [EMPTY_TIMED_SET],
	rest: 0,
	time: 0
};

const EMPTY_TIMED_WORKOUT: timedWorkout = {
	name: "",
	date: new Date(),
	exercises: [EMPTY_TIMED_EXERCISE],
	time: 0
};

const WORKOUT_COUNTDOWN = 3;
const INIT_TIMER = 0;

/**
 * Represents the page component for user workouts.
 */
const UserWorkoutsPage: FC = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get("workout");

	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	// Workout state
	const [currentWorkoutState, setWorkoutState] = useState<workoutState>(workoutState.NOT_STARTED);

	// Timers
	const [startCountdown, setStartCountdown] = useState<number>(WORKOUT_COUNTDOWN);
	const [workoutTimer, setWorkoutTimer] = useState<number>(-WORKOUT_COUNTDOWN);
	const [exerciseTimer, setExerciseTimer] = useState<number>(-WORKOUT_COUNTDOWN);
	const [setTimer, setSetTimer] = useState<number>(-WORKOUT_COUNTDOWN);
	const [restTimer, setRestTimer] = useState<number>(INIT_TIMER);

	// Workout data
	const [workout, setWorkout] = useState<any>(JSON.parse(search as string));
	const [activeWorkout, setActiveWorkout] = useState<timedWorkout>({ ...EMPTY_TIMED_WORKOUT });
	const [activeExercise, setActiveExercise] = useState<timedExercise>({ ...EMPTY_TIMED_EXERCISE });

	// Workout index state
	const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(INIT_TIMER);
	const [activeSetIndex, setActiveSetIndex] = useState<number>(INIT_TIMER);

	// Workout temp state
	const [isRest, setIsRest] = useState<boolean>(false);
	const [isFinalSet, setIsFinalSet] = useState<boolean>(false);

	const formatTime = ({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) => {
		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	};

	const secondsToHMS = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		return {
			hours,
			minutes,
			seconds: remainingSeconds
		};
	};

	useEffect(() => {
		// console.log(workoutState[currentWorkoutState]);

		switch (currentWorkoutState) {
			case workoutState.NOT_STARTED:
				triggerAction(workoutAction.START);
				break;
			case workoutState.STARTED:
				setWorkoutState(workoutState.EXERCISE);
				break;
			case workoutState.EXERCISE:
				break;
			case workoutState.REST:
				break;
			case workoutState.PAUSED:
				break;
			case workoutState.FINISHED:
		}
	}, [currentWorkoutState]);

	const triggerAction = (triggeredAction: workoutAction) => {
		// console.log(workoutState[currentWorkoutState]);

		switch (triggeredAction) {
			case workoutAction.NONE:
				{
				}
				break;
			case workoutAction.START:
				{
					setActiveExercise(workout.exercises[activeExerciseIndex]);

					let countdownTracker = WORKOUT_COUNTDOWN;
					const countdownInterval = setInterval(() => {
						if (countdownTracker > 0) {
							setStartCountdown(countdownTracker - 1);
							countdownTracker--;
						} else {
							setWorkoutState(workoutState.STARTED);
							clearInterval(countdownInterval);
						}
					}, 1000);
				}
				break;
			case workoutAction.SKIP_EXERCISE:
				{
					const newActiveExerciseIndex = activeExerciseIndex + 1;
					setActiveExercise(workout.exercises[newActiveExerciseIndex]);
					setActiveSetIndex(0);
					setExerciseTimer(0);
					setSetTimer(0);
				}
				break;
			case workoutAction.SKIP_SET:
				{
					setSetTimer(0);

					if (activeSetIndex < activeExercise.sets.length - 1) {
						activeExercise.sets.splice(activeSetIndex, 1);
					} else {
						const newActiveExerciseIndex = activeExerciseIndex + 1;
						setActiveExerciseIndex(newActiveExerciseIndex);
						setActiveExercise(workout.exercises[newActiveExerciseIndex]);

						setActiveSetIndex(0);
						setExerciseTimer(0);
					}
				}
				break;
			case workoutAction.FINISH_SET:
				{
					setIsRest(!isRest);
					setRestTimer(0);
					setWorkoutState(workoutState.REST);
				}
				break;
			case workoutAction.ADD_SET:
				{
					const updatedWorkout = workout;
					updatedWorkout.exercises[activeExerciseIndex].sets.push({
						reps: 0,
						weight: 0,
						rest: 0,
						time: 0
					});
					setWorkout(updatedWorkout);

					setActiveExercise(updatedWorkout.exercises[activeExerciseIndex]);
				}
				break;
			case workoutAction.FINISH_REST:
				{
					finishRest();
					setWorkoutState(workoutState.EXERCISE);
				}
				break;
			case workoutAction.FINISH:
				{
					const finishWorkout = async () => {
						// AddLoggedWorkout((await GetUserID()) as string, activeWorkout);
						console.log(activeWorkout);
					};

					finishWorkout();
				}
				break;
		}
	};

	const finishRest = () => {
		setIsRest(false);
		setSetTimer(0);
		const updatedWorkout = { ...activeWorkout };

		updatedWorkout.name = workout.name;

		if (!updatedWorkout.exercises[activeExerciseIndex]) {
			updatedWorkout.exercises.push({ ...EMPTY_TIMED_EXERCISE });
		}

		if (!updatedWorkout.exercises[activeExerciseIndex].sets[activeSetIndex]) {
			updatedWorkout.exercises[activeExerciseIndex].sets.push({ ...EMPTY_TIMED_SET });
		}

		updatedWorkout.exercises[activeExerciseIndex].name = activeExercise.name;
		updatedWorkout.exercises[activeExerciseIndex].sets[activeSetIndex].reps = activeExercise.sets[activeSetIndex].reps;
		updatedWorkout.exercises[activeExerciseIndex].sets[activeSetIndex].weight = activeExercise.sets[activeSetIndex].weight;
		updatedWorkout.exercises[activeExerciseIndex].sets[activeSetIndex].rest = restTimer;
		updatedWorkout.exercises[activeExerciseIndex].sets[activeSetIndex].time = setTimer;
		updatedWorkout.exercises[activeExerciseIndex].time = exerciseTimer;

		setActiveWorkout(updatedWorkout);

		setIsFinalSet(activeSetIndex === activeExercise.sets.length - 1 && activeExerciseIndex === workout.exercises.length - 1);

		console.log(activeSetIndex, activeExercise.sets.length - 1, activeSetIndex < activeExercise.sets.length - 1);
		if (activeSetIndex < activeExercise.sets.length - 1) {
			setActiveSetIndex(activeSetIndex + 1);
		} else {
			const newActiveExerciseIndex = activeExerciseIndex + 1;
			setActiveExerciseIndex(newActiveExerciseIndex);
			setActiveExercise(workout.exercises[newActiveExerciseIndex]);

			setActiveSetIndex(0);
			setExerciseTimer(0);
		}

		Log(LogLevel.DEBUG, `Updated workout:`, updatedWorkout);
	};

	useEffect(() => {
		const incrementTimer = (timerStateSetter: (value: number | ((prevValue: number) => number)) => void) => {
			timerStateSetter((prevValue: number) => prevValue + 1);
		};

		const workoutInterval = setInterval(() => incrementTimer(setWorkoutTimer), 1000);
		const exerciseInterval = setInterval(() => incrementTimer(setExerciseTimer), 1000);
		const setsInterval = setInterval(() => incrementTimer(setSetTimer), 1000);
		const restInterval = setInterval(() => incrementTimer(setRestTimer), 1000);

		return () => {
			clearInterval(workoutInterval);
			clearInterval(exerciseInterval);
			clearInterval(setsInterval);
			clearInterval(restInterval);
		};
	}, []);

	return (
		<div className="flex flex-col w-screen h-screen justify-center items-center">
			{startCountdown !== 0 && (
				<>
					<div>
						<span className="text-2xl">{workout.name} Workout Starting In:</span>
					</div>
					<span className="countdown font-mono text-6xl">
						<span style={{ "--value": startCountdown } as React.CSSProperties}></span>
					</span>
				</>
			)}
			{startCountdown === 0 && activeExercise && !isRest && (
				<Formik
					initialValues={{
						name: ""
					}}
					onSubmit={() => {}}
				>
					{({ values, errors, touched, setFieldValue }) => (
						<Form>
							<div className="flex flex-col h-screen gap-4 p-4 rounded bg-base-300">
								<div className="flex w-full items-center">
									<div className="w-[6rem]">Workout Timer:</div>
									<Card className="bg-base-200 w-full card-compact">
										<CardBody className="text-center">{formatTime(secondsToHMS(workoutTimer))}</CardBody>
									</Card>
								</div>
								<div className="flex gap-4">
									<div className="flex gap-2 w-1/2 items-center">
										<div className="w-[7rem]">Exercise Timer:</div>
										<Card className="bg-base-200 w-full card-compact">
											<CardBody>{formatTime(secondsToHMS(exerciseTimer))}</CardBody>
										</Card>
									</div>
									<div className="flex gap-2 w-1/2 items-center">
										<div>Set Timer:</div>
										<Card className="bg-base-200 w-full card-compact">
											<CardBody>{formatTime(secondsToHMS(setTimer))}</CardBody>
										</Card>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									{exercises ? (
										<ComboBox
											className="w-full"
											options={exercises.map((exercise: ExerciseData) => exercise.name)}
											selectedCallback={(s) => {
												setActiveExercise((prevExercise: timedExercise) => ({
													...prevExercise,
													sets: prevExercise.sets.map((set, index) => (index === activeSetIndex ? { ...set, name: s } : set))
												}));
											}}
											value={activeExercise.name}
										/>
									) : (
										<Input disabled />
									)}
									<Button
										onClick={() => {
											triggerAction(workoutAction.SKIP_EXERCISE);
										}}
										type="button"
										className="btn-sm bg-red-500"
									>
										Skip Exercise
									</Button>
								</div>
								<FieldArray name={`exercises`}>
									{({ push, remove }) => (
										<>
											<div className="flex flex-col gap-4">
												<div className="flex gap-4 items-center max-w-screen justify-center">
													<div className="flex gap-1 items-center max-w-[33%]">
														<Input
															type="number"
															className="bg-base-200 input-sm text-end"
															placeholder="Reps"
															value={
																isNaN(activeExercise.sets[activeSetIndex].reps)
																	? ""
																	: activeExercise.sets[activeSetIndex].reps.toString()
															}
															onChange={(e) => {
																setActiveExercise((prevExercise: timedExercise) => ({
																	...prevExercise,
																	sets: prevExercise.sets.map((set, index) =>
																		index === activeSetIndex ? { ...set, reps: parseInt(e.target.value) } : set
																	)
																}));
															}}
														/>
														<span className="text-xs">Reps</span>
													</div>
													<div className="flex gap-1 items-center max-w-[33%]">
														<Input
															type="number"
															className="bg-base-200 input-sm text-end"
															placeholder="kg"
															value={
																isNaN(activeExercise.sets[activeSetIndex].weight)
																	? ""
																	: activeExercise.sets[activeSetIndex].weight.toString()
															}
															onChange={(e) => {
																setActiveExercise((prevExercise: timedExercise) => ({
																	...prevExercise,
																	sets: prevExercise.sets.map((set, index) =>
																		index === activeSetIndex ? { ...set, weight: parseInt(e.target.value) } : set
																	)
																}));
															}}
														/>
														<span className="text-xs">Weights (kg)</span>
													</div>
													<div className="flex gap-1 items-center max-w-[33%]">
														<Input
															type="number"
															className="bg-base-200 input-sm text-end"
															placeholder="s"
															value={
																isNaN(activeExercise.sets[activeSetIndex].rest)
																	? ""
																	: activeExercise.sets[activeSetIndex].rest.toString()
															}
															onChange={(e) => {
																setActiveExercise((prevExercise: timedExercise) => ({
																	...prevExercise,
																	sets: prevExercise.sets.map((set, index) =>
																		index === activeSetIndex ? { ...set, rest: parseInt(e.target.value) } : set
																	)
																}));
															}}
														/>
														<span className="text-xs">Rest (s)</span>
													</div>
												</div>
											</div>
										</>
									)}
								</FieldArray>
								<div className="flex items-center gap-1">
									<Field
										type="number"
										name={`exercises.rest`}
										className="input-sm text-end"
										placeholder="Rest After Exercise (s)"
										as={Input}
									/>
									<span>Rest</span>
								</div>
								<Button type="button" onClick={() => triggerAction(workoutAction.FINISH_SET)} className="bg-green-500">
									Done / Rest
								</Button>
								<Button type="button" onClick={() => triggerAction(workoutAction.SKIP_SET)} className="bg-red-500 btn-sm">
									Skip Set
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			)}
			{isRest && (
				<div className="flex justify-center h-sceen w-screen">
					<Button onClick={() => triggerAction(workoutAction.FINISH_REST)} className="flex flex-col w-full h-screen">
						<span className="countdown font-mono text-6xl">
							<span style={{ "--value": secondsToHMS(restTimer).minutes } as React.CSSProperties}></span>:
							<span style={{ "--value": secondsToHMS(restTimer).seconds } as React.CSSProperties}></span>
						</span>
						<div>Touch the sceen to end rest</div>
					</Button>
					{activeSetIndex === activeExercise.sets.length - 1 && (
						<Button
							className="btn-lg bg-base-100 fixed bottom-4 p-5"
							onClick={(e) => {
								e.stopPropagation();
								triggerAction(workoutAction.ADD_SET);
							}}
						>
							+ One More Set
						</Button>
					)}
				</div>
			)}
			{isFinalSet && <Button onClick={() => triggerAction(workoutAction.FINISH)}>Finish Workout</Button>}
		</div>
	);
};

export default UserWorkoutsPage;
