import Button from "@/src/components/re-usable/Button/Button";

export default function Login() {
	return (
		<form action="/auth/login" method="post">
			<label htmlFor="email">Email</label>
			<input name="email" />
			<label htmlFor="password">Password</label>
			<input type="password" name="password" />
			<Button>Sign In</Button>
			<Button formAction="/auth/sign-up">Sign Up</Button>
		</form>
	)
}