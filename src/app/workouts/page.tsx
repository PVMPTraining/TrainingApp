"use client";

import { FC, useState } from "react";

// Next
import NavLayout from "@/src/layouts/NavLayout";
import { Button } from "@/src/components/UI/Button/Button";
import { CardBody } from "@/src/components/UI/Card/Card";
import { SearchBarWithFilter } from "@/src/components/SearchBar/SeacrhBarWithFilter";

const WorkoutsPage: FC = () => {
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

	// const { isLoading, recipes } = useFetchRecipes();

	const [recipesSearchResults, setRecipesSearchResults] = useState<WorkoutData[]>([]);

	const filterOptions = [];

	return (
		<NavLayout
			header={<div>Workouts</div>}
			content={
				<div className="flex-grow flex flex-col gap-4 m-4">
					{/* <SearchBarWithFilter
						listToFilter={recipes}
						filterOptions={filterOptions}
						resultsCallback={setRecipesSearchResults}
						dataIsLoading={isLoading}
					/> */}
					<div className="flex flex-col gap-2">
						<div className="grid grid-cols-1 xs:grid-cols-2 gap-2 w-full justify-center">
							{recipesSearchResults.map((recipe) => {
								return (
									<Button
										className="bg-[url(https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center card-compact h-40 items-start px-0 text-start font-normal overflow-hidden relative"
										onClick={() => {}}
									>
										<div style={partialBlur}></div>
										<CardBody className="relative z-10 h-full">
											<span className="text-xl text-shadow-lg shadow-black">{}</span>
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

export default WorkoutsPage;
