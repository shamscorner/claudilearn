import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGame } from "../-hooks/useGame";
import { Dialogue } from "./Dialogue";
import { Input } from "./Input";
import { Sidebar } from "./Sidebar";
import { Typewriter } from "./Typewriter";

export function Terminal() {
	const {
		state,
		currentLevel,
		command,
		setCommand,
		submitCommand,
		closeDialogue,
		isOutputVisible,
		isExecuting,
		errorMessage,
		outputHistory,
		reset,
	} = useGame();

	const [isTypingComplete, setIsTypingComplete] = useState(false);
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	const terminalContentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOutputVisible) {
			setIsTypingComplete(false);
		}
	}, [isOutputVisible, currentLevel?.command]);

	useEffect(() => {
		if (terminalContentRef.current) {
			terminalContentRef.current.scrollTo({
				top: terminalContentRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [outputHistory]);

	const [sidebarFiles] = useState([
		"/src",
		"  /api",
		"    orders.ts",
		"    payments.ts",
		"  /services",
		"    orderService.ts",
		"    paymentService.ts",
		"  /utils",
		"  /components",
	]);

	const renderOutput = (output: string | string[]) => {
		if (Array.isArray(output)) {
			return output.map((line, idx) => (
				<div
					key={idx}
					className="text-sm text-gray-300 font-mono whitespace-pre-wrap"
				>
					{line}
				</div>
			));
		}
		const lines = output.split("\n");
		return (
			<div className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
				{lines.map((line, idx) => (
					<div key={idx}>{line}</div>
				))}
			</div>
		);
	};

	return (
		<div className="flex h-screen bg-[#0d0d0d] text-gray-300 font-mono overflow-hidden">
			<div className="flex-1 flex flex-col">
				<div className="h-10 bg-[#1a1a1a] border-b border-[#333] flex items-center justify-between px-4">
					<div className="flex items-center gap-2">
						<button
							onClick={() => setIsMobileSidebarOpen(true)}
							className="md:hidden p-1 text-gray-500 hover:text-[#DE7356] transition-colors"
						>
							<Menu size={18} />
						</button>
						<Link
							to="/"
							className="text-xs text-gray-500 hover:text-[#DE7356] transition-colors"
						>
							Claude Code Terminal
						</Link>
					</div>
					<span className="text-xs text-[#DE7356] font-bold">
						{currentLevel?.phase} - {state.currentLevel}/87
					</span>
				</div>

				<div
					ref={terminalContentRef}
					className="flex-1 overflow-auto p-6 pb-24"
				>
					<div className="text-xs text-gray-500 mb-4 italic">
						{currentLevel?.scene?.description}
					</div>

					{outputHistory.map((item) => (
						<div key={item.level} className="mb-4">
							{renderOutput(item.output)}
						</div>
					))}

					{isOutputVisible && currentLevel?.output && (
						<div className="mb-4">
							{typeof currentLevel.output === "string" ? (
								<Typewriter
									text={currentLevel.output}
									speed={15}
									onComplete={() => setIsTypingComplete(true)}
									className="text-sm text-gray-300 font-mono"
								/>
							) : (
								renderOutput(currentLevel.output)
							)}
						</div>
					)}

					{currentLevel?.learningHook && isTypingComplete && (
						<div className="mt-6 p-4 bg-[#1a1a1a] border border-[#DE7356]/30 rounded-lg">
							<div className="flex items-center gap-2">
								<span className="text-[#DE7356] text-lg">💡</span>
								<span className="text-sm text-gray-200">
									{currentLevel.learningHook}
								</span>
							</div>
							{currentLevel.hint && (
								<div className="mt-3 pt-3 border-t border-[#333] text-sm text-[#DE7356]">
									Next: {currentLevel.hint}
								</div>
							)}
						</div>
					)}

					{errorMessage && (
						<div className="text-red-500 text-sm mb-4 font-mono bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
							{errorMessage}
						</div>
					)}
				</div>

				<div className="border-t border-[#333] bg-[#0d0d0d] p-4">
					{!isOutputVisible && (
						<div className="mb-4 p-4 bg-[#1a1a1a] border-2 border-[#DE7356] rounded-lg shadow-lg shadow-[#DE7356]/10">
							<div className="text-xs uppercase tracking-wider text-[#DE7356] font-bold mb-2">
								Command Instruction
							</div>
							<div className="text-lg font-bold text-white mb-2">
								Type:{" "}
								<span className="text-[#DE7356]">{currentLevel?.command}</span>
							</div>
							{currentLevel?.commandDescription && (
								<div className="text-sm text-gray-400 border-t border-[#333] pt-2 mt-2">
									{currentLevel.commandDescription}
								</div>
							)}
							{currentLevel?.commandExample && (
								<div className="text-xs text-gray-500 mt-2">
									Example: {currentLevel.commandExample}
								</div>
							)}
						</div>
					)}

					<Input
						value={command}
						onChange={setCommand}
						onSubmit={submitCommand}
						disabled={isExecuting}
						placeholder={`Type ${currentLevel?.command} and press Enter`}
					/>
				</div>
			</div>

			<div className="hidden md:block w-64 h-full">
				<Sidebar
					files={sidebarFiles}
					currentLevel={state.currentLevel}
					onReset={reset}
				/>
			</div>

			{isMobileSidebarOpen && (
				<div className="fixed inset-0 z-50 md:hidden">
					<button
						className="absolute inset-0 bg-black/80 cursor-default"
						onClick={() => setIsMobileSidebarOpen(false)}
						aria-label="Close menu"
					/>
					<div className="absolute right-0 top-0 bottom-0 w-72 bg-[#0a0a0a] border-l border-[#222]">
						<div className="flex items-center justify-between p-3 border-b border-[#222]">
							<span className="text-xs text-gray-500 font-semibold uppercase">
								Menu
							</span>
							<button
								onClick={() => setIsMobileSidebarOpen(false)}
								className="p-1 text-gray-500 hover:text-white transition-colors"
							>
								<X size={18} />
							</button>
						</div>
						<div className="flex-1 overflow-y-auto">
							<Sidebar
								files={sidebarFiles}
								currentLevel={state.currentLevel}
								onReset={() => {
									reset();
									setIsMobileSidebarOpen(false);
								}}
							/>
						</div>
					</div>
				</div>
			)}

			{state.isDialogueOpen && currentLevel?.dialogue && (
				<Dialogue lines={currentLevel.dialogue} onClose={closeDialogue} />
			)}
		</div>
	);
}
