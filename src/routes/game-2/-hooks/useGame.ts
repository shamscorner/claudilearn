import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { GameAction, GameState, Level } from "../../../types/game";
import { initialGameState } from "../../../types/game";
import { levels } from "../-data/levels";

const STORAGE_KEY = "claudify-learn-game-state";

function loadInitialState(): GameState {
	if (typeof window === "undefined") return initialGameState;
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved) {
		try {
			const parsed = JSON.parse(saved);
			return { ...initialGameState, ...parsed };
		} catch {
			return initialGameState;
		}
	}
	return initialGameState;
}

function saveState(state: GameState) {
	if (typeof window === "undefined") return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function gameReducer(state: GameState, action: GameAction): GameState {
	switch (action.type) {
		case "SUBMIT_COMMAND":
			return state;
		case "NEXT_LEVEL": {
			const nextLevel = state.currentLevel + 1;
			if (nextLevel > levels.length) {
				return { ...state, isComplete: true };
			}
			return {
				...state,
				currentLevel: nextLevel,
				history: [...state.history, levels[state.currentLevel - 1].command],
			};
		}
		case "TOGGLE_DIALOGUE":
			return { ...state, isDialogueOpen: !state.isDialogueOpen };
		case "RESET":
			return initialGameState;
		default:
			return state;
	}
}

function validateCommand(input: string, expected: string | undefined): boolean {
	if (!expected) return false;
	if (input === expected) return true;

	if (expected.includes("<")) {
		const baseCmd = expected.split(" ")[0];
		if (input.startsWith(`${baseCmd} `)) return true;
	}

	if (
		expected.includes("-p") ||
		expected.includes("-c") ||
		expected.includes("-r")
	) {
		const baseCmd = expected.split(" ")[0];
		if (input.startsWith(`${baseCmd} `)) return true;
	}

	return false;
}

export function useGame() {
	const [state, dispatch] = useReducer(gameReducer, null, loadInitialState);

	useEffect(() => {
		saveState(state);
	}, [state]);

	const [command, setCommand] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isOutputVisible, setIsOutputVisible] = useState(false);
	const [isExecuting, setIsExecuting] = useState(false);
	const [outputHistory, setOutputHistory] = useState<
		Array<{ level: number; output: Level["output"] }>
	>([]);

	const currentLevel: Level | undefined = levels[state.currentLevel - 1];
	const currentLevelRef = useRef(currentLevel);
	currentLevelRef.current = currentLevel;

	const clearCommand = useCallback(() => {
		setCommand("");
	}, []);

	const submitCommand = useCallback(() => {
		if (!command.trim() || isExecuting) return;

		const expected = currentLevel?.command;
		const userInput = command.trim();

		const isValid = validateCommand(userInput, expected);
		if (!isValid) {
			setErrorMessage(`Unknown command: ${userInput}. Expected: ${expected}`);
			return;
		}

		setErrorMessage("");
		setIsOutputVisible(true);
		setCommand("");
		setIsExecuting(true);

		setTimeout(() => {
			const levelToStore = currentLevelRef.current;
			setOutputHistory((prev) => [
				...prev,
				{ level: state.currentLevel, output: levelToStore?.output || "" },
			]);
			setIsExecuting(false);
			setIsOutputVisible(false);
			dispatch({ type: "NEXT_LEVEL" });
			dispatch({ type: "TOGGLE_DIALOGUE" });
		}, 2000);
	}, [command, isExecuting, state.currentLevel, currentLevel?.command]);

	const closeDialogue = useCallback(() => {
		dispatch({ type: "TOGGLE_DIALOGUE" });
	}, []);

	const reset = useCallback(() => {
		dispatch({ type: "RESET" });
		setCommand("");
		setErrorMessage("");
		setIsOutputVisible(false);
		setOutputHistory([]);
	}, []);

	return {
		state,
		currentLevel,
		command,
		setCommand,
		submitCommand,
		closeDialogue,
		isOutputVisible,
		isExecuting,
		errorMessage,
		reset,
		clearCommand,
		outputHistory,
	};
}
