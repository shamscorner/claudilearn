import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "./-components/Terminal";

export const Route = createFileRoute("/game-2/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Terminal />;
}
