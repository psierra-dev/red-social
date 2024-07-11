import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from "next/server";
import UserService from './app/services/user';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
 
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  if(request.nextUrl.pathname === '/single_sign_on'){
    const userService = new UserService(supabase);

    const {data: user} = await userService.getUser();

    if(user && user.is_completed) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  return NextResponse.next()
}
 

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}