"use client";

import { useEffect, useState } from "react";

export const useScrollPosition = () => {
	const [scrollDirection, setScrollDirection] = useState("down");
	const [prevScrollPosition, setPrevScrollPosition] = useState(() => window.scrollY);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		let directionChangeTimeout: NodeJS.Timeout | null = null;
		const handleScroll = () => {
			const currentScrollPosition = window.scrollY;
			const isScrollingUp = prevScrollPosition > currentScrollPosition;

			if (isScrollingUp) {
				// directionChangeTimeout = setTimeout(() => {
				// 	setScrollDirection("up");
				// }, 500);
				setScrollDirection("up");
			} else {
				setScrollDirection("down");
			}

			if (currentScrollPosition === 0) setScrollDirection("down");

			setPrevScrollPosition(currentScrollPosition);
		};

		if (!isModalOpen) {
			window.addEventListener("scroll", handleScroll);
		}

		// Cleanup function to remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
			clearTimeout(directionChangeTimeout as ReturnType<typeof setTimeout>);
		};
	}, [prevScrollPosition, isModalOpen]);

	return { scrollDirection, isModalOpen, setIsModalOpen };
};
