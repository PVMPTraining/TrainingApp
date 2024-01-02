import React, { FC, HTMLAttributes, use, useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./DualRangeSliderStyle.css";

interface DualRangeSliderProps extends HTMLAttributes<HTMLElement> {
	min?: number;
	max?: number;
	step?: number;
	minValue?: number;
	maxValue?: number;
	onValueChange?: (minValue: number, maxValue: number) => void;
}

export const DualRangeSlider: FC<DualRangeSliderProps> = ({ min = 0, max = 2000, step, onValueChange }) => {
	const [minValue, set_minValue] = useState(min);
	const [maxValue, set_maxValue] = useState(max);

	const handleInput = (e: { min?: number; max?: number; minValue: any; maxValue: any }) => {
		set_minValue(e.minValue);
		set_maxValue(e.maxValue);
	};

	useEffect(() => {
		if (onValueChange) {
			onValueChange(minValue, maxValue);
		}
	}, [minValue, maxValue]);

	return (
		<div>
			<MultiRangeSlider
				baseClassName="dual-range"
				min={min}
				max={max}
				step={5}
				minValue={minValue}
				maxValue={maxValue}
				onInput={(e) => {
					handleInput(e);
				}}
				style={{
					height: "1.5rem",
					border: "none",
					boxShadow: "none",
					padding: "15px 10px"
				}}
				label={false}
				ruler={false}
			/>
			<div>
				Min: {minValue} - Max: {maxValue}
			</div>
		</div>
	);
};
