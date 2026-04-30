import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "../components/Terminal";

export const Route = createFileRoute("/game")({ component: Game });

function Game() {
	return <Terminal />;
}
