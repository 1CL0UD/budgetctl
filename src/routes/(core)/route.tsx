import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { apiFetch } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore, type User } from "@/state/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(core)")({
  beforeLoad: async () => {
    const cachedUser = queryClient.getQueryData<User>(["auth", "me"]);
    if (cachedUser) return;

    try {
      const fetchedUser = await queryClient.fetchQuery({
        queryKey: ["auth", "me"],
        queryFn: () => apiFetch<User>("/auth/me"),
        retry: false,
      });
      useAuthStore.getState().setUser(fetchedUser);
    } catch (err) {
      const message = (err as Error).message.toLowerCase();
      if (
        message === "unauthorized" ||
        message.includes("networkerror") ||
        message.includes("failed to fetch")
      ) {
        throw redirect({ to: "/login" });
      }
      throw err;
    }
  },
  component: CoreLayout,
});

function CoreLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
