import React, { FC, HTMLAttributes } from "react";

interface LabelsProps extends HTMLAttributes<HTMLElement> {
	input: React.ReactNode;
	topLeftLabel?: string | React.ReactNode;
	topRightLabel?: string | React.ReactNode;
	bottomLeftLabel?: string | React.ReactNode;
	bottomRightLabel?: string | React.ReactNode;
}

export const Labels: FC<LabelsProps> = ({ className, input, topLeftLabel, topRightLabel, bottomLeftLabel, bottomRightLabel }) => {
	return (
		<div className={["form-control w-full", className].join(" ")}>
			{(topLeftLabel || topRightLabel) && (
				<div className="label">
					{topLeftLabel && <span className="label-text">{topLeftLabel}</span>}
					{topRightLabel && <span className="label-text-alt">{topRightLabel}</span>}
				</div>
			)}
			{input}
			{(bottomLeftLabel || bottomRightLabel) && (
				<div className="label">
					<span className="label-text-alt">{bottomLeftLabel}</span>
					<span className="label-text-alt">{bottomRightLabel}</span>
				</div>
			)}
		</div>
	);
};
