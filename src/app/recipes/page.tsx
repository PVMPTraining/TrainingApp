"use client";

import { FC, useEffect, useState } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { Button } from "@/src/components/UI/Button/Button";
import { CardBody } from "@/src/components/UI/Card/Card";
import { FilterType } from "@/src/components/Filter/Filters";
import { useFetchRecipes } from "@/src/utils/hooks/useFetchRecipes";
import {
	DIET_TYPE,
	FREE_FROM,
	CUISINE_TYPE,
	EQUIPMENT,
	FITNESS_GOAL,
	HIGH_CONTENT,
	LOW_CONTENT,
	MEAL_TYPE,
	RecipeData,
	SKILL_LEVEL,
	SPECIAL_FEATURES
} from "@/src/types/supabase/recipesData";
import { LuVegan } from "react-icons/lu";
import { SearchBarWithFilter } from "@/src/components/SearchBar/SeacrhBarWithFilter";
import { GetImageURLFromBucket } from "@/src/utils/helpers/supabase";
import { formatStringToLowerCaseSpacesToUnderscores } from "@/src/utils/helpers/functions";
import {
	useFetchCuisineTypes,
	useFetchDietTypes,
	useFetchEquipments,
	useFetchFitnessGoals,
	useFetchFreeFroms,
	useFetchHighContents,
	useFetchLowContents,
	useFetchMealTypes,
	useFetchSkillLevels,
	useFetchSpecialFeatures
} from "@/src/utils/hooks/supabaseDataTypes/supabaseDataTypeHooks";
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";
import { string } from "yup";

