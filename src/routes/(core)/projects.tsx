import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(core)/projects")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(core)/projects"!</div>;
}
