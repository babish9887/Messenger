import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
 
// This function can be marked `async` if using `await` inside
export default withAuth({
    pages: {
      signIn: '/'
    }
})
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/users/:path*','/conversations/:path*','/resetpassword/:path*'],
}