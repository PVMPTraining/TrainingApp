import React, { FC, HTMLAttributes, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

interface DualRangeSliderProps extends HTMLAttributes<HTMLElement> {
	min?: number;
	max?: number;
	initialMinValue?: number;
	initialMaxValue?: number;
	step?: number;
	minValue?: number;
	maxValue?: number;
}

export const DualRangeSlider: FC<DualRangeSliderProps> = ({ min, max, initialMinValue, initialMaxValue, step }) => {
	const [minValue, set_minValue] = useState(25);
	const [maxValue, set_maxValue] = useState(75);

	const handleInput = (e: { min?: number; max?: number; minValue: any; maxValue: any }) => {
		set_minValue(e.minValue);
		set_maxValue(e.maxValue);
	};

	return (
		<div>
			<MultiRangeSlider
				min={0}
				max={100}
				step={5}
				minValue={minValue}
				maxValue={maxValue}
				onInput={(e) => {
					handleInput(e);
				}}
				style={{
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
