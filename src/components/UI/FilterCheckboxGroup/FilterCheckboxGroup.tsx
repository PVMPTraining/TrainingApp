import { FaChevronDown } from "react-icons/fa";
import { Button } from "@/src/components/UI/Button/Button";
import { Labels } from "@/src/components/UI/Labels/Labels";
import { FC, HTMLAttributes, useState } from "react";
import { CheckboxState, ThreeStateCheckbox } from "@/src/components/UI/ThreeStateCheckbox/ThreeStateCheckbox";

interface FilterCheckboxGroupProps extends HTMLAttributes<HTMLElement> {
	topLeftLabel?: string | React.ReactNode;
	topRightLabel?: string | React.ReactNode;
	bottomLeftLabel?: string | React.ReactNode;
	bottomRightLabel?: string | React.ReactNode;
	options: string[];
	selectionCallback: (prevValue: any) => void;
}

export const FilterCheckboxGroup: FC<FilterCheckboxGroupProps> = ({
	topLeftLabel,
	topRightLabel,
	bottomLeftLabel,
	bottomRightLabel,
	options,
	selectionCallback
}: FilterCheckboxGroupProps) => {
	const [dropdownToggle, setDropdownToggle] = useState(false);

	return (
		<Labels
			topLeftLabel={topLeftLabel}
			topRightLabel={
				<Button
					onClick={(e) => {
						e.preventDefault(); // Prevent default form submission behavior
						setDropdownToggle((prevValue) => !prevValue);
					}}
					className="btn-xs"
				>
					{!dropdownToggle && <FaChevronDown />}
					{dropdownToggle && <FaChevronDown className="transform rotate-180" />}
				</Button>
			}
			input={
				<>
					{dropdownToggle && (
						<div className="grid grid-cols-1 xs:grid-cols-2 gap-1 m-2">
							{options.map((option, i) => (
								<div key={i} className="flex items-center gap-2 justify-start">
									<ThreeStateCheckbox
										onChangeCallback={(state) => {
											switch (state) {
												case CheckboxState.NotChecked:
													selectionCallback((prevValue: any[]) => {
														prevValue.filter((equipment) => equipment.name !== option);
														return [];
													});
													break;
												case CheckboxState.Include:
													selectionCallback((prevValue: any[]) => {
														const updatedValue = prevValue.filter((equipment) => equipment.name !== option);
														return [...updatedValue, { name: option, include: true }];
													});
													break;
												case CheckboxState.Exclude:
													selectionCallback((prevValue: any[]) => {
														const updatedValue = prevValue.filter((equipment) => equipment.name !== option);
														return [...updatedValue, { name: option, include: false }];
													});
													break;
											}
										}}
									/>
									<div className="text-xs">{option}</div>
								</div>
							))}
						</div>
					)}
				</>
			}
			bottomLeftLabel={bottomLeftLabel}
			bottomRightLabel={bottomRightLabel}
		/>
	);
};
