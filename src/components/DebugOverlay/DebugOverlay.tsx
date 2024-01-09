import { FC, useState, useEffect, useCallback, HTMLAttributes, TouchEventHandler } from "react";
import version from "@/version.json";
import { concatClassName } from "@/src/utils/helpers/functions";

interface DebugOverlayProps extends HTMLAttributes<HTMLElement> {
	claasName?: string;
}

export const DebugOverlay: FC<DebugOverlayProps> = ({ className, ...props }) => {
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
	const [hidden, setHidden] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== "undefined") {
				setScreenSize({ width: window.innerWidth, height: window.innerHeight });
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const startDrag = useCallback(
		(x: number, y: number) => {
			setDragging(true);
			setOffset({ x: x - position.x, y: y - position.y });
		},
		[position]
	);

	const onDrag = useCallback(
		(x: number, y: number) => {
			if (dragging) {
				setPosition({ x: x - offset.x, y: y - offset.y });
			}
		},
		[dragging, offset]
	);

	const stopDrag = () => {
		setDragging(false);
	};

	const onMouseDown = useCallback(
		(e: { clientX: any; clientY: any }) => {
			startDrag(e.clientX, e.clientY);
		},
		[startDrag]
	);

	const onTouchStart = useCallback<TouchEventHandler>(
		(event: React.TouchEvent<Element>) => {
			const touch = event.touches[0];
			startDrag(touch.clientX, touch.clientY);
		},
		[startDrag]
	);

	useEffect(() => {
		const handleMouseMove = (e: { clientX: number; clientY: number }) => onDrag(e.clientX, e.clientY);
		const handleTouchMove = (e: TouchEvent) => {
			const touch = e.touches[0];
			onDrag(touch.clientX, touch.clientY);
		};

		if (dragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("touchmove", handleTouchMove);
			window.addEventListener("mouseup", stopDrag);
			window.addEventListener("touchend", stopDrag);
		} else {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("mouseup", stopDrag);
			window.removeEventListener("touchend", stopDrag);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("mouseup", stopDrag);
			window.removeEventListener("touchend", stopDrag);
		};
	}, [dragging, onDrag]);

	return (
		<>
			{process.env.NODE_ENV !== "production" && (
				<div
					onMouseDown={onMouseDown}
					onTouchStart={onTouchStart}
					style={{ top: position.y, left: position.x }}
					onClick={(e) => {
						setHidden((prevValue) => !prevValue);
					}}
					className={concatClassName("fixed p-2 rounded-xl z-[60] bg-white/5 text-xs backdrop-blur-sm cursor-move touch-none", className)}
					{...props}
				>
					<div className={hidden ? "hidden" : "flex flex-col"}>
						<span>
							{`Build: `}
							<span className="uppercase">
								{version.tag} {version.version}
							</span>
						</span>
						<span>width: {screenSize.width}px</span>
						<span>height: {screenSize.height}px</span>
					</div>
					<div className={hidden ? "" : "hidden"}>
						<span>show</span>
					</div>
				</div>
			)}
		</>
	);
};
