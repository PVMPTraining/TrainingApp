"use client";

import { FC, useEffect, useState } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { Button } from "@/src/components/UI/Button/Button";
import { CardBody } from "@/src/components/UI/Card/Card";
import { FilterType, Filters } from "@/src/components/filter/Filters";
import { useFetchRecipes } from "@/src/utils/hooks/useFetchRecipes";
import { SearchBar } from "@/src/components/search-bar/SearchBar";
import { DIET_TYPE, FREE_FROM } from "@/src/types/supabaseDataTypes";
import {
	CUISINE_TYPE,
	EQUIPMENT,
	FITNESS_GOAL,
	HIGH_CONTENT,
	LOW_CONTENT,
	MEAL_TYPE,
	RecipesData,
	SKILL_LEVEL,
	SPECIAL_FEATURES
} from "@/src/types/supabaseDataTypes";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { DualRangeSlider } from "@/src/components/UI/DualRangeSlider/DualRangeSlider";

const RecepiesPage: FC = () => {
	const partialBlur: React.CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage: "inherit",
		backgroundSize: "cover",
		backgroundPosition: "center",
		filter: "blur(8px)",
		maskImage: "linear-gradient(to bottom, black 0%, transparent 50%)",
		WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 50%)"
	};

	const { isLoading, recipes } = useFetchRecipes();

	const [filteredRecipes, setFilteredRecepies] = useState<RecipesData[]>(recipes);
	const [isFilterSelectionOpen, setIsFilterSelectionOpen] = useState(false);
	const [recipesSearchResults, setRecipesSearchResults] = useState<RecipesData[]>([]);

	const filterOptions = [
		{ topLeftLabel: "Diet Type", options: DIET_TYPE, dataKey: "diet_type", type: FilterType.Checkbox },
		{ topLeftLabel: "Free from", options: FREE_FROM, dataKey: "free_from", type: FilterType.Checkbox },
		{ topLeftLabel: "Low in", options: LOW_CONTENT, dataKey: "low_content", type: FilterType.Checkbox },
		{ topLeftLabel: "High in", options: HIGH_CONTENT, dataKey: "high_content", type: FilterType.Checkbox },
		{ topLeftLabel: "Cuisine Type", options: CUISINE_TYPE, dataKey: "cuisine_type", type: FilterType.Checkbox },
		{ topLeftLabel: "Meal Type", options: MEAL_TYPE, dataKey: "meal_type", type: FilterType.Checkbox },
		{ topLeftLabel: "Fitness Goal", options: FITNESS_GOAL, dataKey: "fitness_goal", type: FilterType.Checkbox },
		{ topLeftLabel: "Special Features", options: SPECIAL_FEATURES, dataKey: "special_features", type: FilterType.Checkbox },
		{ topLeftLabel: "Skill Level", options: SKILL_LEVEL, dataKey: "skill_level", type: FilterType.Checkbox },
		{ topLeftLabel: "Equipment", options: EQUIPMENT, dataKey: "equipment", type: FilterType.Checkbox },
		// { topLeftLabel: "Seasonal", options: sesonal, dataKey: "seasonal" }
		// { topLeftLabel: "Example", dataKey: "example", type: FilterType.RangeSlider },
		{ topLeftLabel: "Calorie Range", dataKey: "calories", type: FilterType.DualRangeSlider }
	];

	useEffect(() => {
		setFilteredRecepies(recipes);
	}, [recipes]);

	return (
		<NavLayout
			header={<div>Recipies</div>}
			content={
				<div className="flex-grow flex flex-col gap-4 m-4">
					<div>
						<SearchBar
							setFilterSectionOpenCallback={setIsFilterSelectionOpen}
							filteredList={filteredRecipes}
							searchResultsCallback={setRecipesSearchResults}
						/>
						{isFilterSelectionOpen && (
							<div className="bg-base-200 rounded-b-lg">
								<div className="flex flex-col gap-4 px-4 pb-4">
									<Filters filterOptions={filterOptions} listToFilter={recipes} filterCallback={setFilteredRecepies} />
								</div>
							</div>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<div className="grid grid-cols-1 xs:grid-cols-2 gap-2 w-full justify-center">
							{recipesSearchResults.map((recipe) => {
								return (
									<Button
										className="bg-[url(https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-40 items-start px-0 text-start font-normal overflow-hidden relative"
										onClick={() => {}}
									>
										<div style={partialBlur}></div>
										<CardBody className="relative z-10">
											<span className="text-xl text-shadow-lg shadow-black">{recipe.name}</span>
										</CardBody>
									</Button>
								);
							})}
						</div>
					</div>
				</div>
			}
		/>
	);
};

export default RecepiesPage;
