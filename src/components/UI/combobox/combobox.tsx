import { Input } from "@/src/components/UI/Input/Input";
import React, { ButtonHTMLAttributes, FC, useState } from "react";

interface ComboBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	options: string[];
}

const ComboBox: FC<ComboBoxProps> = ({ options }) => {
	// Define an initial state for the input value and the selected option
	const [inputValue, setInputValue] = useState("");

	// Event handler to handle changes in the input field
	const handleInputChange = (event: { target: { value: any } }) => {
		const value = event.target.value;
		setInputValue(value);
	};

	// Event handler to handle option selection from the dropdown
	const handleOptionSelect = (option: React.SetStateAction<string>) => {
		setInputValue(option);
	};

	return (
		<div className="dropdown">
			<Input tabIndex={0} className="focus:rounded-b-none" type="text" value={inputValue} onChange={handleInputChange} />
			<ul tabIndex={0} className="shadow menu dropdown-content bg-base-100 p-2 w-full rounded-b-md">
				{options
					.filter((option) => option.includes(inputValue))
					.map((option) => (
						<li key={option + Math.random()} onClick={() => handleOptionSelect(option)} style={{ cursor: "pointer" }}>
							{option}
						</li>
					))}
			</ul>
		</div>
	);
};

export default ComboBox;
