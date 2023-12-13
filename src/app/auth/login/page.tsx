"use client";
//React
import { FC, useState } from "react";

//Supabase
import { createBrowserClient } from "@supabase/ssr";

//Next
import { useRouter } from "next/navigation";
import Link from "next/link";

//Components
import { Button } from "@/src/components/UI/Button/Button";
import { Input } from "@/src/components/UI/Input/Input";

//Types
import { Database } from "src/types/types";

import { useFormik } from "formik";

import { LoginFormValidationSchema } from "@/src/utils/yup/LoginFormValidationSchema";
import { accountPagePath, rootPagePath, signupPagePath } from "src/pathmap/pathmap";
import { FaChevronLeft } from "react-icons/fa";

const LoginPage: FC = () => {
	const [error, setError] = useState<string | null>(null);

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
				const { data: response, error: err } = await supabase.auth.signInWithPassword({
					email: values.email,
					password: values.password
				});

				if (err) {
					setError(err.message);
					throw err;
				}

				router.refresh();
				router.push(accountPagePath);
			} catch (error) {
				console.error("Sign-in error:", error);
			}
		}
	});

	return (
		<div className="h-screen flex flex-col justify-end gap-4 p-8">
			<Link className="fixed p-8 top-0 left-0" href={rootPagePath}>
				<FaChevronLeft />
			</Link>
			<form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
				<h1>Email</h1>
				<Input
					className={`bg-base-200 ${formik.touched.email && formik.errors.email ? "input-error" : ""}`}
					type="text"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email && <div className="text-red-600">{formik.errors.email}</div>}
				<h1>Password</h1>
				<Input
					className={`bg-base-200 ${formik.touched.password && formik.errors.password ? "input-error" : ""}`}
					type="password"
					name="password"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				{formik.touched.password && formik.errors.password && <div className="text-red-600">{formik.errors.password}</div>}
				<Button className="mt-2" type="submit">
					Sign in
				</Button>
				{error && <div className="text-red-600">{error}</div>}
				<div className="divider">OR</div>
				<Button
					onClick={() => {
						router.push(signupPagePath);
					}}
					type="button"
				>
					Sign up
				</Button>
			</form>
		</div>
	);
};

export default LoginPage;