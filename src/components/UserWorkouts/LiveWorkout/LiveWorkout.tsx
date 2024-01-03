"use client";

import React from "react";
import { Workout, timedExercise, timedSets, timedWorkout } from "@/src/types/fitnessTypes";
import { useFetchExercsiseDatabase } from "@/src/utils/hooks/useFetchExercsieDatabase";
import { AddLoggedWorkout, GetUserID } from "@/src/utils/helpers/supabase";
import { FC, useState, useEffect, Key, HTMLAttributes } from "react";
import { ComboBox } from "@/src/components/UI/ComboBox/ComboBox";
import { Log, LogLevel } from "@/src/utils/helpers/debugLog";
import { Button } from "@/src/components/UI/Button/Button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Field, FieldArray, Form, Formik } from "formik";
import { Input } from "@/src/components/UI/Input/Input";
import { Modal } from "@/src/components/UI/Modal/Modal";
import { ExerciseData } from "@/src/types/supabase/exerciseData";
import { formatTimeHHMMSS, convertSecondsToTime } from "@/src/utils/helpers/dateHelpers";

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
	const [activeExercise, setActiveExercise] = useState<timedExercise>({ ...EMPTY_TIMED_EXERCISE });

	// Workout index state
	const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(INIT_TIMER);
	const [activeSetIndex, setActiveSetIndex] = useState<number>(INIT_TIMER);

	// Workout temp state
	const [isFinalSet, setIsFinalSet] = useState<boolean>(false);

	// Action List
	let availabelAcitons: workoutAction[] = [];

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
						AddLoggedWorkout((await GetUserID()) as string, activeWorkout);
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

	return (
		<div className="flex flex-col min-h-screen">
			{startCountdown < 0 && (
				<div className="fixed top-0 w-full flex flex-col gap-4 p-4 bg-base-300 h-36 z-50">
					<div className="flex w-full items-center">
						<div className="w-[6rem]">Workout Timer:</div>
						<div className="bg-base-200 w-full rounded-xl">
							<div className="text-center !py-3">
								<span className="text-lg">{formatTimeHHMMSS(convertSecondsToTime(workoutTimer))}</span>
							</div>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex gap-2 w-1/2 items-center">
							<div className="w-[7rem]">Exercise Timer:</div>
							<div className="bg-base-200 w-full px-2 rounded-xl">
								<div className="text-center !py-3">
									<span className="text-lg">{formatTimeHHMMSS(convertSecondsToTime(exerciseTimer))}</span>
								</div>
							</div>
						</div>
						<div className="flex gap-2 w-1/2 items-center">
							<div>Set Timer:</div>
							<div className="bg-base-200 w-full px-2 rounded-xl">
								<div className="text-center !py-3">
									<span className="text-lg">{formatTimeHHMMSS(convertSecondsToTime(setTimer))}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className={"flex-grow flex flex-col" + (startCountdown < 0 ? " mb-16 mt-36" : "")}>
				{startCountdown > -1 && (
					<div className="flex-grow flex flex-col justify-center items-center">
						<div>
							<span className="text-2xl">{workout.name} Workout Starting In:</span>
						</div>
						<span className="countdown font-mono text-6xl">
							<span style={{ "--value": startCountdown } as React.CSSProperties}></span>
						</span>
					</div>
				)}
				{currentWorkoutState === workoutState.REST && (
					<div className="flex-grow flex flex-col justify-center">
						<Button
							onClick={() => triggerAction(workoutAction.FINISH_REST)}
							className={"flex-grow flex flex-col" + (activeExercise.sets[activeSetIndex].rest < restTimer ? " bg-error" : " bg-base-100")}
						>
							{activeSetIndex < activeExercise.sets.length - 1 && <div>Set {activeSetIndex + 1} Rest</div>}
							{activeSetIndex === activeExercise.sets.length - 1 && <div>Exercise {activeExerciseIndex + 1} Rest</div>}
							<span className="countdown font-mono text-6xl">
								<span style={{ "--value": convertSecondsToTime(restTimer).minutes } as React.CSSProperties}></span>:
								<span style={{ "--value": convertSecondsToTime(restTimer).seconds } as React.CSSProperties}></span>
							</span>
							<div>Touch the sceen to end rest</div>
						</Button>
						{activeSetIndex === activeExercise.sets.length - 1 && (
							<Button
								className="btn-lg bg-base-200 fixed bottom-20 left-1/2 translate-x-[-50%]"
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
				{startCountdown < 0 && activeExercise && currentWorkoutState !== workoutState.REST && currentWorkoutState !== workoutState.FULL_VIEW && (
					<Formik
						initialValues={{
							name: ""
						}}
						onSubmit={() => {}}
					>
						{({ values, errors, touched, setFieldValue }) => (
							<Form className="flex-grow flex">
								<div className="flex-grow flex flex-col gap-4 p-4 rounded bg-base-300">
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
									<Button type="button" onClick={() => triggerAction(workoutAction.FINISH_SET)} className="bg-green-500 grow-[5]">
										Done / Rest
									</Button>
									<Button type="button" onClick={() => triggerAction(workoutAction.SKIP_SET)} className="bg-red-500 flex-grow btn-sm">
										Skip Set
									</Button>
									<Button
										type="button"
										onClick={() => {
											triggerAction(workoutAction.SKIP_EXERCISE);
										}}
										className="btn-sm bg-red-500 flex-grow"
									>
										Skip Exercise
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				)}
				{isFinalSet && <Button onClick={() => triggerAction(workoutAction.FINISH)}>Finish Workout</Button>}
				{currentWorkoutState === workoutState.FULL_VIEW && (
					<Formik
						initialValues={{
							name: ""
						}}
						onSubmit={() => {}}
					>
						{({ values, errors, touched, setFieldValue }) => (
							<Form>
								<div className="flex flex-col gap-4 p-4 rounded bg-base-300">
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
												{(activeExerciseIndex < (i as number) - 1 ||
													(activeExerciseIndex === (i as number) - 1 && activeSetIndex === 0)) && ( // Conditionally render the button if it's not the top component
													<Button onClick={() => moveExerciseUp(i as number)}>
														<FaChevronUp />
													</Button>
												)}
											</div>
											<FieldArray name={`exercises`}>
												{({ push, remove }) => (
													<>
														{exercise.sets.map((set: any, j: number) => (
															<div key={j} className="flex flex-col gap-4">
																<div className="flex gap-4 items-center max-w-screen justify-center">
																	<div className="flex gap-1 items-center max-w-[33%]">
																		<Input
																			type="number"
																			className="bg-base-200 input-sm text-end"
																			placeholder="Reps"
																			value={isNaN(set.reps) ? "" : set.reps.toString()}
																			onChange={(e) => {
																				if (i === activeExerciseIndex && j === activeSetIndex) {
																					setActiveExercise((prevExercise: timedExercise) => ({
																						...prevExercise,
																						sets: prevExercise.sets.map((set, index) =>
																							index === activeSetIndex
																								? { ...set, reps: parseInt(e.target.value) }
																								: set
																						)
																					}));
																				}
																				setWorkout((prevWorkout: Workout) => {
																					const updatedExercises = [...prevWorkout.exercises];
																					updatedExercises[i as number].sets[j as number].reps = parseInt(
																						e.target.value
																					);
																					return { ...prevWorkout, exercises: updatedExercises };
																				});
																			}}
																		/>
																		<span className="text-xs">Reps</span>
																	</div>
																	<div className="flex gap-1 items-center max-w-[33%]">
																		<Input
																			type="number"
																			className="bg-base-200 input-sm text-end"
																			placeholder="kg"
																			value={isNaN(set.weight) ? "" : set.weight.toString()}
																			onChange={(e) => {
																				if (i === activeExerciseIndex && j === activeSetIndex) {
																					setActiveExercise((prevExercise: timedExercise) => ({
																						...prevExercise,
																						sets: prevExercise.sets.map((set, index) =>
																							index === activeSetIndex
																								? { ...set, weight: parseInt(e.target.value) }
																								: set
																						)
																					}));
																					setWorkout((prevWorkout: Workout) => {
																						const updatedExercises = [...prevWorkout.exercises];
																						updatedExercises[i as number].sets[j as number].weight = parseInt(
																							e.target.value
																						);
																						return { ...prevWorkout, exercises: updatedExercises };
																					});
																				}
																			}}
																		/>
																		<span className="text-xs">Weights (kg)</span>
																	</div>
																	<div className="flex gap-1 items-center max-w-[33%]">
																		<Input
																			type="number"
																			className="bg-base-200 input-sm text-end"
																			placeholder="s"
																			value={isNaN(set.rest) ? "" : set.rest.toString()}
																			onChange={(e) => {
																				if (i === activeExerciseIndex && j === activeSetIndex) {
																					setActiveExercise((prevExercise: timedExercise) => ({
																						...prevExercise,
																						sets: prevExercise.sets.map((set, index) =>
																							index === activeSetIndex
																								? { ...set, weight: parseInt(e.target.value) }
																								: set
																						)
																					}));
																					setWorkout((prevWorkout: Workout) => {
																						const updatedExercises = [...prevWorkout.exercises];
																						updatedExercises[i as number].sets[j as number].rest = parseInt(
																							e.target.value
																						);
																						return { ...prevWorkout, exercises: updatedExercises };
																					});
																				}
																			}}
																		/>
																		<span className="text-xs">Rest (s)</span>
																	</div>
																</div>
															</div>
														))}
													</>
												)}
											</FieldArray>
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
										</React.Fragment>
									))}
								</div>
							</Form>
						)}
					</Formik>
				)}
			</div>
			<div className="fixed bottom-0 w-full bg-base-200 h-16">
				<div className="flex flex-row justify-between items-center h-full px-12">
					<div>{workout.name}</div>
					{currentWorkoutState !== workoutState.FULL_VIEW && (
						<Button type="button" onClick={() => triggerAction(workoutAction.OPEN_FULL_VIEW)}>
							<FaChevronUp />
						</Button>
					)}
					{currentWorkoutState == workoutState.FULL_VIEW && (
						<Button type="button" onClick={() => triggerAction(workoutAction.CLOSE_FULL_VIEW)}>
							<FaChevronDown />
						</Button>
					)}
				</div>
			</div>
			<Modal
				openModal={false}
				closeModalCallback={function (close: boolean): void {
					throw new Error("Function not implemented.");
				}}
			>
				<div>Test</div>
			</Modal>
		</div>
	);
};
