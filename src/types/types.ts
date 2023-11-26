import exp from "constants";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			movies: {
				Row: {
					id: number;
					name: string;
					data: Json | null;
				};
				Insert: {
					id?: never;
					name: string;
					data?: Json | null;
				};
				Update: {
					id?: never;
					name?: string;
					data?: Json | null;
				};
			};
		};
	};
}

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

export interface ExerciseData {
	id: string;
	created_at: string;
	name: string;
	alternate_name: string[];
	primary_muscles: string[];
	secondary_muscles: string[];
	description: string;
	proper_form: string;
	modifications: string[];
	load: string;
	volume: string;
	progression: string;
	rest_period: string;
	precautions: string[];
	common_mistakes: string[];
	risks: string[];
	mandatory_equipment: string[];
	optional_equipment: string[];
	alternative_exercises: string[];
}
