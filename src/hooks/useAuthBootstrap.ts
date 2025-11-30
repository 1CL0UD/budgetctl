import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useAuthStore, type User } from "@/state/auth";

export function useAuthBootstrap() {
  const setUser = useAuthStore((s) => s.setUser);

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiFetch<User>("/auth/me"),
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (user) => setUser(user),
    onError: (err) => {
      const message = (err as Error).message.toLowerCase();
      if (
        message === "unauthorized" ||
        message.includes("networkerror") ||
        message.includes("failed to fetch")
      ) {
        setUser(null);
      }
    },
  });
}
