import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')

    if (!token) {
        console.log("No token found, redirecting to login...");
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

// กำหนดว่าจะใช้ middleware กับ route ไหนบ้าง
export const config = {
    matcher: [
        '/profile',
        '/edit_profile',
        '/createpost/:path*'  
    ]
}   