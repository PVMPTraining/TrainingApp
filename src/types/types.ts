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
