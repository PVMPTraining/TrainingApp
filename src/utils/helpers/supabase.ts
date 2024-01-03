"use client";

// Supabase
import { createBrowserClient } from "@supabase/ssr";
import { LogLevel, Log } from "./debugLog";
import { RecipeData } from "@/src/types/supabase/recipesData";
import { ExerciseData } from "@/src/types/supabase/exerciseData";
import { Json } from "@/src/types/types";
import { Workout } from "@/src/types/fitnessTypes";

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// Table Constants
const user_workouts_table: string = "user_workouts";
const exercise_database_table: string = "exercise_database";
const recipes_table: string = "recipes";
const user_favorite_exercises_table: string = "user_favorite_exercises";
const user_logged_workouts_table: string = "user_logged_workouts";
const users: string = "users";

// Column Constants
const id_column: string = "id";
const workouts_column = "workouts";
const exercises_column = "exercises";
const foodSearch_keyword_history_column = "foodSearch_keyword_history";

// All Constant
const all = "*";

/**
 * If succesful, returns the user.
 * @returns {Promise<object>} A promise that resolves to the user object.
 */
export const GetUser = async () => {
	const { data: user } = await supabase.auth.getUser();
	Log(LogLevel.DEBUG, `GetUser: ${user?.user?.id}`);
	return user.user;
};

/**
 * Retrieves the user ID from Supabase authentaication.
 * @returns The user ID.
 */
export const GetUserID = async () => {
	const { data: user } = await supabase.auth.getUser();
	Log(LogLevel.DEBUG, `GetUserID: ${user?.user?.id}`);
	return user?.user?.id;
};

/**
 * Signs out the user from the Supabase authentication.
 */
export const SignOut = async () => {
	await supabase.auth.signOut();
};

/**
 * Retrieves a single row from the 'user_workouts' table based on the provided ID.
 * @param id - The ID of the row to retrieve.
 * @returns The retrieved row from the 'user_workouts' table.
 */
export const GetUserWorkoutsRow = async (id: string) => {
	const { data: user_workouts } = await supabase.from(user_workouts_table).select(all).eq(id_column, id).single();
	Log(LogLevel.DEBUG, `GetUserWorkoutsRow: ${user_workouts}`);
	return user_workouts;
};

/**
 * Retrieves the workouts associated with a user.
 * @param id - The ID of the user.
 * @returns The workouts associated with the user.
 */
export const GetUserWorkouts = async (id: string) => {
	const { data: user_workouts, error } = await supabase.from(user_workouts_table).select(workouts_column).eq(id_column, id);

	if (user_workouts) {
		Log(LogLevel.DEBUG, `GetUserWorkouts, user_workouts:`, user_workouts[0].workouts);
	}

	if (error) {
		Log(LogLevel.ERROR, `GetUserWorkouts, error:`, error);
		throw error;
	}

	return (user_workouts[0].workouts as Workout[]) || [];
};

/**
 * Retrieves exercises from the exercise_database table.
 * @returns An array of exercises.
 */
export const GetExercises = async () => {
	const { data: exercises, error } = await supabase.from(exercise_database_table).select(all);

	if (exercises) {
		Log(LogLevel.DEBUG, `GetExercises, exercises:`, exercises);
	}

	if (error) {
		Log(LogLevel.ERROR, `GetExercises, error:`, error);
		throw error;
	}

	return (exercises as ExerciseData[]) || [];
};

/**
 * Retrieves exercises from the exercise_database table.
 * @returns An array of exercises.
 */
export const GetExercisesCount = async () => {
	const { data, error } = await supabase.from(exercise_database_table).select("count(*)");
	if (data) {
		Log(LogLevel.DEBUG, `GetExercisesCount, count:`, data);
	}

	if (error) {
		Log(LogLevel.ERROR, `GetExercisesCount, error:`, error);
		throw error;
	}

	return (data?.[0]?.count as unknown as number) || 0;
};

export const GetExercisesForPage = async (pageNumber: number, resultsPerPage: number) => {
	const { data: exercises, error } = await supabase
		.from(exercise_database_table)
		.select(all)
		.range(resultsPerPage * pageNumber - resultsPerPage, resultsPerPage * pageNumber);

	if (exercises) {
		Log(LogLevel.DEBUG, `GetExercises, exercises:`, exercises);
	}

	if (error) {
		Log(LogLevel.ERROR, `GetExercises, error:`, error);
		throw error;
	}

	return (exercises as ExerciseData[]) || [];
};

export const GetRecipes = async () => {
	const { data: recipes, error } = await supabase.from(recipes_table).select(all);

	if (recipes) {
		Log(LogLevel.DEBUG, `GetRecepies, exercises:`, recipes);
	}

	if (error) {
		Log(LogLevel.ERROR, `GetRecepies, error:`, error);
		throw error;
	}

	return (recipes as RecipeData[]) || [];
};

/**
 * Adds a workout to the user's workout list.
 * @param id - The ID of the user.
 * @param workout - The workout to be added.
 */
export const AddUserWorkout = async (id: string, workout: Workout) => {
	Log(LogLevel.DEBUG, `AddUserWorkout, id, workout:`, { id, workout });
	const userWorkouts = await GetUserWorkouts(id);
	userWorkouts.push(workout);

	const { data, error } = await supabase.from(user_workouts_table).update({ workouts: userWorkouts }).eq(id_column, id).select();

	if (data) {
		Log(LogLevel.DEBUG, `AddUserWorkout, return data:`, data);
	}

	if (error) {
		Log(LogLevel.ERROR, `AddUserWorkout, error: ${error}`);
	}
};

