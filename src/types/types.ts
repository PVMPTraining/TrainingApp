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

type FoodAggregationsTypes = {
	dataType: {
		Branded: number;
		Foundation: number;
		"SR Legacy": number;
		"Survey (FNDDS)": number;
	};
};

type FoodSearchCriteriaTypes = {
	dataType: string[];
	foodTypes: string[];
	query: string;
	generalSearchInput: string;
	numberOfResultsPerPage: number;
	pageNumber: number;
	pageSize: number;
	requireAllWords: boolean;
	sortBy: string;
	sortOrder: string;
};

type FoodNutrientTypes = {
	dataPoints: number;
	derivationCode: string;
	derivationDescription: string;
	derivationId: number;
	foodNutrientId: number;
	foodNutrientSourceCode: string;
	foodNutrientSourceDescription: string;
	foodNutrientSourceId: number;
	indentLevel: number;
	max: number;
	median: number;
	min: number;
	nutrientId: number;
	nutrientName: string;
	nutrientNumber: string;
	rank: number;
	unitName: string;
	value: number;
};

export type FoodSearchResultTypes = {
	additionalDescriptions: string;
	allHighlightFields: string;
	commonNames: string;
	dataType: string;
	description: string;
	fdcId: number;
	finalFoodInputFoods: any[];
	foodAttributeTypes: any[];
	foodAttributes: any[];
	foodCategory: string;
	foodMeasures: any[];
	foodNutrients: FoodNutrientTypes[];
	foodVersionIds: any[];
	microbes: any[];
	mostRecentAcquisitionDate: string;
	ndbNumber: number;
	publishedDate: string;
	score: number;
};

export type FoodFetchDataTypes = {
	aggregations: FoodAggregationsTypes;
	currentPage: number;
	foodSearchCriteria: FoodSearchCriteriaTypes;
	foods: FoodSearchResultTypes[];
	pageList: number[];
	totalHits: number;
	totalPages: number;
};
