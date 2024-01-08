"use client";
//React
import { FC } from "react";

//Supabase
import { createBrowserClient } from "@supabase/ssr";

//Next
import { useRouter } from "next/navigation";
import Link from "next/link";

//Components
import { Button } from "@/src/components/UI/Button/Button";
import { Input } from "@/src/components/UI/Input/Input";

//Types
import { Database } from "@/src/types/types";

import { useFormik } from "formik";

import { LoginFormValidationSchema } from "@/src/utils/yup/LoginFormValidationSchema";
import { accountPagePath, loginPagePath, rootPagePath } from "@/src/pathmap/pathmap";
import { FaChevronLeft } from "react-icons/fa";
import { useLocalizedStrings } from "@/src/utils/localisation/localisation";

import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import config from "@/tailwind.config";

const SignupPage: FC = () => {
	if (Capacitor.isPluginAvailable("StatusBar")) {
		StatusBar.setBackgroundColor({ color: config.daisyui.themes[0].dark["base-100"] });
	}

	const strings = useLocalizedStrings();

	const router = useRouter();
	const supabase = createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema: LoginFormValidationSchema,
		onSubmit: async (values) => {
			try {
				await supabase.auth.signUp({
					email: values.email,
					password: values.password,
					options: {
						emailRedirectTo: `${location.origin}/auth/callback`
					}
				});
				router.refresh();

				router.push(accountPagePath);
			} catch (error) {
				console.error("Sign-up error:", error);
			}
		}
	});

	return (
		<div className="h-screen flex flex-col justify-end gap-4 p-8">
			<Link className="fixed p-8 top-0 left-0" href={rootPagePath}>
				<FaChevronLeft />
			</Link>
			<form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
				<h1>{strings.signupPage.email}</h1>
				<Input
					className={`bg-base-200 ${formik.touched.email && formik.errors.email ? "input-error" : ""}`}
					type="text"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email && <div className="text-red-600">{formik.errors.email}</div>}
				<h1>{strings.signupPage.password}</h1>
				<Input
					className={`bg-base-200 ${formik.touched.password && formik.errors.password ? "input-error" : ""}`}
					type="password"
					name="password"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				{formik.touched.password && formik.errors.password && <div className="text-red-600">{formik.errors.password}</div>}
				<Button className="mt-2" type="submit">
					{strings.signupPage.signUp}
				</Button>
				<div className="divider">{strings.signupPage.orDivider}</div>
				<Button
					onClick={() => {
						router.push(loginPagePath);
					}}
					type="button"
				>
					{strings.signupPage.signIn}
				</Button>
			</form>
		</div>
	);
};

export default SignupPage;
