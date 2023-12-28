"use client";

import { FC, useEffect, useState } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { Button } from "@/src/components/UI/Button/Button";
import { CardBody } from "@/src/components/UI/Card/Card";
import { Input } from "@/src/components/UI/Input/Input";
import { FaFilter } from "react-icons/fa";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { DualRangeSlider } from "@/src/components/UI/DualRangeSlider/DualRangeSlider";
import Fuse from "fuse.js";
import { Filters } from "@/src/components/filter/Filters";

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

	const dietTypes = [
		// Diet Types
		"Keto",
		"Pescatarian",
		"Kosher",
		"Paleo",
		"Halal",
		"Vegan",
		"Vegetarian"
	];
	const freeFrom = [
		// Free From
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
	];
	const lowContent = [
		// Low
		"Low Fat",
		"Low Sugar",
		"Low Carb",
		"Low Sodium"
	];
	const highContent = [
		// High
		"High Protein",
		"High Fiber"
	];
	const cuisineTypes = [
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
	];
	const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
	const fitnessGoals = ["Weight Loss", "Weight Gain", "Maintenance", "Performance"];
	const specialFeatures = ["None", "Quick and Easy", "Low Ingredient Count", "One Pot/Pan"];
	const skillLevel = ["Beginner", "Intermediate", "Advanced"];
	const equipment = ["None", "Knife", "Cutting Board", "Bowl", "Pot", "Pan", "Oven", "Stove", "Grill", "Blender", "Microwave", "Toaster"];
	const sesonal = ["Spring", "Summer", "Fall", "Winter"];

	const [filteredRecepies, setFilteredRecepies] = useState<[]>([]);

	const [isFilterSelectionOpen, setIsFilterSelectionOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const [selectedDietTypes, setSelectedDietTypes] = useState<string[]>([]);
	const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
	const [selectedFitnessGoal, setSelectedFitnessGoal] = useState<string[]>([]);
	const [selectedSpecialFeatures, setSelectedSpecialFeatures] = useState<string[]>([]);
	const [selectedCuisineTypes, setSelectedCuisineTypes] = useState<string[]>([]);
	const [selectedSkillLevels, setSelectedSkillLevel] = useState<string[]>([]);
	const [selectedEquipments, setSelectedEquipment] = useState<string[]>([]);
	const [selectedSeasonals, setSelectedSeasonal] = useState<string[]>([]);

	useEffect(() => {
		// Create a fuzzy search instance with the exercise names
		const fuse = new Fuse(filteredRecepies, {
			keys: ["name"],
			threshold: 0.3 // Adjust the threshold for fuzzy matching
		});

		// Function to perform the fuzzy search
		const performFuzzySearch = (query: string) => {
			if (!query) {
				return filteredRecepies; // If the query is empty, return all exercises
			}
			const result = fuse.search(query);
			return result.map((item) => item.item);
		};

		// Filter exercises based on the search query (using fuzzy search)
		// setExercisesSearchResults(performFuzzySearch(searchQuery));
	}, []);

	useEffect(() => {}, []);

	return (
		<NavLayout
			header={<div>Recipies</div>}
			content={
				<div className="flex-grow flex flex-col gap-4 m-4">
					<div>
						<div className="relative">
							<Input
								className={"bg-base-200 " + (isFilterSelectionOpen ? "rounded-b-none" : "")}
								placeholder="Search for exercises"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<Button
								className="btn-sm absolute right-0 top-0 h-full"
								onClick={() => {
									setIsFilterSelectionOpen((prevValue) => !prevValue);
								}}
							>
								<FaFilter className="text-accent text-2xl" />
							</Button>
						</div>
						{isFilterSelectionOpen && (
							<div className="bg-base-200 rounded-b-lg">
								<div className="flex flex-col gap-4 px-4 pb-4">
									<Filters filterOptions={[]} listToFilter={[]} filterCallback={() => {}} />
									{/* <FilterCheckboxGroup
										topLeftLabel="Diet Types"
										options={dietTypes}
										selectedOptions={selectedDietTypes}
										setSelectedOptions={setSelectedDietTypes}
									/>
									<FilterCheckboxGroup
										topLeftLabel="Meal Types"
										options={mealTypes}
										selectedOptions={selectedMealTypes}
										setSelectedOptions={setSelectedMealTypes}
									/>
									<FilterCheckboxGroup
										topLeftLabel="Fitness Goals"
										options={fitnessGoals}
										selectedOptions={selectedFitnessGoal}
										setSelectedOptions={setSelectedFitnessGoal}
									/>
									<FilterCheckboxGroup
										topLeftLabel="Special Features"
										options={specialFeatures}
										selectedOptions={selectedSpecialFeatures}
										setSelectedOptions={setSelectedSpecialFeatures}
									/>
									<FilterCheckboxGroup
										topLeftLabel="Cuisine Types"
										options={cuisineTypes}
										selectedOptions={selectedCuisineTypes}
										setSelectedOptions={setSelectedCuisineTypes}
									/>
									<FilterCheckboxGroup
										topLeftLabel="Skill Levels"
										options={skillLevel}
										selectedOptions={selectedSkillLevels}
										setSelectedOptions={setSelectedSkillLevel}
									/>
									<FilterCheckboxGroup
										topLeftLabel="Equipment"
										options={equipment}
										selectedOptions={selectedEquipments}
										setSelectedOptions={setSelectedEquipment}
									/>
									<FilterCheckboxGroup
										topLeftLabel="Seasonal"
										options={sesonal}
										selectedOptions={selectedSeasonals}
										setSelectedOptions={setSelectedSeasonal}
									/> */}
									<Labels topLeftLabel="Calorie Range" input={<DualRangeSlider></DualRangeSlider>} />
									<Labels topLeftLabel="Preperation Time" input={<input type="range" min={0} max="100" value="40" className="range" />} />
								</div>
							</div>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<div className="grid grid-cols-1 xs:grid-cols-2 gap-2 w-full justify-center">
							<Button
								className="bg-[url(https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-40 items-start px-0 text-start font-normal overflow-hidden relative"
								onClick={() => {}}
							>
								<div style={partialBlur}></div>
								<CardBody className="relative z-10">
									<span className="text-xl text-shadow-lg shadow-black">Chicken</span>
								</CardBody>
							</Button>
							<Button className="bg-[url(https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-40 items-start px-0 overflow-hidden relative text-start font-normal">
								<div style={partialBlur}></div>
								<CardBody className="relative z-10">
									<span className="text-xl text-shadow-lg shadow-black">Steak</span>
								</CardBody>
							</Button>
						</div>
					</div>
				</div>
			}
		/>
	);
};

export default RecepiesPage;
