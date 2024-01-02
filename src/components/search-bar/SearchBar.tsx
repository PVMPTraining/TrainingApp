import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { Input } from "@/src/components/UI/Input/Input";
import { Button } from "@/src/components/UI/Button/Button";
import { FaFilter } from "react-icons/fa";
import Fuse from "fuse.js";

interface SearchBarProps extends HTMLAttributes<HTMLElement> {
	setFilterSectionOpenCallback: (prevValue: boolean) => void;
	filteredList: any[];
	searchResultsCallback: (searchResults: any[]) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ filteredList, setFilterSectionOpenCallback, searchResultsCallback }: SearchBarProps) => {
	const [isFilterSelectionOpen, setIsFilterSelectionOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		// Create a fuzzy search instance with the exercise names
		const fuse = new Fuse(filteredList, {
			keys: ["name"],
			threshold: 0.3 // Adjust the threshold for fuzzy matching
		});

		// Function to perform the fuzzy search
		const performFuzzySearch = (query: string) => {
			if (!query) {
				return filteredList; // If the query is empty, return all exercises
			}
			const result = fuse.search(query);
			return result.map((item) => item.item);
		};

		// Filter exercises based on the search query (using fuzzy search)
		searchResultsCallback(performFuzzySearch(searchQuery));
	}, [filteredList, searchQuery]);

	useEffect(() => {
		setFilterSectionOpenCallback(isFilterSelectionOpen);
	}, [isFilterSelectionOpen]);

	return (
		<div className="flex items-center bg-base-200 rounded-lg">
			<Input
				className={"bg-base-200 rounded-r-none " + (isFilterSelectionOpen ? "rounded-b-none" : "")}
				placeholder="Search for exercises"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<Button
				className={"m-0 rounded-l-none " + (isFilterSelectionOpen ? "rounded-b-none" : "")}
				onClick={() => {
					setIsFilterSelectionOpen((prevValue) => !prevValue);
				}}
			>
				<FaFilter className="text-accent text-2xl" />
			</Button>
		</div>
	);
};
