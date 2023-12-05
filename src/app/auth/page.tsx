"use client";
import { FC } from "react";

// Next
import Link from "next/link";
import { loginPagePath, signupPagePath } from "@/src/pathmap/pathmap";

const AuthPage: FC = () => {
	return (
		<>
			<div className="min-h-screen flex flex-col justify-end gap-4 p-8">
				<h1 className="text-4xl font-bold">Welcome!</h1>
				<p>Proceed below to access the best sports app ever created on planet Earth!</p>
				<div className="flex gap-4 flex-col">
					<Link className="btn" href={loginPagePath}>
						Login
					</Link>
					<Link className="btn" href={signupPagePath}>
						Signup
					</Link>
				</div>
			</div>
		</>
	);
};

export default AuthPage;
