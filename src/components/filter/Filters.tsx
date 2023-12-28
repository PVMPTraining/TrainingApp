import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { FilterCheckboxGroup } from "@/src/components/UI/FilterCheckboxGroup/FilterCheckboxGroup";

interface FiltersProps extends HTMLAttributes<HTMLElement> {
	listToFilter: any[];
	filterOptions: {
		topLeftLabel?: string | React.ReactNode;
		topRightLabel?: string | React.ReactNode;
		bottomLeftLabel?: string | React.ReactNode;
		bottomRightLabel?: string | React.ReactNode;
		options: string[];
		dataKey: string;
	}[];
	filterCallback: (filteredData: any[]) => void;
}

interface FilterObject {
	name: string;
	include: boolean;
}

export const Filters: FC<FiltersProps> = ({ listToFilter, filterOptions, filterCallback }: FiltersProps) => {
	const [filterOptionStates, setFilterOptionStates] = useState<FilterObject[][]>(filterOptions.map(() => []));

	const updateState = (index: number, updatedValue: (prevValue: FilterObject[]) => FilterObject[]) => {
		setFilterOptionStates((prevFilterOptionStates) => {
			const newState = [...prevFilterOptionStates];
			newState[index] = updatedValue(prevFilterOptionStates[index]);
			return newState;
		});
	};

	const filterExercises = (exercises: any[], filters: any[], filterProperty: string) => {
		return exercises.filter((exercise) => {
			if (exercise && exercise[filterProperty]) {
				return filters.every((filter) => {
					if (filter.include) {
						return exercise[filterProperty].includes(filter.name);
					} else {
						return !exercise[filterProperty].includes(filter.name);
					}
				});
			}
			return false;
		});
	};

	const filter = (listToFilter: any[], filterOptionStates: any[], i = 0): any[] => {
		if (i >= filterOptionStates.length) {
			return listToFilter;
		}

		const filteredList = filterExercises(listToFilter, filterOptionStates[i], filterOptions[i].dataKey);
		return filter(filteredList, filterOptionStates, i + 1);
	};

	useEffect(() => {
		console.log(filterOptionStates);
		filterCallback(filter(listToFilter, filterOptionStates));
	}, [filterOptionStates]);

	return (
		<>
			{filterOptions.map((filterOption, i) => (
				<FilterCheckboxGroup
					key={i}
					topLeftLabel={filterOption.topLeftLabel}
					bottomLeftLabel={filterOption.bottomLeftLabel}
					bottomRightLabel={filterOption.bottomRightLabel}
					options={filterOption.options}
					selectionCallback={(updatedSelectedOptions: (prevValue: FilterObject[]) => FilterObject[]) => updateState(i, updatedSelectedOptions)}
				/>
			))}
		</>
	);
};
