import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { Input } from "@/src/components/UI/Input/Input";
import Fuse from "fuse.js";

interface SearchBarProps extends HTMLAttributes<HTMLElement> {
	listToSearch: any[];
	searchResultsCallback: (searchResults: any[]) => void;
	disabled?: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({ listToSearch, searchResultsCallback, disabled }: SearchBarProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		// Create a fuzzy search instance with the exercise names
		const fuse = new Fuse(listToSearch, {
			keys: ["name"],
			threshold: 0.3 // Adjust the threshold for fuzzy matching
		});

		// Function to perform the fuzzy search
		const performFuzzySearch = (query: string) => {
			if (!query) {
				return listToSearch; // If the query is empty, return all exercises
			}
			const result = fuse.search(query);
			return result.map((item) => item.item);
		};

		// Filter exercises based on the search query (using fuzzy search)
		searchResultsCallback(performFuzzySearch(searchQuery));
	}, [listToSearch, searchQuery]);

	return (
		<Input
			className="bg-base-200 rounded-r-none"
			placeholder="Search for exercises"
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			disabled={disabled}
		/>
	);
};
