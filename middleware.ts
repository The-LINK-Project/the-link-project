import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define routes that should be publicly accessible (not protected)
const isPublicRoute = createRouteMatcher([
    '/sign-in',
    '/sign-in(.*)',
    '/sign-up',
    '/sign-up(.*)',
    '/', // if your homepage is public
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        const { userId } = await auth();
        if (!userId) {
            const signInUrl = new URL('/sign-in', req.url);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Run middleware for everything except static files and Next internals
        '/((?!_next|[^?]*\\.(?:js|css|jpg|jpeg|png|svg|ico|webp|ttf|woff2?|json|csv|html)).*)',
        // Also run for API routes
        '/api/(.*)',
    ],
};
