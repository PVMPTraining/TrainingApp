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

const UserWorkoutsPage: FC = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get("workout");

	const { isLoading, exercises } = useFetchUserExercsiseDatabase();

	const [workoutTimer, setWorkoutTimer] = useState<number>(-3);
	const [exerciseTimer, setExerciseTimer] = useState<number>(-3);
	const [setTimer, setSetTimer] = useState<number>(-3);

	const [startCountdown, setStartCountdown] = useState<number>(3);

	const [workout, setWorkout] = useState<any>(JSON.parse(search as string));
	const [activeWorkout, setActiveWorkout] = useState<any>({
		name: "",
		exercises: [
			{
				name: "",
				sets: [
					{
						reps: 0,
						weight: 0,
						rest: 0,
						time: 0
					}
				],
				rest: 0,
				time: 0
			}
		],
		time: 0
	});

	const [activeExercise, setActiveExercise] = useState<any>({
		name: "",
		sets: [
			{
				reps: 0,
				weight: 0,
				rest: 0,
				time: 0
			}
		],
		rest: 0,
		time: 0
	});

	const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
	const [activeSetIndex, setActiveSetIndex] = useState<number>(0);
	const [restTimer, setRestTimer] = useState<number>(0);
	const [isRest, setIsRest] = useState<boolean>(false);
	const [isFinalSet, setIsFinalSet] = useState<boolean>(false);

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;
		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
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

	const finishRest = () => {
		setIsRest(false);
		setSetTimer(0);

		const updatedWorkout = { ...activeWorkout };
		Log(LogLevel.DEBUG, `Updated workout:`, updatedWorkout);

		updatedWorkout.name = workout.name;

		console.log(updatedWorkout.exercises[activeExerciseIndex]);
		updatedWorkout.exercises[activeExerciseIndex] = {
			name: "",
			sets: [
				{
					reps: 0,
					weight: 0,
					rest: 0,
					time: 0
				}
			],
			rest: 0,
			time: 0
		};

		updatedWorkout.exercises[activeExerciseIndex].name = activeExercise.name;
		updatedWorkout.exercises[activeExerciseIndex].sets[activeSetIndex] = activeExercise.sets[activeSetIndex];
		updatedWorkout.exercises[activeExerciseIndex].sets[activeSetIndex].time = setTimer;
		updatedWorkout.exercises[activeExerciseIndex].sets[activeSetIndex].rest = restTimer;
		updatedWorkout.exercises[activeExerciseIndex].time = exerciseTimer;

		setIsFinalSet(activeSetIndex === activeExercise.sets.length - 1 && activeExerciseIndex === workout.exercises.length - 1);

		if (activeSetIndex < activeExercise.sets.length - 1) {
			setActiveSetIndex(activeSetIndex + 1);
		} else {
			const newActiveExerciseIndex = activeExerciseIndex + 1;
			setActiveExerciseIndex(newActiveExerciseIndex);
			setActiveExercise(workout.exercises[newActiveExerciseIndex]);
			setActiveSetIndex(0);
			setExerciseTimer(0);
		}

		setActiveWorkout(updatedWorkout);

		Log(LogLevel.DEBUG, `Updated workout:`, updatedWorkout);
	};

	const nextSet = () => {
		setIsRest(!isRest);
		setRestTimer(0);
	};

	useEffect(() => {
		setActiveExercise(workout.exercises[activeExerciseIndex]);
	}, [activeExerciseIndex]);

	const skipSet = () => {
		if (activeSetIndex < activeExercise.sets.length - 1) {
			setActiveSetIndex(activeSetIndex + 1);
		} else {
			setActiveSetIndex(0);
			setActiveExerciseIndex(activeExerciseIndex + 1);
		}
	};

	const oneMoreSet = () => {
		// Implement this function if needed
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

	useEffect(() => {
		const decrementCountdown = () => {
			if (startCountdown > 0) {
				setStartCountdown((prevCountdown) => prevCountdown - 1);
			}
		};

		const countdownInterval = setInterval(decrementCountdown, 1000);

		return () => {
			clearInterval(countdownInterval);
		};
	}, [startCountdown]);

	const finishWorkout = () => {};

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
										<CardBody className="text-center">{formatTime(workoutTimer)}</CardBody>
									</Card>
								</div>
								<div className="flex gap-4">
									<div className="flex gap-2 w-1/2 items-center">
										<div className="w-[7rem]">Exercise Timer:</div>
										<Card className="bg-base-200 w-full card-compact">
											<CardBody>{formatTime(exerciseTimer)}</CardBody>
										</Card>
									</div>
									<div className="flex gap-2 w-1/2 items-center">
										<div>Set Timer:</div>
										<Card className="bg-base-200 w-full card-compact">
											<CardBody>{formatTime(setTimer)}</CardBody>
										</Card>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									{exercises ? (
										<ComboBox
											className="w-full"
											options={exercises.map((exercise: ExerciseData) => exercise.name)}
											selectedCallback={(s) => {
												setActiveExercise((prevExercise: { sets: any[] }) => ({
													...prevExercise,
													sets: prevExercise.sets.map((set, index) => (index === activeSetIndex ? { ...set, name: s } : set))
												}));
											}}
											value={activeExercise.name}
										/>
									) : (
										<Input disabled />
									)}
									<Button type="button" className="btn-sm bg-red-500">
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
																setActiveExercise((prevExercise: { sets: any[] }) => ({
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
																setActiveExercise((prevExercise: { sets: any[] }) => ({
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
																setActiveExercise((prevExercise: { sets: any[] }) => ({
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
								<Button type="button" onClick={nextSet} className="bg-green-500">
									Done / Rest
								</Button>
								<Button type="button" onClick={skipSet} className="bg-red-500 btn-sm">
									Skip Set
								</Button>
								{activeSetIndex === activeExercise.sets.length && <Button onClick={oneMoreSet}>+ One More Set</Button>}
								{isFinalSet && <Button onClick={finishWorkout}>Finish Workout</Button>}
							</div>
						</Form>
					)}
				</Formik>
			)}
			{isRest && (
				<Button onClick={finishRest} className="w-full h-full">
					<span className="countdown font-mono text-6xl">
						<span style={{ "--value": secondsToHMS(restTimer).minutes } as React.CSSProperties}></span>:
						<span style={{ "--value": secondsToHMS(restTimer).seconds } as React.CSSProperties}></span>
					</span>
				</Button>
			)}
		</div>
	);
};

export default UserWorkoutsPage;
