export interface Workout {
	name: string;
	exercises: Exercise[];
}

export interface Exercise {
	name: string;
	sets: Set[];
	rest: number;
}

export interface Set {
	reps: number;
	weight: number;
	rest: number;
}

export interface timedWorkout {
	name: string;
	date: Date;
	exercises: timedExercise[];
	time: number;
}

export interface timedExercise {
	name: string;
	sets: timedSets[];
	rest: number;
	time: number;
}

export interface timedSets {
	reps: number;
	weight: number;
	rest: number;
	time: number;
}

export const timedSetToSet = (timedSet: timedSets): Set => {
	return {
		reps: timedSet.reps,
		weight: timedSet.weight,
		rest: timedSet.rest
	};
};

export const timedExerciseToExercise = (timedExercise: timedExercise): Exercise => {
	return {
		name: timedExercise.name,
		sets: timedExercise.sets.map((timedSet) => timedSetToSet(timedSet)),
		rest: timedExercise.rest
	};
};

export const timedWorkoutToWorkout = (timedWorkout: timedWorkout): Workout => {
	return {
		name: timedWorkout.name,
		exercises: timedWorkout.exercises.map((timedExercise) => timedExerciseToExercise(timedExercise))
	};
};
