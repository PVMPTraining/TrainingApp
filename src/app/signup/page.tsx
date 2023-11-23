"use client";
//React
import { FC, useState } from "react";

//Supabase
import { createBrowserClient } from "@supabase/ssr";

//Next
import { useRouter } from "next/navigation";
import Link from "next/link";

//Components
import Button from "@/src/components/re-usable/Button/Button";
import Input from "@/src/components/re-usable/Input/Input";

//Types
import { Database } from "../../types/types";

import { useFormik } from "formik";

import { LoginFormValidationSchema } from "@/src/utils/yup/LoginFormValidationSchema";

const SignupPage: FC = () => {
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

				router.push("/account");
			} catch (error) {
				console.error("Sign-up error:", error);
			}
		}
	});

	return (
		<div className="h-screen flex flex-col justify-end gap-4 p-8">
			<Link className="fixed top-4 left-4" href="/">
				Back
			</Link>
			<form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
				<h1>Email</h1>
				<Input className="bg-base-200" type="text" name="email" onChange={formik.handleChange} value={formik.values.email} />
				{formik.touched.email && formik.errors.email && <div className="text-red-600">{formik.errors.email}</div>}
				<h1>Password</h1>
				<Input className="bg-base-200" type="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
				{formik.touched.password && formik.errors.password && <div className="text-red-600">{formik.errors.password}</div>}
				<Button type="submit">Sign up</Button>
			</form>
		</div>
	);
};

export default SignupPage;
