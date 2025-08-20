import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/',
  '/products/details(.*)',
  '/products',
  '/merchant',
  '/contact'
]);

// Allowed Clerk User IDs
const allowedUserIds = [
  "user_2oIw8rOzdYiDi6PxVyXKr5a9kqQ", // example
  "user_2nRtLnULAojOqhNW6i0ix51tIec"
];

export default clerkMiddleware((auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) return;

  const { userId } = auth();

  // Not signed in → block
  if (!userId) {
    auth().protect(); // don't return it
    return;
  }

  // Signed in but not allowed → block
  if (!allowedUserIds.includes(userId)) {
    return new Response("Page not Found", { status: 404 });
  }

  // Otherwise, allow
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
