import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    },
  );

  // await supabase.auth.getSession()
  //   const user = await supabase.auth
  //     .getUser()
  //     .then((data) => console.log(data.data.user?.aud));

	if(!user.data.user) {
		switch (request.nextUrl.pathname) {
			case '/login':
			case '/signup':
			case '/':
				break;
			default:
				return NextResponse.redirect(new URL('/', request.url));
		}
	}

	if(user.data.user) {
		switch (request.nextUrl.pathname) {
			case '/login':
			case '/signup':
			case '/':
				return NextResponse.redirect(new URL('/account', request.url))
			default:
				break;
		}
	}

  return response;
}

export const config = {
	matcher: [
		'/((?!_next|api/auth).*)(.+)'
	],
}