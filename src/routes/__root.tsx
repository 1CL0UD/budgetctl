import { ThemeProvider } from "@/components/theme-provider";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootError,
  notFoundComponent: NotFound,
});

function RootComponent() {
  useAuthBootstrap();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </ThemeProvider>
  );
}

function RootError({ error }: { error: Error }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-2xl font-semibold">Something went wrong</div>
      <p className="text-muted-foreground max-w-md">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
      >
        Go home
      </Link>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-2xl font-semibold">Page not found</div>
      <p className="text-muted-foreground max-w-md">
        The page you’re looking for doesn’t exist. Check the URL or return home.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
