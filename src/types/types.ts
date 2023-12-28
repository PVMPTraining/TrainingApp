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

export enum EXERCISE_TYPE {
	Compound,
	Cardio,
	Isolation,
	Stretching,
	Calisthenics,
	Plyometrics
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
	exercise_type: EXERCISE_TYPE;
}

export interface RecipesData {
	id: string;
	created_at: string;
	name: string;
	diet_type: string[];
	free_from: string[];
	high_content: string[];
	low_content: string[];
	cuisine_type: string[];
	meal_type: string[];
	fitness_goal: string[];
	special_features: string[];
	skill_level: string[];
	equipment: string[];
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

type BrandFoodNutrimentTypes = {
	carbohydrates: number;
	carbohydrates_100g: number;
	carbohydrates_serving: number;
	carbohydrates_unit: string;
	carbohydrates_value: number;
	"carbon-footprint-from-known-ingredients_100g": number;
	"carbon-footprint-from-known-ingredients_product": number;
	"carbon-footprint-from-known-ingredients_serving": number;
	energy: number;
	"energy-kcal": number;
	"energy-kcal_100g": number;
	"energy-kcal_serving": number;
	"energy-kcal_unit": string;
	"energy-kcal_value": number;
	"energy-kcal_value_computed": number;
	"energy-kj": number;
	"energy-kj_100g": number;
	"energy-kj_serving": number;
	"energy-kj_unit": string;
	"energy-kj_value": number;
	"energy-kj_value_computed": number;
	energy_100g: number;
	energy_serving: number;
	energy_unit: string;
	energy_value: number;
	fat: number;
	fat_100g: number;
	fat_serving: number;
	fat_unit: string;
	fat_value: number;
	fiber: number;
	fiber_100g: number;
	fiber_serving: number;
	fiber_unit: string;
	fiber_value: number;
	"fruits-vegetables-legumes-estimate-from-ingredients_100g": number;
	"fruits-vegetables-legumes-estimate-from-ingredients_serving": number;
	"fruits-vegetables-nuts-estimate-from-ingredients_100g": number;
	"fruits-vegetables-nuts-estimate-from-ingredients_serving": number;
	"monounsaturated-fat": number;
	"monounsaturated-fat_100g": number;
	"monounsaturated-fat_serving": number;
	"monounsaturated-fat_unit": string;
	"monounsaturated-fat_value": number;
	"nova-group": number;
	"nova-group_100g": number;
	"nova-group_serving": number;
	"nutrition-score-fr": number;
	"nutrition-score-fr_100g": number;
	"polyunsaturated-fat": number;
	"polyunsaturated-fat_100g": number;
	"polyunsaturated-fat_serving": number;
	"polyunsaturated-fat_unit": string;
	"polyunsaturated-fat_value": number;
	proteins: number;
	proteins_100g: number;
	proteins_serving: number;
	proteins_unit: string;
	proteins_value: number;
	salt: number;
	salt_100g: number;
	salt_serving: number;
	salt_unit: string;
	salt_value: number;
	"saturated-fat": number;
	"saturated-fat_100g": number;
	"saturated-fat_serving": number;
	"saturated-fat_unit": string;
	"saturated-fat_value": number;
	sodium: number;
	sodium_100g: number;
	sodium_serving: number;
	sodium_unit: string;
	sodium_value: number;
	sugars: number;
	sugars_100g: number;
	sugars_serving: number;
	sugars_unit: string;
	sugars_value: number;
};

type BrandFoodIngredientsTypes = {
	id: string;
	percent_estimate: number;
	percent_max: number;
	percent_min: number;
	rank: number;
	text: string;
}[];

export type BrandFoodSearchResultTypes = {
	_id: string;
	nutriments: BrandFoodNutrimentTypes;
	ingredients: BrandFoodIngredientsTypes;
	brands: string;
	product_name: string;
	product_name_en: string;
	product_name_fr: string;
	product_name_de: string;
	abbreviated_product_name: string;
	generic_name: string;
	generic_name_fr: string;
	generic_name_en: string;
	generic_name_de: string;
	image_small_url: string;
	image_thumb_url: string;
	nutrition_grades: string;
};

export type BrandFoodFetchDataTypes = {
	count: number;
	page: number;
	page_count: number;
	page_size: number;
	products: BrandFoodSearchResultTypes[];
	skip: number;
};
