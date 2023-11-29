import { Input } from "@/src/components/UI/Input/Input";
import { FormikErrors, FormikTouched } from "formik";
import React, { ButtonHTMLAttributes, FC, useEffect, useState } from "react";

interface ComboBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	options: string[];
	selectedCallback: (selected: string) => void;
	value: string;
	index?: number;
	touched?: FormikTouched<any>;
	errors?: FormikErrors<any>;
}

export const ComboBox: FC<ComboBoxProps> = ({ className, options, selectedCallback, index, value, touched, errors }) => {
	// Define an initial state for the input value and the selected option
	const [inputValue, setInputValue] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [inputFocused, setInputFocused] = useState(false);

	useEffect(() => {
		selectedCallback(selectedOption);
	}, [selectedOption]);

	useEffect(() => {
		setInputValue(value);

		// Set the selected option based on the input value (if it matches an option)
		if (options.includes(value)) {
			setSelectedOption(value);
		} else {
			setSelectedOption("");
		}
	}, [value]);

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
		<div className={["dropdown", className].join(" ")}>
			<div className="form-control w-full">
				<Input
					tabIndex={0}
					className={`focus:rounded-b-none ${
						index !== null && touched?.exercises && touched?.exercises[index] && errors?.exercises && errors?.exercises[index] ? "input-error" : ""
					}`}
					placeholder="Search..."
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
				/>
				<div className="label">
					<span className="label-text-alt">
						{index !== null && touched?.exercises && touched?.exercises[index] && errors?.exercises && errors?.exercises[index] && (
							<div className="text-red-600">{errors.name}</div>
						)}
					</span>
				</div>
			</div>
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
