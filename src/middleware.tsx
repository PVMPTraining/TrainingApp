import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { log } from "console";
import { NextResponse, type NextRequest } from "next/server";
import { authPagePath, homePagePath, loginPagePath, rootPagePath, signupPagePath } from "src/pathmap/pathmap";

/**
 * Middleware function that handles requests and responses.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} The response object.
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
	/**
	 * Represents the response object returned by the NextResponse.next() function.
	 */
	let response = NextResponse.next({
		request: {
			headers: request.headers
		}
	});

	/**
	 * The Supabase client instance.
	 * @type {SupabaseClient}
	 */
	const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			/**
			 * Get the value of a cookie by name.
			 * @param {string} name - The name of the cookie.
			 * @returns {string | undefined} The value of the cookie, or undefined if not found.
			 */
			get(name: string): string | undefined {
				return request.cookies.get(name)?.value;
			},
			/**
			 * Set a cookie with the given name, value, and options.
			 * @param {string} name - The name of the cookie.
			 * @param {string} value - The value of the cookie.
			 * @param {CookieOptions} options - The options for the cookie.
			 */
			set(name: string, value: string, options: CookieOptions): void {
				request.cookies.set({
					name,
					value,
					...options
				});
				response = NextResponse.next({
					request: {
						headers: request.headers
					}
				});
				response.cookies.set({
					name,
					value,
					...options
				});
			},
			/**
			 * Remove a cookie with the given name and options.
			 * @param {string} name - The name of the cookie.
			 * @param {CookieOptions} options - The options for the cookie.
			 */
			remove(name: string, options: CookieOptions): void {
				request.cookies.set({
					name,
					value: "",
					...options
				});
				response = NextResponse.next({
					request: {
						headers: request.headers
					}
				});
				response.cookies.set({
					name,
					value: "",
					...options
				});
			}
		}
	});

	/**
	 * Represents the currently authenticated user.
	 */
	const user = await supabase.auth.getUser();

	if (!user.data.user) {
		switch (request.nextUrl.pathname) {
			case authPagePath:
			case loginPagePath:
			case signupPagePath:
				break;
			default:
				return NextResponse.redirect(new URL(rootPagePath, request.url));
		}
	}

	if (user.data.user) {
		switch (request.nextUrl.pathname) {
			case loginPagePath:
			case signupPagePath:
				return NextResponse.redirect(new URL(homePagePath, request.url));
			default:
				break;
		}
	}

	return response;
}

export const config = {
	matcher: ["/((?!_next|api/auth).*)(.+)"]
};
