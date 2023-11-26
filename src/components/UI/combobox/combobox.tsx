import { Input } from "@/src/components/UI/Input/Input";
import React, { ButtonHTMLAttributes, FC, useEffect, useState } from "react";

interface ComboBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	options: string[];
	selectedCallback: (selected: string) => void;
}

const ComboBox: FC<ComboBoxProps> = ({ options, selectedCallback }) => {
	// Define an initial state for the input value and the selected option
	const [inputValue, setInputValue] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [inputFocused, setInputFocused] = useState(false);

	useEffect(() => {
		selectedCallback(selectedOption);
	}, [selectedOption]);

	// Event handler to handle changes in the input field
	const handleInputChange = (event: { target: { value: any } }) => {
		const value = event.target.value;
		setInputValue(value);

		// Set the selected option based on the input value (if it matches an option)
		if (options.includes(value)) {
			setSelectedOption(value);
		} else {
			setSelectedOption("");
		}
	};

	// Event handler to handle option selection from the dropdown
	const handleOptionSelect = (option: React.SetStateAction<string>) => {
		setInputValue(option);
		setSelectedOption(option);
	};

	const handleInputFocus = () => {
		setInputFocused(true);
	};

	const handleInputBlur = () => {
		setInputFocused(false);
	};

	return (
		<div className="dropdown">
			<Input
				tabIndex={0}
				className="focus:rounded-b-none"
				type="text"
				value={inputValue}
				onChange={handleInputChange}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
			/>
			<ul tabIndex={0} className="shadow menu dropdown-content bg-base-100 p-2 w-full rounded-b-md">
				{options
					.filter((option) => option.includes(inputValue))
					.map((option) => (
						<li key={option + Math.random()} onClick={() => handleOptionSelect(option)} style={{ cursor: "pointer" }}>
							{option}
						</li>
					))}
			</ul>
			{selectedOption && <p>You selected: {selectedOption}</p>}
		</div>
	);
};

export default ComboBox;
