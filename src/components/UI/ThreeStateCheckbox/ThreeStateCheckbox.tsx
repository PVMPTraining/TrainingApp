import React, { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react";

export enum CheckboxState {
	NotChecked = 0,
	Include = 1,
	Exclude = 2
}

interface ThreeStateCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	onChangeCallback: (value: CheckboxState) => void;
}

export const ThreeStateCheckbox: FC<ThreeStateCheckboxProps> = ({ onChangeCallback }: ThreeStateCheckboxProps) => {
	const checkboxRef = useRef<HTMLInputElement>(null); // Create a ref
	const [checkboxState, setCheckboxState] = useState<CheckboxState>(CheckboxState.NotChecked);

	useEffect(() => {
		onChangeCallback(checkboxState);
	}, [checkboxState]);

	const handleCheckboxClick = () => {
		switch (checkboxState) {
			case CheckboxState.NotChecked:
				setCheckboxState(CheckboxState.Include);
				if (checkboxRef.current) {
					checkboxRef.current.checked = true;
				}
				break;
			case 1:
				setCheckboxState(CheckboxState.Exclude);
				if (checkboxRef.current) {
					checkboxRef.current.indeterminate = true;
				}
				break;
			case 2:
				setCheckboxState(CheckboxState.NotChecked);
				if (checkboxRef.current) {
					checkboxRef.current.checked = false;
					checkboxRef.current.indeterminate = false;
				}
				break;
			default:
				setCheckboxState(CheckboxState.NotChecked);
				break;
		}
	};

	return (
		<input
			ref={checkboxRef} // Assign the ref to the input element
			type="checkbox"
			className="checkbox"
			onClick={handleCheckboxClick}
		/>
	);
};
