"use client";

// React
import React, { FC, useState, useEffect, Key, HTMLAttributes } from "react";

// React Icons
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Types
import { Workout, timedExercise, timedSets, timedWorkout } from "@/src/types/fitnessTypes";
import { ExerciseData } from "@/src/types/supabase/exerciseData";

// Helpers
import { msCountToTime, formatTime } from "@/src/utils/helpers/dateHelpers";
import { AddLoggedWorkout, GetUserID } from "@/src/utils/helpers/supabase";
import { useFetchExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { Log, LogLevel } from "@/src/utils/helpers/debugLog";

// UI Components
import { ComboBox } from "@/src/components/UI/ComboBox/ComboBox";
import { Button, ButtonLarge } from "@/src/components/UI/Button/Button";
import { Input, InputLarge } from "@/src/components/UI/Input/Input";
import { Modal } from "@/src/components/UI/Modal/Modal";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from "@/src/components/UI/Drawer/Drawer";

enum workoutState {
	NOT_STARTED,
	STARTED,
	EXERCISE,
	REST,
	PAUSED,
	FULL_VIEW,
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
	OPEN_FULL_VIEW,
	CLOSE_FULL_VIEW,
	NONE
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

interface LiveWorkoutProps extends HTMLAttributes<HTMLElement> {
	workoutProp: Workout;
}

export const LiveWorkout: FC<LiveWorkoutProps> = ({ workoutProp }) => {
	const { isLoading, exercises } = useFetchExercsiseDatabase();

	// Workout state
	const [currentWorkoutState, setWorkoutStateInternal] = useState<workoutState>(workoutState.NOT_STARTED);
	const [prevWorkoutState, setPrevWorkoutState] = useState<workoutState>(workoutState.NOT_STARTED);

	// Countdown
	const [startCountdown, setStartCountdown] = useState<number>(WORKOUT_COUNTDOWN);

	// Timers
	const [workoutTimer, setWorkoutTimer] = useState<number>(-WORKOUT_COUNTDOWN);
	const [exerciseTimer, setExerciseTimer] = useState<number>(-WORKOUT_COUNTDOWN);
	const [setTimer, setSetTimer] = useState<number>(-WORKOUT_COUNTDOWN);
	const [restTimer, setRestTimer] = useState<number>(INIT_TIMER);

	// Workout data
	const [workout, setWorkout] = useState<Workout>(workoutProp);
	const [activeWorkout, setActiveWorkout] = useState<timedWorkout>({ ...EMPTY_TIMED_WORKOUT });
	const [activeExercise, setActiveExerciseInner] = useState<timedExercise>({ ...EMPTY_TIMED_EXERCISE });

	// Workout index state
	const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(INIT_TIMER);
	const [activeSetIndex, setActiveSetIndex] = useState<number>(INIT_TIMER);

	// Workout temp state
	const [isFinalSet, setIsFinalSet] = useState<boolean>(false);

	// Action List
	let availabelAcitons: workoutAction[] = [];

	const setActiveExercise = (e: React.SetStateAction<timedExercise>) => {
		console.log(activeExercise);
		setActiveExerciseInner(e);
	};

	const setWorkoutState = (newWorkoutState: workoutState) => {
		setPrevWorkoutState(currentWorkoutState);
		setWorkoutStateInternal(newWorkoutState);
	};

	useEffect(() => {
		console.log(workoutState[currentWorkoutState]);
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
			case workoutState.FULL_VIEW:
				break;
			case workoutState.PAUSED:
				break;
			case workoutState.FINISHED:
		}
	}, [currentWorkoutState]);

	useEffect(() => {
		switch (currentWorkoutState) {
			case workoutState.NOT_STARTED:
				availabelAcitons = [workoutAction.START];
				break;
			case workoutState.STARTED:
				availabelAcitons = [];
				break;
			case workoutState.EXERCISE:
				availabelAcitons = [
					workoutAction.SKIP_EXERCISE,
					workoutAction.SKIP_SET,
					workoutAction.FINISH_SET,
					workoutAction.OPEN_FULL_VIEW,
					workoutAction.FINISH
				];
				break;
			case workoutState.REST:
				availabelAcitons = [workoutAction.FINISH_REST, workoutAction.ADD_SET, workoutAction.ADD_EXERCISE, workoutAction.OPEN_FULL_VIEW];
				break;
			case workoutState.FULL_VIEW:
				availabelAcitons = [workoutAction.CLOSE_FULL_VIEW];
				break;
			case workoutState.PAUSED:
				break;
			case workoutState.FINISHED:
		}
	}, [availabelAcitons]);

	useEffect(() => {
		const audio = new Audio("/rest_end.mp3");
		if (currentWorkoutState === workoutState.REST && activeExercise.sets[activeSetIndex].rest + 1 === restTimer) {
			audio.play();
		}
	}, [restTimer]);

	const triggerAction = (triggeredAction: workoutAction) => {
		if (!availabelAcitons.includes(triggeredAction)) {
			return;
		}

		switch (triggeredAction) {
			case workoutAction.NONE:
				{
				}
				break;
			case workoutAction.START:
				{
					setActiveExercise(workout.exercises[activeExerciseIndex] as timedExercise);

					let countdownTracker = WORKOUT_COUNTDOWN;
					const countdownInterval = setInterval(() => {
						if (countdownTracker < 0) {
							setWorkoutState(workoutState.STARTED);
							clearInterval(countdownInterval);
						} else {
							setStartCountdown(countdownTracker - 1);
							countdownTracker--;
						}
					}, 1000);
				}
				break;
			case workoutAction.SKIP_EXERCISE:
				{
					const newActiveExerciseIndex = activeExerciseIndex + 1;
					setActiveExercise(workout.exercises[newActiveExerciseIndex] as timedExercise);
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
						setActiveExercise(workout.exercises[newActiveExerciseIndex] as timedExercise);

						setActiveSetIndex(0);
						setExerciseTimer(0);
					}
				}
				break;
			case workoutAction.FINISH_SET:
				{
					setRestTimer(0);
					if (activeExercise.sets[activeSetIndex].rest !== 0) {
						setWorkoutState(workoutState.REST);
					} else {
						triggerAction(workoutAction.FINISH_REST);
					}
				}
				break;
			case workoutAction.ADD_SET:
				{
					const updatedWorkout = workout;
					updatedWorkout.exercises[activeExerciseIndex].sets.push({
						reps: 0,
						weight: 0,
						rest: 0
					});
					setWorkout(updatedWorkout);

					setActiveExercise(updatedWorkout.exercises[activeExerciseIndex] as timedExercise);
				}
				break;
			case workoutAction.FINISH_REST:
				{
					setSetTimer(0);
					const updatedWorkout = { ...activeWorkout };

					if (activeSetIndex === activeExercise.sets.length) {
						updatedWorkout.exercises[activeExerciseIndex].rest = restTimer;
						const newActiveExerciseIndex = activeExerciseIndex + 1;
						setActiveExerciseIndex(newActiveExerciseIndex);
						setActiveExercise(workout.exercises[newActiveExerciseIndex] as timedExercise);

						setActiveSetIndex(0);
						setExerciseTimer(0);
						setWorkoutState(workoutState.EXERCISE);

						setWorkout((prevWorkout: Workout) => {
							const updatedExercises = [...prevWorkout.exercises];
							updatedExercises[activeExerciseIndex].rest = restTimer;
							return { ...prevWorkout, exercises: updatedExercises };
						});

						Log(LogLevel.DEBUG, `Updated workout:`, updatedWorkout);
						return;
					}

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

					// Update workout with the values from the active workout
					setWorkout((prevWorkout: Workout) => {
						const updatedExercises = [...prevWorkout.exercises];
						updatedExercises[activeExerciseIndex].name = activeExercise.name;
						updatedExercises[activeExerciseIndex].sets[activeSetIndex].reps = activeExercise.sets[activeSetIndex].reps;
						updatedExercises[activeExerciseIndex].sets[activeSetIndex].weight = activeExercise.sets[activeSetIndex].weight;
						updatedExercises[activeExerciseIndex].sets[activeSetIndex].rest = restTimer;
						return { ...prevWorkout, exercises: updatedExercises };
					});

					setIsFinalSet(activeSetIndex === activeExercise.sets.length - 1 && activeExerciseIndex === workout.exercises.length - 1);

					console.log(activeSetIndex, activeExercise.sets.length - 1, activeSetIndex < activeExercise.sets.length - 1);
					if (activeSetIndex < activeExercise.sets.length - 1) {
						setActiveSetIndex(activeSetIndex + 1);
						setWorkoutState(workoutState.EXERCISE);
					} else if (activeSetIndex === activeExercise.sets.length - 1) {
						setActiveSetIndex(activeSetIndex + 1);
						if (activeExercise.rest !== 0) {
							triggerAction(workoutAction.FINISH_SET);
						} else {
							const newActiveExerciseIndex = activeExerciseIndex + 1;
							setActiveExerciseIndex(newActiveExerciseIndex);
							setActiveExercise(workout.exercises[newActiveExerciseIndex] as timedExercise);

							setActiveSetIndex(0);
							setExerciseTimer(0);
							setWorkoutState(workoutState.EXERCISE);
						}
					}

					Log(LogLevel.DEBUG, `Updated workout:`, updatedWorkout);
				}
				break;
			case workoutAction.OPEN_FULL_VIEW:
				{
					setWorkoutState(workoutState.FULL_VIEW);
				}
				break;
			case workoutAction.CLOSE_FULL_VIEW:
				{
					setWorkoutState(prevWorkoutState);
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

	useEffect(() => {
		const incrementTimer = (timerStateSetter: (value: number | ((prevValue: number) => number)) => void) => {
			timerStateSetter((prevValue: number) => prevValue + 1);
		};

		const workoutInterval = setInterval(() => incrementTimer(setWorkoutTimer), 1);
		const exerciseInterval = setInterval(() => incrementTimer(setExerciseTimer), 1);
		const setsInterval = setInterval(() => incrementTimer(setSetTimer), 1);
		const restInterval = setInterval(() => incrementTimer(setRestTimer), 1);

		return () => {
			clearInterval(workoutInterval);
			clearInterval(exerciseInterval);
			clearInterval(setsInterval);
			clearInterval(restInterval);
		};
	}, []);

	const moveExerciseUp = (index: number) => {
		if (activeExerciseIndex < index - 1 || (activeExerciseIndex === index - 1 && activeSetIndex === 0)) {
			const updatedWorkout = { ...workout };

			const temp = updatedWorkout.exercises[index];
			updatedWorkout.exercises[index] = updatedWorkout.exercises[index - 1];
			updatedWorkout.exercises[index - 1] = temp;

			setWorkout(updatedWorkout);
			setActiveExercise(updatedWorkout.exercises[activeExerciseIndex] as timedExercise);
		}
	};

	const updateSet = (key: string | number, value: string, i: number = activeExerciseIndex, j: number = activeSetIndex) => {
		if (i === activeExerciseIndex && j === activeSetIndex) {
			setActiveExercise((prevExercise) => ({
				...prevExercise,
				sets: prevExercise.sets.map((set, index) => (index === activeSetIndex ? { ...set, [key]: parseInt(value) } : set))
			}));
		}
		setWorkout((prevWorkout) => {
			const updatedExercises = [...prevWorkout.exercises];
			if (updatedExercises[i] && updatedExercises[i].sets[j]) {
				(updatedExercises[i].sets[j] as any)[key] = parseInt(value);
			}
			return { ...prevWorkout, exercises: updatedExercises };
		});
	};

	const currentSetInputField = (label: string, value: number, key: string) => (
		<div className="flex items-center">
			<InputLarge
				type="number"
				className="bg-base-200 w-full text-end"
				placeholder={label}
				value={isNaN(value) ? "" : value.toString()}
				onChange={(e) => updateSet(key, e.target.value)}
			/>
			<span className="text-xs">{label}</span>
		</div>
	);

	const renderInputField = (label: string, key: number | string, value: number, i: number, j: number) => (
		<div className="flex gap-1 items-center">
			<Input
				type="number"
				className="bg-base-200 input-sm text-end"
				placeholder={label}
				value={isNaN(value) ? "" : value.toString()}
				onChange={(e) => updateSet(key, e.target.value, i, j)}
			/>
			<span className="text-xs">{label}</span>
		</div>
	);

	const setControlButtons: any = [
		{ type: "button", onClick: () => triggerAction(workoutAction.FINISH_SET), className: "bg-green-500", text: "Done / Rest" },
		{ type: "button", onClick: () => triggerAction(workoutAction.SKIP_SET), className: "bg-red-500", text: "Skip Set" },
		{ type: "button", onClick: () => triggerAction(workoutAction.SKIP_EXERCISE), className: "bg-red-500", text: "Skip Exercise" }
	];

	const timers = (
		<div className="fixed top-0 w-full h-36 z-50">
			{startCountdown < 0 && (
				<div className="flex flex-col gap-4 p-4 bg-base-200 rounded-b-3xl">
					<div className="flex w-full gap-2 items-center">
						<div className="w-[5rem]">Workout Timer:</div>
						<div className="bg-base-100 w-full rounded-xl">
							<div className="flex justify-center !py-3">
								<div className="w-[6.5rem]">
									<span className="text-lg">{formatTime(msCountToTime(workoutTimer))}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex gap-2 items-center">
							<div className="w-[7rem]">Exercise Timer:</div>
							<div className="bg-base-100 w-full rounded-xl">
								<div className="flex justify-center !py-3">
									<div className="w-[6.5rem]">
										<span className="text-lg">{formatTime(msCountToTime(exerciseTimer))}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="flex gap-2 items-center">
							<div>Set Timer:</div>
							<div className="bg-base-100 w-full rounded-xl">
								<div className="flex justify-center !py-3">
									<div className="w-[6.5rem]">
										<span className="text-lg">{formatTime(msCountToTime(setTimer))}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);

	const fullView = (
		<Drawer onClose={() => triggerAction(workoutAction.CLOSE_FULL_VIEW)}>
			<div className="fixed bottom-0 w-full bg-base-200 h-16 rounded-t-3xl">
				<div className="flex flex-row justify-between items-center h-full px-12">
					<div>{workout.name}</div>
					<DrawerTrigger
						onClick={() => {
							triggerAction(workoutAction.OPEN_FULL_VIEW);
						}}
					>
						{currentWorkoutState !== workoutState.FULL_VIEW ? <FaChevronUp /> : <FaChevronDown />}
					</DrawerTrigger>
				</div>
			</div>
			<DrawerContent>
				<DrawerHeader className="border-b mx-2">
					<DrawerTitle>Full Workout</DrawerTitle>
					<DrawerDescription>Scroll down to see all exercises</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<div className="flex flex-col gap-4 rounded overflow-scroll max-h-[75vh]">
						{workout.exercises.map((exercise: any, i: Key) => (
							<React.Fragment key={i}>
								<div className="flex gap-2">
									{exercises ? (
										<ComboBox
											className="w-full"
											options={exercises.map((exercise: ExerciseData) => exercise.name)}
											selectedCallback={(selectedExerciseName) => {
												setWorkout((prevWorkout: Workout) => {
													const updatedExercises = [...prevWorkout.exercises];
													updatedExercises[i as number].name = selectedExerciseName;
													return { ...prevWorkout, exercises: updatedExercises };
												});
											}}
											value={exercise.name}
										/>
									) : (
										<Input disabled />
									)}
									{(activeExerciseIndex < (i as number) - 1 || (activeExerciseIndex === (i as number) - 1 && activeSetIndex === 0)) && (
										<Button onClick={() => moveExerciseUp(i as number)}>
											<FaChevronUp />
										</Button>
									)}
								</div>
								{exercise.sets.map((set: any, j: number) => (
									<div key={j} className="grid grid-cols-3 gap-4">
										{renderInputField("Reps", "reps", set?.reps ?? 0, parseInt(i as string), j)}
										{renderInputField("kg", "weight", set?.weight ?? 0, parseInt(i as string), j)}
										{renderInputField("s", "rest", set?.rest ?? 0, parseInt(i as string), j)}
									</div>
								))}
								<div className="flex items-center gap-1">
									<Input
										type="number"
										className="bg-base-200 input-sm text-end"
										placeholder="Rest After Exercise (s)"
										defaultValue={exercise.rest === 0 ? "" : exercise.rest.toString()}
										onChange={(e) => {
											setWorkout((prevWorkout: Workout) => {
												const updatedExercises = [...prevWorkout.exercises];
												updatedExercises[i as number].rest = parseInt(e.target.value);
												return { ...prevWorkout, exercises: updatedExercises };
											});
										}}
									/>
									<span className="text-sm min-w-[3.5rem]">Rest (s)</span>
								</div>
							</React.Fragment>
						))}
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);

	return (
		<div className="flex flex-col min-h-screen">
			{/* Top nav and timers */}
			{timers}

			{/* Exercise Section */}
			<div className="flex-grow flex flex-col mb-16 mt-36">
				{/* Start Countdown */}
				{startCountdown > -1 && (
					<div className="flex-grow flex flex-col justify-center items-center">
						<span className="text-2xl">{workout.name} Workout Starting In:</span>
						<span className="countdown font-mono text-6xl">
							<span style={{ "--value": startCountdown } as React.CSSProperties}></span>
						</span>
					</div>
				)}

				{/* Rest */}
				{currentWorkoutState === workoutState.REST && (
					<div className="flex-grow flex flex-col justify-center">
						<Button
							onClick={() => triggerAction(workoutAction.FINISH_REST)}
							className={"flex-grow flex flex-col" + (activeExercise.sets[activeSetIndex].rest < restTimer ? " bg-error" : " bg-base-100")}
						>
							{activeSetIndex < activeExercise.sets.length - 1 && <div>Set {activeSetIndex + 1} Rest</div>}
							{activeSetIndex === activeExercise.sets.length - 1 && <div>Exercise {activeExerciseIndex + 1} Rest</div>}
							<span className="countdown font-mono text-6xl">
								<span style={{ "--value": msCountToTime(restTimer).minutes } as React.CSSProperties}></span>:
								<span style={{ "--value": msCountToTime(restTimer).seconds } as React.CSSProperties}></span>
							</span>
							<div>Touch the sceen to end rest</div>
						</Button>
						{activeSetIndex === activeExercise.sets.length - 1 && (
							<div className="fixed bottom-20 left-1/2 translate-x-[-50%] flex flex-col gap-2">
								<Button
									className="btn-lg bg-base-200 "
									onClick={(e) => {
										e.stopPropagation();
										triggerAction(workoutAction.ADD_SET);
									}}
								>
									+ One More Set
								</Button>
								<Button
									className="btn-lg bg-base-200"
									onClick={(e) => {
										e.stopPropagation();
										triggerAction(workoutAction.ADD_SET);
									}}
								>
									+ One More Exercise
								</Button>
							</div>
						)}
					</div>
				)}

				{/* Exercise */}
				{startCountdown < 0 && activeExercise && currentWorkoutState !== workoutState.REST && currentWorkoutState !== workoutState.FULL_VIEW && (
					<div className="flex-grow flex flex-col gap-4 p-4 rounded">
						<div className="flex flex-col gap-2">
							{exercises ? (
								<ComboBox
									className="w-full"
									options={exercises.map((exercise: ExerciseData) => exercise.name)}
									selectedCallback={(s) => {
										setActiveExercise((prevExercise: timedExercise) => ({
											...prevExercise,
											name: s
										}));
									}}
									value={activeExercise.name}
								/>
							) : (
								<Input disabled />
							)}
						</div>
						<div className="grid grid-cols-3 gap-4">
							{currentSetInputField("Reps", activeExercise.sets?.[activeSetIndex]?.reps, "reps")}
							{currentSetInputField("kg", activeExercise.sets?.[activeSetIndex]?.weight, "weight")}
							{currentSetInputField("s", activeExercise.sets?.[activeSetIndex]?.rest, "rest")}
						</div>
						{setControlButtons.map(
							({ type, onClick, className, text }: { type: "button"; onClick: () => void; className: string; text: string }, i: number) => (
								<ButtonLarge key={i} type={type} onClick={onClick} className={className}>
									{text}
								</ButtonLarge>
							)
						)}
					</div>
				)}

				{/* Finish or keep going */}
				{isFinalSet && <Button onClick={() => triggerAction(workoutAction.FINISH)}>Finish Workout</Button>}
			</div>

			{/* Bottom nav and fullview */}
			{fullView}
		</div>
	);
};
