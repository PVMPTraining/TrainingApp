import React, { FC, HTMLAttributes, useState } from "react";
import { Button } from "@/src/components/UI/Button/Button";
import { FaChevronDown } from "react-icons/fa";
import { Labels } from "@/src/components/UI/Labels/Labels";

interface LabelsDropdownProps extends HTMLAttributes<HTMLElement> {
	input: React.ReactNode;
	topLeftLabel?: string | React.ReactNode;
	topRightLabel?: string | React.ReactNode;
	bottomLeftLabel?: string | React.ReactNode;
	bottomRightLabel?: string | React.ReactNode;
}

export const LabelsDropdown: FC<LabelsDropdownProps> = ({ className, input, topLeftLabel, topRightLabel, bottomLeftLabel, bottomRightLabel }) => {
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
			input={<div className={dropdownToggle ? "" : "hidden"}>{input}</div>}
			bottomLeftLabel={bottomLeftLabel}
			bottomRightLabel={bottomRightLabel}
		/>
	);
};
