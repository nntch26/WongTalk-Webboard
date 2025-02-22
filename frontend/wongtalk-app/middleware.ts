import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')

    if (!token) {
        console.log("No token found, redirecting to login...");
        const callbackUrl = encodeURIComponent(request.nextUrl.pathname); //ดึง path ปัจจุบันเพื่อเก็บเป็น callbackUrl และ encode เพื่อป้องกันตัวอีกษรพิเศษ
        return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
    }

    return NextResponse.next()
}

// กำหนดว่าจะใช้ middleware กับ route ไหนบ้าง
export const config = {
    matcher: [
        '/profile',
        '/createpost/:path*'  
    ]
}   