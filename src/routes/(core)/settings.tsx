import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useAuthStore } from "@/state/auth";

export const Route = createFileRoute("/(core)/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (error) {
      // Best-effort logout; still clear local state
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      queryClient.removeQueries({ queryKey: ["auth"] });
      setIsLoggingOut(false);
      router.navigate({ to: "/login" });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how the application looks and feels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-muted-foreground">
                  Choose between light and dark theme
                </p>
              </div>
              <ModeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sign Out</h3>
                <p className="text-sm text-muted-foreground">
                  Sign out of your account and return to login
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                {isLoggingOut ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
