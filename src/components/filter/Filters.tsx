import React, { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import { FilterCheckboxGroup } from "@/src/components/UI/FilterCheckboxGroup/FilterCheckboxGroup";
import { enumStringArray } from "@/src/utils/helpers/functions";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { DualRangeSlider } from "../UI/DualRangeSlider/DualRangeSlider";

export enum FilterType {
	Checkbox,
	RangeSlider,
	DualRangeSlider
}

interface FiltersProps extends HTMLAttributes<HTMLElement> {
	listToFilter: any[];
	filterOptions: {
		topLeftLabel?: string | React.ReactNode;
		topRightLabel?: string | React.ReactNode;
		bottomLeftLabel?: string | React.ReactNode;
		bottomRightLabel?: string | React.ReactNode;
		options?: object;
		dataKey: string;
		type: FilterType;
	}[];
	filterCallback: (filteredData: any[]) => void;
}

export interface FilterObject {
	name: string;
	type: FilterType;
	include?: boolean;
	min?: number;
	max?: number;
}

// const useFilters = (listToFilter: any[], filterOptions: any[], filterOptionStates: any[]) => {
// 	const filter = useMemo(() => {
// 		const applyFilter = (list: any[], options: string | any[], i = 0): any[] => {
// 			if (i >= options.length) return list;
// 			const { dataKey } = filterOptions[i];
// 			const filteredList = list.filter((item) =>
// 				options[i].every((filter: FilterObject) => (filter.include ? item[dataKey]?.includes(filter.name) : !item[dataKey]?.includes(filter.name)))
// 			);
// 			return applyFilter(filteredList, options, i + 1);
// 		};
// 		return applyFilter(listToFilter, filterOptionStates);
// 	}, [listToFilter, filterOptions, filterOptionStates]);

// 	return filter;
// };

export const Filters: FC<FiltersProps> = ({ listToFilter, filterOptions, filterCallback }: FiltersProps) => {
	const [filterOptionStates, setFilterOptionStates] = useState<FilterObject[][]>(filterOptions.map(() => []));

	const updateState = (index: number, updatedValue: (prevValue: FilterObject[]) => FilterObject[]) => {
		setFilterOptionStates((prevFilterOptionStates) => {
			const newState = [...prevFilterOptionStates];
			newState[index] = updatedValue(prevFilterOptionStates[index]);
			return newState;
		});
	};

	const useFilters = (listToFilter: any[], filters: FilterObject[], filterProperty: string) => {
		return listToFilter.filter((item) => {
			if (item && item[filterProperty]) {
				return filters.every((filter) => {
					if (filter.type === FilterType.Checkbox) {
						const include = item[filterProperty].includes(filter.name);
						filter.include ? include : !include;
					} else if (filter.type === FilterType.DualRangeSlider) {
						if (filter.min !== undefined && filter.max !== undefined) {
							return item[filterProperty] >= filter.min && item[filterProperty] <= filter.max;
						}
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

		const filteredList = useFilters(listToFilter, filterOptionStates[i], filterOptions[i].dataKey);
		return filter(filteredList, filterOptionStates, i + 1);
	};

	useEffect(() => {
		console.log(filterOptionStates);
		filterCallback(filter(listToFilter, filterOptionStates));
	}, [filterOptionStates]);

	return (
		<>
			{filterOptions.map((option, i) => (
				<>
					{option.type === FilterType.Checkbox && (
						<FilterCheckboxGroup
							key={i}
							topLeftLabel={option.topLeftLabel}
							bottomLeftLabel={option.bottomLeftLabel}
							bottomRightLabel={option.bottomRightLabel}
							options={enumStringArray(option.options ?? {})}
							selectionCallback={(updatedSelectedOptions: (prevValue: FilterObject[]) => FilterObject[]) =>
								updateState(i, updatedSelectedOptions)
							}
						/>
					)}
					{option.type === FilterType.RangeSlider && (
						<Labels
							topLeftLabel={option.topLeftLabel}
							input={
								<input
									type="range"
									min={0}
									max="100"
									onChange={(e) => {
										console.log(e.target.value);
									}}
									className="range"
								/>
							}
						/>
					)}
					{option.type === FilterType.DualRangeSlider && (
						<Labels
							topLeftLabel={option.topLeftLabel}
							input={
								<DualRangeSlider
									onValueChange={(minValue, maxValue) =>
										updateState(i, (prevValue: FilterObject[]) => {
											const updatedValue = prevValue.filter((item) => item.name !== option.topLeftLabel);
											console.log(prevValue);
											return [
												...updatedValue,
												{ name: option.topLeftLabel?.toString() ?? "", min: minValue, max: maxValue, type: FilterType.DualRangeSlider }
											];
										})
									}
								></DualRangeSlider>
							}
						/>
					)}
				</>
			))}
		</>
	);
};
