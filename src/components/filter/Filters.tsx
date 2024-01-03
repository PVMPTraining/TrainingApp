import React, { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import { FilterCheckboxGroup } from "@/src/components/Filter/FilterCheckboxGroup/FilterCheckboxGroup";
import { enumStringArray } from "@/src/utils/helpers/functions";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { DualRangeSlider } from "@/src/components/UI/DualRangeSlider/DualRangeSlider";
import { FilterVisualMuscleSelector } from "@/src/components/Filter/FilterVisualMuscleSelector/FilterVisualMuscleSelector";

export enum FilterType {
	Checkbox,
	RangeSlider,
	DualRangeSlider,
	VisualMuscle
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
						if (filter.include) {
							return item[filterProperty].includes(filter.name);
						} else {
							return !item[filterProperty].includes(filter.name);
						}
					} else if (filter.type === FilterType.DualRangeSlider) {
						if (filter.min !== undefined && filter.max !== undefined) {
							return item[filterProperty] >= filter.min && item[filterProperty] <= filter.max;
						}
					} else if (filter.type === FilterType.VisualMuscle) {
						console.log(filter.name, item[filterProperty]);
						if (filter.include) {
							return item[filterProperty].includes(filter.name);
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
							key={i}
							topLeftLabel={option.topLeftLabel}
							input={
								<DualRangeSlider
									onValueChange={(minValue, maxValue) =>
										updateState(i, (prevValue: FilterObject[]) => {
											const updatedValue = prevValue.filter((item) => item.name !== option.topLeftLabel);
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
					{option.type === FilterType.VisualMuscle && (
						<FilterVisualMuscleSelector
							onChangeCallback={(strArr) => {
								const newState: FilterObject[] = [];
								strArr.forEach((str) => {
									newState.push({ name: str, include: true, type: FilterType.VisualMuscle });
								});
								updateState(i, () => {
									return newState;
								});
							}}
						/>
					)}
				</>
			))}
		</>
	);
};
