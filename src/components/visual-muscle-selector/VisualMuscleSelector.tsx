"use client";
import React from "react";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";

const selectedFillColor = "fill-accent";

const muscleList = [
	"bicep_long_head",
	"bicep_short_head",
	"upper_abs",
	"lower_abs",
	"pectoralis_sternal_head",
	"pectoralis_calvicular_head",
	"lower-pectoralis",
	"lateral-deltoid",
	"anterior-deltoid",
	"upper_trapezius",
	"neck",
	"outer_quadricep",
	"inner_quadricep",
	"rectus_femoris",
	"inner_thigh",
	"tibialis",
	"soleus",
	"gastrocnemius",
	"wrist_extensors",
	"wrist_flexors",
	"hands",
	"obliques"
];

interface VisualMuscleSelectorProps extends HTMLAttributes<HTMLElement> {
	selectedMusclesCallback: (selectedMuscles: string[]) => void;
}

export const VisualMuscleSelector: FC<VisualMuscleSelectorProps> = ({ selectedMusclesCallback }: VisualMuscleSelectorProps) => {
	const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
	const body = useRef<SVGSVGElement>(null);

	const findChildById = (parent: any, targetId: any) => {
		if (parent.id === targetId) {
			return parent;
		}

		for (let i = 0; i < parent.children.length; i++) {
			const child = parent.children[i];
			const result: any = findChildById(child, targetId);
			if (result) {
				return result;
			}
		}

		return null;
	};

	useEffect(() => {
		selectedMusclesCallback(selectedMuscles);
	}, [selectedMuscles]);

	useEffect(() => {
		muscleList.forEach((muscle) => {
			if (!body.current) return;

			Array.from(body.current.children).forEach((child) => {
				const musclesChild = findChildById(child, muscle);

				if (musclesChild) {
					musclesChild.addEventListener("click", addMuscleToSelected);
				}
			});
		});
	}, [body]);

	const addMuscleToSelected = (e: React.MouseEvent) => {
		console.log(e.currentTarget.id);
		setSelectedMuscles((prevSelectedMuscles) => {
			if (prevSelectedMuscles.includes(e.currentTarget.id)) {
				return prevSelectedMuscles.filter((muscle) => muscle !== e.currentTarget.id);
			} else {
				return [...prevSelectedMuscles, e.currentTarget.id];
			}
		});
		e.currentTarget.classList.toggle(selectedFillColor);

		const musclesChildMirror = findChildById(body.current, `${e.currentTarget.id}-2`);
		musclesChildMirror.classList.toggle(selectedFillColor);
	};

	return (
		<svg ref={body} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.81 841.89">
			<g id="no_muscles">
				<path
					d="M265.37,197.81c.36,11.43-1.04,21.68-4.97,30.22,2.19-.16,3.84.46,4.97,1.83.94-1.7,2.57-2.37,5-1.83-3.97-7.74-5.02-18.43-5-30.22Z"
					style={{ fill: "#231f20", stroke: "#231f20", strokeMiterlimit: 10 }}
				/>
				<path
					d="M221.64,572.5c-2.47,9.84-6.28,17.01-12.61,19.17,2.51,6.85,4.89,16.79,7.17,29.28-.15-4.87-.06-9.41,1.83-11.33,7.23-5.47,13.9-11.29,20.06-17.44-8.7-.54-14.07-7.3-16.45-19.67Z"
					style={{ fill: "#231f20", stroke: "#231f20", strokeMiterlimit: 10 }}
				/>
				<path
					d="M309.29,572.5c2.47,9.84,6.28,17.01,12.61,19.17-2.51,6.85-4.89,16.79-7.17,29.28.15-4.87.06-9.41-1.83-11.33-7.23-5.47-13.9-11.29-20.06-17.44,8.7-.54,14.07-7.3,16.45-19.67Z"
					style={{ fill: "#231f20", stroke: "#231f20", strokeMiterlimit: 10 }}
				/>
				<path
					d="M223.55,710.89c-2.86,35.53-5.7,54.86-8.51,54.89l-2.33-27.44s.77,19.67-1.01,38.11-14.89,40-23.11,48.89,40.44,12.67,44.33,4.44-2.89-55.83,0-88.18c-2.58,11.75-5.54,19.05-8,23.74-2.53-9.95-1.91-30.86-1.38-54.44Z"
					style={{ fill: "#231f20", stroke: "#231f20", strokeMiterlimit: 10 }}
				/>
				<path
					d="M307.37,711.14c2.86,35.53,5.7,54.86,8.51,54.89l2.33-27.44s-.77,19.67,1.01,38.11c1.78,18.44,14.89,40,23.11,48.89,8.22,8.89-40.44,12.67-44.33,4.44s2.89-55.83,0-88.18c2.58,11.75,5.54,19.05,8,23.74,2.53-9.95,1.91-30.86,1.38-54.44Z"
					style={{ fill: "#231f20", stroke: "#231f20", strokeMiterlimit: 10 }}
				/>
				<path
					d="M265.32,124.72c-5.3-4.71-13.07-7.59-23.48-8.52,0,0-.17-5.1-.96-8.37s-5.95-14.33-5.95-14.33c0,0-5.89-3.17-8.08-8.5s-4.64-16-2.61-18.11,4.58,0,4.58,0c-8.56-84.56,84.78-75.22,71.94,0,0,0,3.28-2.22,4.5,0s.61,13.67-1.83,18.11-8.5,8.67-8.5,8.67c0,0-4.01,7.08-5,13.67s-1.33,8.87-1.33,8.87c-8.43.22-16.22,2.92-23.27,8.52Z"
					style={{ fill: "#231f20", stroke: "#231f20", strokeMiterlimit: 10 }}
				/>
			</g>
			<g id="muscles">
				<g>
					<g>
						<path
							id="gastrocnemius"
							d="M306.04,763.83c2.33-.67,1.5-50.78-1-78.06s-12.89-73.06-14.83-73.28-11.17,29-9.17,47.67,6.17,41.33,9,52c2.83,10.67,13.67,52.33,16,51.67Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="soleus"
							d="M322.42,591.82c2.37,1.22,10.85,30.4,9.96,43.74-.45,6.8-5.51,48.42-9.56,64.44-4.05,16.02-5.8,64.04-6.89,65.78-2.22,3.56-10.19-69.34-10.89-80-.35-5.29,9.1-53.68,8.94-58.89s7.23-35.69,8.43-35.07Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="tibialis"
							d="M305.02,680.64c1.84-3.34-20.76-99.43-21.5-99.73.11,1.01,3.94,8.93,6.86,10.26,4.25,1.94,16.34,14.73,21.67,18.62,7.81,5.71-8.09,72.79-7.02,70.85Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="outer_quadricep"
							d="M322.04,370.67c1.67,1.67,18,64.33,19.33,125.67s-13.67,95.17-18.92,95.33-14.22-16.31-15.72-33.44c20.62-60.3,25.48-122.85,15.3-187.56Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="inner_quadricep"
							d="M280.71,482.25s-5.17,24.92-3.33,59.58,8.51,51.67,16.76,49.83,14.29-11.76,14.6-17.13-1.56-12.45-1.99-17.37c-12.87-22.25-22.26-46.88-26.03-74.92Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="rectus_femoris"
							d="M322.04,370.67c3.92,14,4.78,34.38,5.22,57.33-1.43,48.54-6.08,94.01-20.53,130.22,0,0-28.44-56.99-26.03-75.97,2.49-19.66,21.4-83.99,41.33-111.58Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="inner_thigh"
							d="M265.81,405.67c.83,39.46,14.35,85.92,14.9,76.58s21.11-78.47,32.11-96.92,8.22-10,9.63-24.9c.51,7.44-23.94,22.39-30.52,24.68-1.79.62-16.48,15.14-26.12,20.56Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="hands"
							d="M471.27,380.44s12.44-1.89,18.67-.78,23.78,4.22,25.33,4.22,1.56,1.78,1.56,2.44-.22,2.44-2,2.67-4.22,0-6.44,0-15.56-1.78-15.56-1.78c0,0,0,2.44,2.44,5.56s25.11,32,25.11,33.33.44,3.56-1.11,4-3.56,0-3.56,0c0,0,2,3.78,1.78,5.33s-1.56,1.56-2.44,1.78-4.22-2-4.22-2c0,0,.67,3.11-.67,3.33s-1.33,0-3.33,0-8.89-8-8.89-8c0,0,1.33,4.22.22,4.89s-1.11.89-3.56,0-2.67-1.56-3.78-2.44-10.89-10.44-13.78-11.11-8.89-5.33-12-8.67c-3.11-3.33-8.44-17.22-8.44-17.22.81-1.05,2.22-1.22,4-3.89s4.44-6.44,7.56-7.78,1.74-2.77,3.11-3.89Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="wrist_flexors"
							d="M389.27,299.56c-10.66-4.89-19.88-10.91-27.82-17.95,0,0,4.49,36.84,24.71,51.95,20.22,15.11,67.56,63.33,70.44,62.44s6.89-8.22,6.89-8.22c-32.65-30.07-59.71-59.67-74.22-88.22Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="wrist_extensors"
							d="M388.38,299.33c15.15,28.71,42.41,58.37,75.11,88.44,0,0,9.33-5.11,7.78-7.33s-33.98-31.56-41.44-56.67c-7.45-25.11-27.07-39.71-39.23-52.22-.42,17.84-1.15,27.39-2.22,27.78Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="bicep_short_head"
							d="M388.38,299.33s-17.33-30.22-24.67-51.78-10-43.56-10-43.56c0,0-12.25,29.91-7.33,54.44,4.78,23.88,41.12,39.99,42,40.89Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="bicep_long_head"
							d="M354.38,202.67s31.78,14.67,34.89,37.33c3.11,22.67,0,59.56,0,59.56,0,0-16-26-25.56-52s-9.33-44.89-9.33-44.89Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="obliques"
							d="M353.71,204c-6.21,17.17-11.22,43.89-15.67,55.67-4.44,11.78-7.54,13.47-10.78,18.33-5.94,8.93-3.43,68.01-4.44,80.44-.91,11.16-30.68,28.79-31.11,25.33-.55-4.43,12-65.89,14.22-88.44,2.22-22.56.51-41.82-2.89-47.11-2.94-4.57-30.52-17.57-31.56-19.56,15.11,9.22,23.11,10.67,39.78,6.78s26.88-12.31,42.44-31.44Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="lower_abs"
							d="M291.71,383.78c-1.98,5.11-23.29,20.22-25.9,21.89l.18-85.56s7.24,3.13,10.31,3.56,24.25,3.67,25.5-4.17c1.25-7.83-8.64,57.83-10.08,64.28Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="upper_abs"
							d="M301.54,320.83c-1.23,5.36-25.79,4.44-35.65-1.19l.05-89.65c-.07-.83,3.98-2.15,5.45-1.19s24.08,13.13,31.65,19.27c10.17,14.09-1.17,70.43-1.5,72.76Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="lower-pectoralis"
							d="M354.49,202.22c-.4-.41-27.19,12.61-52.69,7.11s-35.67-7.33-35.67-7.33c0,0-.94,17.5,5.36,26.67,15.27,10.04,31.64,10.21,47.21,4.38,18.69-7,36.42-30.19,35.79-30.83Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="pectoralis_sternal_head"
							d="M354.49,202.22c1.14-.22-23.53,13.78-52.69,7.11-29.17-6.67-34.17-6.83-36-8.67-.67-4.83.15-40.19.15-40.19,14.58,2.45,40.47,8.47,56.33,25.74,15.86,17.28,31.08,16.22,32.22,16Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="pectoralis_calvicular_head"
							d="M371.96,213.88c1,.53-10.81-8.49-17.48-11.65-3.58-1.7-11.68,5.6-32.22-16-20.54-21.6-56.47-24.47-56.33-25.74.21-1.93,30.99-5.81,43.66-3.15s19.31-8.56,19.33-7.78-11.33,16.99,3.78,32.16,36.06,30.48,39.25,32.16Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="anterior-deltoid"
							d="M371.96,213.88s-23.7-14.89-39.25-32.16-4-32.1-3.78-32.16,15.11,13.33,23.56,24.89,19.48,39.43,19.48,39.43Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="lateral-deltoid"
							d="M371.96,213.88c1,1.12,2.08-37.65-6.14-48.1s-36.86-16.49-36.89-16.22,13.78,12,23.56,24.89,18.48,38.31,19.48,39.43Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="upper_trapezius"
							d="M328.93,149.56s-39.09-19.29-38.94-17.33c.15,1.93-5.44,11.11-11.44,19s-14.59,10.28-12.6,9.26c4.11-2.12,30.72-6.03,43.66-3.15s19.33-7.78,19.33-7.78Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="neck"
							d="M265.94,160.48s-.05-35.51.05-35.81c.94-2.94,22.06-9.44,23.28-8.33s.72,15.89.72,15.89c-7.39,16.05-15.5,24.53-24.05,28.26Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							id="gastrocnemius-2"
							data-name="gastrocnemius"
							d="M224.92,763.83c-2.33-.67-1.5-50.78,1-78.06s12.89-73.06,14.83-73.28,11.17,29,9.17,47.67-6.17,41.33-9,52-13.67,52.33-16,51.67Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="soleus-2"
							data-name="soleus"
							d="M208.55,591.82c-2.37,1.22-10.85,30.4-9.96,43.74.45,6.8,5.51,48.42,9.56,64.44,4.05,16.02,5.8,64.04,6.89,65.78,2.22,3.56,10.19-69.34,10.89-80,.35-5.29-9.1-53.68-8.94-58.89s-7.23-35.69-8.43-35.07Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="tibialis-2"
							data-name="tibialis"
							d="M225.94,680.64c-1.84-3.34,20.76-99.43,21.5-99.73-.11,1.01-3.94,8.93-6.86,10.26-4.25,1.94-16.34,14.73-21.67,18.62-7.81,5.71,8.09,72.79,7.02,70.85Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="outer_quadricep-2"
							data-name="outer_quadricep"
							d="M208.92,370.67c-1.67,1.67-18,64.33-19.33,125.67s13.67,95.17,18.92,95.33,14.22-16.31,15.72-33.44c-20.62-60.3-25.48-122.85-15.3-187.56Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="inner_quadricep-2"
							data-name="inner_quadricep"
							d="M250.26,482.25s5.17,24.92,3.33,59.58-8.51,51.67-16.76,49.83-14.29-11.76-14.6-17.13,1.56-12.45,1.99-17.37c12.87-22.25,22.26-46.88,26.03-74.92Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="rectus_femoris-2"
							data-name="rectus_femoris"
							d="M208.92,370.67c-3.92,14-4.78,34.38-5.22,57.33,1.43,48.54,6.08,94.01,20.53,130.22,0,0,28.44-56.99,26.03-75.97-2.49-19.66-21.4-83.99-41.33-111.58Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="inner_thigh-2"
							data-name="inner_thigh"
							d="M265.16,405.67c-.83,39.46-14.35,85.92-14.9,76.58s-21.11-78.47-32.11-96.92-8.22-10-9.63-24.9c-.51,7.44,23.94,22.39,30.52,24.68,1.79.62,16.48,15.14,26.12,20.56Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="hands-2"
							data-name="hands"
							d="M59.7,380.44s-12.44-1.89-18.67-.78-23.78,4.22-25.33,4.22-1.56,1.78-1.56,2.44.22,2.44,2,2.67,4.22,0,6.44,0,15.56-1.78,15.56-1.78c0,0,0,2.44-2.44,5.56s-25.11,32-25.11,33.33-.44,3.56,1.11,4,3.56,0,3.56,0c0,0-2,3.78-1.78,5.33s1.56,1.56,2.44,1.78,4.22-2,4.22-2c0,0-.67,3.11.67,3.33s1.33,0,3.33,0,8.89-8,8.89-8c0,0-1.33,4.22-.22,4.89s1.11.89,3.56,0,2.67-1.56,3.78-2.44,10.89-10.44,13.78-11.11,8.89-5.33,12-8.67,8.44-17.22,8.44-17.22c-.81-1.05-2.22-1.22-4-3.89s-4.44-6.44-7.56-7.78-1.74-2.77-3.11-3.89Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="wrist_flexors-2"
							data-name="wrist_flexors"
							d="M141.7,299.56c10.66-4.89,19.88-10.91,27.82-17.95,0,0-4.49,36.84-24.71,51.95s-67.56,63.33-70.44,62.44-6.89-8.22-6.89-8.22c32.65-30.07,59.71-59.67,74.22-88.22Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="wrist_extensors-2"
							data-name="wrist_extensors"
							d="M142.59,299.33c-15.15,28.71-42.41,58.37-75.11,88.44,0,0-9.33-5.11-7.78-7.33s33.98-31.56,41.44-56.67,27.07-39.71,39.23-52.22c.42,17.84,1.15,27.39,2.22,27.78Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="bicep_short_head-2"
							data-name="bicep_short_head"
							d="M142.59,299.33s17.33-30.22,24.67-51.78,10-43.56,10-43.56c0,0,12.25,29.91,7.33,54.44-4.78,23.88-41.12,39.99-42,40.89Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="bicep_long_head-2"
							data-name="bicep_long_head"
							d="M176.59,202.67s-31.78,14.67-34.89,37.33,0,59.56,0,59.56c0,0,16-26,25.56-52s9.33-44.89,9.33-44.89Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="obliques-2"
							data-name="obliques"
							d="M177.26,204c6.21,17.17,11.22,43.89,15.67,55.67s7.54,13.47,10.78,18.33c5.94,8.93,3.43,68.01,4.44,80.44.91,11.16,30.68,28.79,31.11,25.33.55-4.43-12-65.89-14.22-88.44s-.51-41.82,2.89-47.11c2.94-4.57,30.52-17.57,31.56-19.56-15.11,9.22-23.11,10.67-39.78,6.78s-26.88-12.31-42.44-31.44Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="lower_abs-2"
							data-name="lower_abs"
							d="M239.26,383.78c1.98,5.11,23.29,20.22,25.9,21.89l-.18-85.56s-7.24,3.13-10.31,3.56-24.25,3.67-25.5-4.17,8.64,57.83,10.08,64.28Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="upper_abs-2"
							data-name="upper_abs"
							d="M229.42,320.83c1.23,5.36,25.79,4.44,35.65-1.19l-.05-89.65c.07-.83-3.98-2.15-5.45-1.19s-24.08,13.13-31.65,19.27c-10.17,14.09,1.17,70.43,1.5,72.76Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="lower-pectoralis-2"
							data-name="lower-pectoralis"
							d="M176.48,202.22c.4-.41,27.19,12.61,52.69,7.11s35.67-7.33,35.67-7.33c0,0,.94,17.5-5.36,26.67-15.27,10.04-31.64,10.21-47.21,4.38-18.69-7-36.42-30.19-35.79-30.83Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="pectoralis_sternal_head-2"
							data-name="pectoralis_sternal_head"
							d="M176.48,202.22c-1.14-.22,23.53,13.78,52.69,7.11s34.17-6.83,36-8.67c.67-4.83-.15-40.19-.15-40.19-14.58,2.45-40.47,8.47-56.33,25.74s-31.08,16.22-32.22,16Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="pectoralis_calvicular_head-2"
							data-name="pectoralis_calvicular_head"
							d="M159,213.88c-1,.53,10.81-8.49,17.48-11.65,3.58-1.7,11.68,5.6,32.22-16s56.47-24.47,56.33-25.74c-.21-1.93-30.99-5.81-43.66-3.15s-19.31-8.56-19.33-7.78,11.33,16.99-3.78,32.16-36.06,30.48-39.25,32.16Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="anterior-deltoid-2"
							data-name="anterior-deltoid"
							d="M159,213.88s23.7-14.89,39.25-32.16,4-32.1,3.78-32.16-15.11,13.33-23.56,24.89-19.48,39.43-19.48,39.43Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="lateral-deltoid-2"
							data-name="lateral-deltoid"
							d="M159,213.88c-1,1.12-2.08-37.65,6.14-48.1s36.86-16.49,36.89-16.22-13.78,12-23.56,24.89-18.48,38.31-19.48,39.43Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
					<g>
						<path
							id="upper_trapezius-2"
							data-name="upper_trapezius"
							d="M202.03,149.56s39.09-19.29,38.94-17.33c-.15,1.93,5.44,11.11,11.44,19s14.59,10.28,12.6,9.26c-4.11-2.12-30.72-6.03-43.66-3.15s-19.33-7.78-19.33-7.78Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
						<path
							id="neck-2"
							data-name="neck"
							d="M265.03,160.48s.05-35.51-.05-35.81c-.94-2.94-22.06-9.44-23.28-8.33s-.72,15.89-.72,15.89c7.39,16.05,15.5,24.53,24.05,28.26Z"
							style={{ stroke: "#231f20", strokeMiterlimit: 10 }}
						/>
					</g>
				</g>
			</g>
		</svg>
	);
};
