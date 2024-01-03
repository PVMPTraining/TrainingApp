import { FaChevronDown } from "react-icons/fa";
import { Button } from "@/src/components/UI/Button/Button";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { FC, HTMLAttributes, useState } from "react";
import { CheckboxState, ThreeStateCheckbox } from "@/src/components/UI/ThreeStateCheckbox/ThreeStateCheckbox";
import { FilterObject, FilterType } from "@/src/components/filter/Filters";
import { LabelsDropdown } from "@/src/components/UI/Labels/LabelsDropdown";

interface FilterCheckboxGroupProps extends HTMLAttributes<HTMLElement> {
	topLeftLabel?: string | React.ReactNode;
	bottomLeftLabel?: string | React.ReactNode;
	bottomRightLabel?: string | React.ReactNode;
	options: string[];
	selectionCallback: (prevValue: (prevValue: FilterObject[]) => FilterObject[]) => void;
}

export const FilterCheckboxGroup: FC<FilterCheckboxGroupProps> = ({
	topLeftLabel,
	bottomLeftLabel,
	bottomRightLabel,
	options,
	selectionCallback
}: FilterCheckboxGroupProps) => {
	return (
		<LabelsDropdown
			topLeftLabel={topLeftLabel}
			input={
				<>
					<div className={["grid grid-cols-1 xs:grid-cols-2 gap-1 m-2"].join(" ")}>
						{options.map((option, i) => (
							<div key={i} className="flex items-center gap-2 justify-start">
								<ThreeStateCheckbox
									onChangeCallback={(state) => {
										switch (state) {
											case CheckboxState.NotChecked:
												selectionCallback((prevValue: FilterObject[]) => {
													prevValue.filter((equipment) => equipment.name !== option);
													return [];
												});
												break;
											case CheckboxState.Include:
												selectionCallback((prevValue: FilterObject[]) => {
													const updatedValue = prevValue.filter((equipment) => equipment.name !== option);
													return [...updatedValue, { name: option, include: true, type: FilterType.Checkbox }];
												});
												break;
											case CheckboxState.Exclude:
												selectionCallback((prevValue: FilterObject[]) => {
													const updatedValue = prevValue.filter((equipment) => equipment.name !== option);
													return [...updatedValue, { name: option, include: false, type: FilterType.Checkbox }];
												});
												break;
										}
									}}
								/>
								<div className="text-xs">{option}</div>
							</div>
						))}
					</div>
				</>
			}
			bottomLeftLabel={bottomLeftLabel}
			bottomRightLabel={bottomRightLabel}
		/>
	);
};
