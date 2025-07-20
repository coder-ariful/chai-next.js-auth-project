import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // first get user location 
    const path = request.nextUrl.pathname;
    // then get token
    const token = request.cookies.get('token')?.value || "";


    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyEmail';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyEmail',
        '/profile'
    ]
}