/**
 * Updates a user's workout in the database.
 * @param id - The ID of the user.
 * @param updatedWorkout - The updated workout object.
 */
export const UpdateUserWorkout = async (id: string, updatedWorkout: Workout) => {
	Log(LogLevel.DEBUG, `UpdateUserWorkout, id, updatedWorkout:`, { id, updatedWorkout });

	// Fetch existing user workouts
	const userWorkouts = await GetUserWorkouts(id);

	// Find the index of the workout with the same name in user workouts
	const existingWorkoutIndex = userWorkouts.findIndex((workout) => workout.name === updatedWorkout.name);

	if (existingWorkoutIndex !== -1) {
		// Update the existing workout with the new data
		userWorkouts[existingWorkoutIndex] = updatedWorkout;

		// Update the user workouts in the database
		const { data, error } = await supabase.from(user_workouts_table).update({ workouts: userWorkouts }).eq(id_column, id).select();

		if (data) {
			Log(LogLevel.DEBUG, `UpdateUserWorkout, return data:`, data);
		}

		if (error) {
			Log(LogLevel.ERROR, `UpdateUserWorkout, error: ${error}`);
		}
	} else {
		Log(LogLevel.ERROR, `UpdateUserWorkout, workout not found with name: ${updatedWorkout.name}`);
	}
};

/**
 * Retrieves the favorite exercises associated with a user.
 * @param id - The ID of the user.
 * @returns The favorite exercises associated with the user.
 */
export const GetUserFavoriteExercises = async (id: string) => {
	const { data: user_favorite_exercises } = await supabase.from(user_favorite_exercises_table).select(exercises_column).eq(id_column, id);

	Log(LogLevel.DEBUG, `GetUserFavoriteExercises: ${JSON.stringify(user_favorite_exercises)}`);
	return user_favorite_exercises?.[0]?.exercises || [];
};

/**
 * Adds a favorite to the user's favorite list.
 * @param id - The ID of the user.
 * @param favorite exercise - The favorite exercise to be added.
 */
export const AddFavoriteExercise = async (id: string, exercise: Json) => {
	// const favoriteExercisesToAdd: string = JSON.stringify(exercise);
	const favoriteExercisesToAdd = exercise;
	const userExercises = await GetUserFavoriteExercises(id);

	userExercises.push(favoriteExercisesToAdd);

	const { data, error } = await supabase.from(user_favorite_exercises_table).update({ exercises: userExercises }).eq(id_column, id).select();

	Log(LogLevel.DEBUG, `AddUserFavoriteExercise, data: ${JSON.stringify(data)}`);
	if (error) {
		Log(LogLevel.ERROR, `AddUserFavoriteExercise, error: ${error}`);
	}
};

export const GetUserLoggedWorkouts = async (id: string) => {
	const { data: user_workouts, error } = await supabase.from(user_logged_workouts_table).select(workouts_column).eq(id_column, id);

	if (user_workouts) {
		Log(LogLevel.DEBUG, `GetUserWorkouts, user_workouts:`, user_workouts[0].workouts);
	}

	if (error) {
		Log(LogLevel.ERROR, `GetUserWorkouts, error:`, error);
		throw error;
	}

	return user_workouts[0].workouts || [];
};

/**
 * Adds a logged workout for a user.
 * @param id - The ID of the user.
 * @param workout - The workout object to be added.
 */
export const AddLoggedWorkout = async (id: string, workout: any) => {
	Log(LogLevel.DEBUG, `AddUserWorkout, id, workout:`, { id, workout });
	const userWorkouts = await GetUserLoggedWorkouts(id);
	userWorkouts.push(workout);

	const { data, error } = await supabase.from(user_logged_workouts_table).update({ workouts: userWorkouts }).eq(id_column, id).select();

	if (data) {
		Log(LogLevel.DEBUG, `AddUserWorkout, return data:`, data);
	}

	if (error) {
		Log(LogLevel.ERROR, `AddUserWorkout, error: ${error}`);
	}
};

export const GetUserHistory = async (id: string) => {
	const { data: user_history, error } = await supabase.from(users).select(foodSearch_keyword_history_column).eq(id_column, id);

	if (error) return error;
	if (user_history) return user_history[0].foodSearch_keyword_history;
	else return null;
};

export const AddKeywordToUserHistory = async (id: string, keyword: { keyword: string; category: string; timestamp: number }) => {
	const userHistory = await GetUserHistory(id);
	userHistory.push(keyword);

	await supabase.from(users).update({ foodSearch_keyword_history: userHistory }).eq(id_column, id);
};

// Even i checked timestamp for filter its deleting the same keywords i'll look again

export const DeleteKeywordFromUserHistory = async (id: string, keywordToDelete: { keyword: string; category: string; timestamp: number }) => {
	const userHistory = await GetUserHistory(id);

	// Filter out the keyword to delete
	const updatedHistory = userHistory.filter((keyword: { timestamp: number }) => keyword.timestamp !== keywordToDelete.timestamp);

	await supabase.from(users).update({ foodSearch_keyword_history: updatedHistory }).eq(id_column, id);
};

export const GetImageURLFromBucket = async (bucketName: string, imageName: string) => {
	try {
		const { data, error } = await supabase.storage.from(bucketName).createSignedUrl(`${imageName}.png`, 60); // 60 seconds expiration

		if (error) {
			throw error;
		}

		return data.signedUrl;
	} catch (error) {
		console.error("Error retrieving private image:", error);
	}
};
