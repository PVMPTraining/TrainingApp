import { concatClassName } from "@/src/utils/helpers/functions";
import { FC, ButtonHTMLAttributes, ReactNode, HTMLAttributes, useState, useEffect } from "react";
import version from "@/version.json";

interface DebugOverlayProps extends HTMLAttributes<HTMLElement> {}

export const DebugOverlay: FC<DebugOverlayProps> = ({ className, ...props }: DebugOverlayProps): JSX.Element => {
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== "undefined") {
				setScreenSize({ width: window.innerWidth, height: window.innerHeight });
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<>
			{process.env.NODE_ENV === "production" && (
				<div
					onClick={() => {
						setHidden((prevValue) => !prevValue);
					}}
					className={"fixed bottom-[5rem] right-4 p-2 rounded-xl z-[60] bg-white/5 text-xs backdrop-blur-sm"}
					{...props}
				>
					<div className={concatClassName("flex flex-col", hidden ? "hidden" : "")}>
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
