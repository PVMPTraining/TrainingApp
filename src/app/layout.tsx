"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import { Provider } from "react-redux";
import store from "src/utils/redux/store";
import { DebugOverlay } from "../components/DebugOverlay/DebugOverlay";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className} suppressHydrationWarning={true}>
				<Provider store={store}>
					<DebugOverlay />
					{children}
				</Provider>
			</body>
		</html>
	);
}
