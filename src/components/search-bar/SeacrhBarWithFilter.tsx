import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { Filters } from "../filter/Filters";
import { Button } from "../UI/Button/Button";
import { FaFilter } from "react-icons/fa";

interface SearchBarWithFilterProps extends HTMLAttributes<HTMLElement> {
	dataIsLoading?: boolean;
	listToFilter: any[];
	filterOptions: any[];
	resultsCallback?: (results: any[]) => void;
}

export const SearchBarWithFilter: FC<SearchBarWithFilterProps> = ({
	dataIsLoading,
	listToFilter,
	filterOptions,
	resultsCallback
}: SearchBarWithFilterProps) => {
	const [isFilterSelectionOpen, setIsFilterSelectionOpen] = useState(false);
	const [filteredList, setFilteredList] = useState<any[]>([]);
	const [filterSearchResults, setFilterSearchResults] = useState<any[]>([]);

	useEffect(() => {
		if (resultsCallback) {
			resultsCallback(filterSearchResults);
		}
	}, [filterSearchResults, filteredList]);

	useEffect(() => {
		if (!dataIsLoading) {
			setFilteredList(listToFilter);
			setFilterSearchResults(listToFilter);
		}
	}, [dataIsLoading]);

	return (
		<div>
			<div className={["flex bg-base-200 rounded-lg", isFilterSelectionOpen ? "rounded-b-none" : ""].join(" ")}>
				<SearchBar listToSearch={filteredList} searchResultsCallback={setFilterSearchResults} disabled={dataIsLoading} />
				<Button
					className="m-0 rounded-l-none"
					onClick={() => {
						setIsFilterSelectionOpen((prevValue) => !prevValue);
					}}
					disabled={dataIsLoading}
				>
					<FaFilter className={["text-accent text-2xl", dataIsLoading ? "opacity-20" : ""].join(" ")} />
				</Button>
			</div>
			<div className={["bg-base-200 rounded-b-lg", isFilterSelectionOpen ? "" : "hidden"].join(" ")}>
				<div className="flex flex-col gap-4 px-4 pb-4">
					<Filters filterOptions={filterOptions} listToFilter={listToFilter} filterCallback={setFilteredList} />
				</div>
			</div>
		</div>
	);
};
