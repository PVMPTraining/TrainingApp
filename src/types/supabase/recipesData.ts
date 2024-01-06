export enum DIET_TYPE {
	Keto,
	Pescatarian,
	Kosher,
	Paleo,
	Halal,
	Vegan,
	Vegetarian
}

export enum FREE_FROM {
	"Dairy Free",
	"Alcohol Free",
	"Celery Free",
	"Crustcean Free",
	"Egg Free",
	"Fish Free",
	"FODMAP Free",
	"Gluten Free",
	"Low Potassium",
	"Lupine Free",
	"Mustard Free",
	"Peanut Free",
	"Pork Free",
	"Red Meat Free",
	"Sesame Free",
	"Shellfish Free",
	"Soy Free",
	"Tree Nut Free",
	"Wheat Free"
}

export enum LOW_CONTENT {
	"Low Fat",
	"Low Sugar",
	"Low Carb",
	"Low Sodium"
}

export enum HIGH_CONTENT {
	"High Protein",
	"High Fiber",
	"None"
}

export enum CUISINE_TYPE {
	"American",
	"Asian",
	"British",
	"Caribbean",
	"Central Europe",
	"Chinese",
	"Eastern Europe",
	"French",
	"Indian",
	"Italian",
	"Japanese",
	"Kosher",
	"Mediterranean",
	"Mexican",
	"Middle Eastern",
	"Nordic",
	"South American",
	"South East Asian"
}

export enum MEAL_TYPE {
	"Breakfast",
	"Brunch",
	"Dinner",
	"Lunch",
	"Snack"
}

export enum FITNESS_GOAL {
	"Weight Loss",
	"Weight Gain",
	"Maintenance",
	"Performance"
}

export enum SPECIAL_FEATURES {
	"None",
	"Quick and Easy",
	"Low Ingredient Count",
	"One Pot/Pan"
	// "30 Minutes or Less",
	// "Freezer Friendly",
	// "Kid Friendly",
	// "Meal Prep Friendly",
	// "One Pot",
	// "Slow Cooker",
	// "Instant Pot",
	// "Leftovers",
	// "Make Ahead",
	// "Sheet Pan",
	// "Stir Fry",
	// "Stove Top",
	// "Under 500 Calories"
}

export enum SKILL_LEVEL {
	"Beginner",
	"Intermediate",
	"Advanced"
}

export enum EQUIPMENT {
	"None",
	"Knife",
	"Cutting Board",
	"Bowl",
	"Pot",
	"Pan",
	"Oven",
	"Stove",
	"Grill",
	"Blender",
	"Microwave",
	"Toaster"
}

export enum SEASONAL {
	"Spring",
	"Summer",
	"Fall",
	"Winter"
}

export interface RecipeData {
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
	calories: number;
}
