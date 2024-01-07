import React, { FC, HTMLAttributes } from "react";
import { Labels } from "../Labels/Labels";

interface SectionProps extends HTMLAttributes<HTMLElement> {
	header: string;
	children: React.ReactNode;
}

export const Section: FC<SectionProps> = ({ className, header, children }: SectionProps) => {
	return <Labels className={className} topLeftLabel={<div className="text-xl text-white font-bold ml-2 mb-1">{header}</div>} input={children} />;
};
