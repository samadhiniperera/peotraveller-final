// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {
//   Outlet,
//   Link,
//   createRootRouteWithContext,
//   useRouter,
//   HeadContent,
//   Scripts,
// } from "@tanstack/react-router";

// import appCss from "../styles.css?url";

// function NotFoundComponent() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4">
//       <div className="max-w-md text-center">
//         <h1 className="text-7xl font-bold text-foreground">404</h1>
//         <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
//         <p className="mt-2 text-sm text-muted-foreground">
//           The page you're looking for doesn't exist or has been moved.
//         </p>
//         <div className="mt-6">
//           <Link
//             to="/"
//             className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//           >
//             Go home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
//   console.error(error);
//   const router = useRouter();

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4">
//       <div className="max-w-md text-center">
//         <h1 className="text-xl font-semibold tracking-tight text-foreground">
//           This page didn't load
//         </h1>
//         <p className="mt-2 text-sm text-muted-foreground">
//           Something went wrong on our end. You can try refreshing or head back home.
//         </p>
//         <div className="mt-6 flex flex-wrap justify-center gap-2">
//           <button
//             onClick={() => {
//               router.invalidate();
//               reset();
//             }}
//             className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//           >
//             Try again
//           </button>
//           <a
//             href="/"
//             className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
//           >
//             Go home
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
//   head: () => ({
//     meta: [
//       { charSet: "utf-8" },
//       { name: "viewport", content: "width=device-width, initial-scale=1" },
//       { title: "Lovable App" },
//       { name: "description", content: "Lovable Generated Project" },
//       { name: "author", content: "Lovable" },
//       { property: "og:title", content: "Lovable App" },
//       { property: "og:description", content: "Lovable Generated Project" },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary" },
//       { name: "twitter:site", content: "@Lovable" },
//     ],
//     links: [
//       {
//         rel: "stylesheet",
//         href: appCss,
//       },
//     ],
//   }),
//   shellComponent: RootShell,
//   component: RootComponent,
//   notFoundComponent: NotFoundComponent,
//   errorComponent: ErrorComponent,
// });

// function RootShell({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <HeadContent />
//       </head>
//       <body>
//         {children}
//         <Scripts />
//       </body>
//     </html>
//   );
// }

// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { AuthProvider } from "@/lib/auth";

// function RootComponent() {
//   const { queryClient } = Route.useRouteContext();

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <Header />
//         <main>
//           <Outlet />
//         </main>
//         <Footer />
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{ background: "oklch(0.560 0.110 155 / 0.10)" }}
        >
          <span
            className="text-4xl font-bold"
            style={{ fontFamily: "'Lora', serif", color: "oklch(0.560 0.110 155)" }}
          >
            404
          </span>
        </div>
        <h2
          className="text-2xl font-semibold"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Page not found
        </h2>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors"
          style={{ background: "oklch(0.560 0.110 155)" }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <h1
          className="text-xl font-semibold"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred. Try refreshing or go back home.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium text-primary-foreground"
            style={{ background: "oklch(0.560 0.110 155)" }}
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PeoTraveller — Explore smarter. Travel better." },
      { name: "description", content: "Discover places, build wishlists, plan trips and share memories with PeoTraveller." },
      { name: "author", content: "PeoTraveller" },
      { property: "og:title", content: "PeoTraveller" },
      { property: "og:description", content: "Explore smarter. Travel better." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}