const RecepiesPage: FC = () => {
	const strings = useLocalizedStrings();

	const partialBlur: React.CSSProperties = {
		position: "absolute",
		top: -10,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage: "inherit",
		backgroundSize: "cover",
		backgroundPosition: "center",
		filter: "blur(8px)",
		maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
		WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 100%)"
	};

	const { isLoading, recipes } = useFetchRecipes();
	const { isLoading: isLoadingDietTypes, data: dietTypes } = useFetchDietTypes();
	const { isLoading: isLoadingFreeFroms, data: freeFroms } = useFetchFreeFroms();
	const { isLoading: isLoadingHighContent, data: highContent } = useFetchHighContents();
	const { isLoading: isLoadingLowContent, data: lowContent } = useFetchLowContents();
	const { isLoading: isLoadingCuisineType, data: cuisineType } = useFetchCuisineTypes();
	const { isLoading: isLoadingMealType, data: mealType } = useFetchMealTypes();
	const { isLoading: isLoadingFitnessGoal, data: fitnessGoal } = useFetchFitnessGoals();
	const { isLoading: isLoadingSpecialFeatures, data: specialFeatures } = useFetchSpecialFeatures();
	const { isLoading: isLoadingSkillLevel, data: skillLevel } = useFetchSkillLevels();
	const { isLoading: isLoadingEquipment, data: equipment } = useFetchEquipments();

	const [recipesSearchResults, setRecipesSearchResults] = useState<RecipeData[]>([]);

	const [selectedRecipe, setSelectedRecipe] = useState<RecipeData>({} as RecipeData);
	const [recpieFullScreen, setRecpieFullScreen] = useState<boolean>(false);

	const [bgImages, setBgImages] = useState<{ [key: string]: string | undefined }>({});

	useEffect(() => {
		const fetchImages = async () => {
			const newBgImages: { [key: string]: string | undefined } = {};
			for (const recipe of recipesSearchResults) {
				const imageUrl = await GetImageURLFromBucket("recipe_cover_pics", formatStringToLowerCaseSpacesToUnderscores(recipe.name));
				newBgImages[recipe.name] = imageUrl;
			}
			setBgImages(newBgImages);
		};

		fetchImages();
	}, [recipesSearchResults]);

	const filterOptions = [
		{ topLeftLabel: "Diet Type", options: dietTypes, dataKey: "diet_type", type: FilterType.Checkbox },
		{ topLeftLabel: "Free from", options: freeFroms, dataKey: "free_from", type: FilterType.Checkbox },
		{ topLeftLabel: "High in", options: highContent, dataKey: "high_content", type: FilterType.Checkbox },
		{ topLeftLabel: "Low in", options: lowContent, dataKey: "low_content", type: FilterType.Checkbox },
		{ topLeftLabel: "Cuisine Type", options: cuisineType, dataKey: "cuisine_type", type: FilterType.Checkbox },
		{ topLeftLabel: "Meal Type", options: mealType, dataKey: "meal_type", type: FilterType.Checkbox },
		{ topLeftLabel: "Fitness Goal", options: fitnessGoal, dataKey: "fitness_goal", type: FilterType.Checkbox },
		{ topLeftLabel: "Special Features", options: specialFeatures, dataKey: "special_feature", type: FilterType.Checkbox },
		{ topLeftLabel: "Skill Level", options: skillLevel, dataKey: "skill_level", type: FilterType.Checkbox },
		{ topLeftLabel: "Equipment", options: equipment, dataKey: "equipment", type: FilterType.Checkbox },
		// // { topLeftLabel: "Seasonal", options: sesonal, dataKey: "seasonal" }
		// // { topLeftLabel: "Example", dataKey: "example", type: FilterType.RangeSlider },
		{ topLeftLabel: "Calorie Range", dataKey: "calories", type: FilterType.DualRangeSlider }
	];

	return (
		<NavLayout
			header={<div>{strings.recipes.recipesHeader}</div>}
			content={
				<div className="flex-grow flex flex-col gap-4 m-4">
					<SearchBarWithFilter
						listToFilter={recipes}
						filterOptions={filterOptions}
						resultsCallback={setRecipesSearchResults}
						dataIsLoading={isLoading}
					/>
					<div className="flex flex-col gap-2">
						<div className="grid grid-cols-1 xs:grid-cols-2 gap-2 w-full justify-center">
							{recipesSearchResults.map((recipe, i) => {
								return (
									<Button
										key={i}
										className={`bg-cover bg-center card-compact h-40 items-start px-0 text-start font-normal overflow-hidden relative`}
										style={{ backgroundImage: `url(${bgImages[recipe.name]})` }}
										onClick={() => {
											setRecpieFullScreen(true);
											setSelectedRecipe(recipe);
										}}
									>
										<div style={partialBlur}></div>
										<CardBody className="relative z-10 h-full">
											<div className="flex flex-col gap-1">
												<span className="text-xl text-shadow-lg shadow-black">{recipe.name}</span>
												<span>{recipe.calories} kcal</span>
											</div>
											<div className="flex gap-1 items-center mt-auto">
												{recipe.diet_type.toString().includes(DIET_TYPE[DIET_TYPE.Vegan]) && <LuVegan />}
												{recipe.diet_type.toString().includes(DIET_TYPE[DIET_TYPE.Vegan]) && (
													<img className="h-4" src="https://cdn-icons-png.flaticon.com/512/10008/10008886.png" />
												)}
											</div>
										</CardBody>
									</Button>
								);
							})}
						</div>
					</div>
					{recpieFullScreen && (
						<div className="fixed h-screen w-screen z-50 top-0 left-0 flex flex-col">
							<div
								className={`bg-cover bg-center h-96 overflow-hidden relative`}
								style={{ backgroundImage: `url(${bgImages[selectedRecipe.name]})` }}
							>
								<div style={partialBlur}></div>
								<div className="relative p-8 flex">
									<span className="text-2xl text-shadow-lg shadow-black">{selectedRecipe.name}</span>
									<Button
										onClick={() => {
											setRecpieFullScreen(false);
										}}
										className="bg-base-200"
									>
										X
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			}
		/>
	);
};

export default RecepiesPage;
