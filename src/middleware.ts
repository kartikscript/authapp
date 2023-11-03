import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

 
export function middleware(request: NextRequest) {

   const path=request.nextUrl.pathname;

   const isPublicPath=path==='/login' || path==='/signup' || path==='/verifyemail'
   const token = request.cookies.get('token')?.value || ""

   if(token && isPublicPath){// if a user has token (he is on profile ,etc) and trying to access publicPath by writing in url path ( /login) so then redirect him to the below coded page
          
       return NextResponse.redirect(new URL('/', request.nextUrl))
   }
   if(!token && !isPublicPath){// user has no token and trying to access profile (other than publicpaths)
    return NextResponse.redirect(new URL('/login', request.nextUrl))
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/signup',
    '/login',
    '/verifyemail'
  ]
}