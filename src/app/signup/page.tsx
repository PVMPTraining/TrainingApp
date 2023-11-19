'use client'

import Button from "@/src/components/re-usable/Button/Button";
import { Database } from "../../types/types";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Input from "@/src/components/re-usable/Input/Input";
import Link from "next/link";

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();
	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
	);

	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`,
			},
		});
		router.refresh();
	};

	return (
		<div className="h-screen flex flex-col justify-end gap-4 p-8">
			<Link className="fixed top-4 left-4" href='/'>Back</Link>
			<h1>Email</h1>
			<Input
			name="email"
			onChange={(e) => setEmail(e.target.value)}
			value={email}
			/>
			<h1>Password</h1>
			<Input
			type="password"
			name="password"
			onChange={(e) => setPassword(e.target.value)}
			value={password}
			/>
			<Button onClick={handleSignUp}>Sign up</Button>
		</div>
	)
}