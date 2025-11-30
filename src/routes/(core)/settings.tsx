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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="uppercase tracking-wide">
                Appearance
              </Badge>
              <span className="text-xs text-muted-foreground">
                Theme & display
              </span>
            </div>
            <CardTitle className="text-xl">Theme</CardTitle>
            <CardDescription>
              Choose between light and dark theme to match your workspace.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-muted-foreground">
                  Light, dark, or sync with your system preference.
                </p>
              </div>
              <ModeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="border-border/60 bg-card/80 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="uppercase tracking-wide">
                Account
              </Badge>
              <span className="text-xs text-muted-foreground">
                Access & sessions
              </span>
            </div>
            <CardTitle className="text-xl">Sign Out</CardTitle>
            <CardDescription>
              Sign out of your account and return to the login screen.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Session</h3>
                <p className="text-sm text-muted-foreground">
                  Clear your session and re-authenticate when you’re ready.
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
