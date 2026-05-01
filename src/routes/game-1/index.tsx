import { createFileRoute, Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "./-components/sidebar";
import { Terminal } from "./-components/terminal";
import { useGameState } from "./-hooks/use-game-state";
import game2Css from "./styles.css?url";

export const Route = createFileRoute("/game-1/")({
	component: RouteComponent,
	head: () => ({
		links: [{ rel: "stylesheet", href: game2Css }],
	}),
});

function RouteComponent() {
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const {
		currentLevel,
		history,
		handleCommand,
		resetGame,
		isTyping,
		isSuccess,
		filesVisible,
		currentLevelIndex,
		totalLevels,
	} = useGameState();

	const progress = (currentLevelIndex / totalLevels) * 100;

	useEffect(() => {
		if (isMobileSidebarOpen) {
			setTimeout(() => {
				closeButtonRef.current?.focus();
			}, 100);
		}
	}, [isMobileSidebarOpen]);

	return (
		<div className="flex h-dvh w-full bg-[#0d0d0d] overflow-hidden text-terminal-text selection:bg-terminal-accent/30 selection:text-white">
			{/* Background Ambience */}
			<div className="fixed inset-0 opacity-[0.03] pointer-events-none">
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
			</div>

			<div className="hidden md:block">
				<Sidebar
					visible={filesVisible}
					activePhase={currentLevel.phase}
					phaseColor={currentLevel.phaseColor}
					progress={progress}
					onReset={resetGame}
				/>
			</div>

			<main className="flex-1 flex flex-col px-2 pb-2 sm:px-6 sm:py-6 min-h-0 relative">
				<div className="flex items-center justify-between md:hidden md:mb-4">
					<Link
						to="/"
						className="text-xs text-terminal-accent font-bold uppercase tracking-widest"
					>
						CLAUDE CODE
					</Link>
					<button
						onClick={() => setIsMobileSidebarOpen(true)}
						className="p-2 text-terminal-text hover:text-terminal-accent transition-colors"
					>
						<Menu size={20} />
					</button>
				</div>

				<div className="flex-1 min-h-0 relative z-0">
					<Terminal
						history={history}
						onCommand={handleCommand}
						isTyping={isTyping}
						isSuccess={isSuccess}
						learningHook={currentLevel.learningHook}
						currentLevelTitle={currentLevel.title}
						phaseColor={currentLevel.phaseColor}
						commandInfo={{
							description: currentLevel.commandDescription,
							example: currentLevel.commandExample,
						}}
					/>
				</div>

				{/* Ambient Overlay for Scenes */}
				<AnimatePresence>
					{currentLevel.scene.visualEffect === "glitch" && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 bg-red-500 pointer-events-none mix-blend-overlay animate-pulse"
						/>
					)}
				</AnimatePresence>
			</main>

			{isMobileSidebarOpen && (
				<div className="fixed inset-0 z-50 md:hidden">
					<button
						className="absolute inset-0 bg-black/80 cursor-default"
						onClick={() => setIsMobileSidebarOpen(false)}
						aria-label="Close menu"
					/>
					<div className="absolute right-0 top-0 bottom-0 w-80 bg-[#111] border-l border-terminal-border/10">
						<div className="flex items-center justify-between p-4 border-b border-white/5">
							<span className="text-xs text-terminal-dim font-semibold uppercase">
								Menu
							</span>
							<button
								ref={closeButtonRef}
								onClick={() => setIsMobileSidebarOpen(false)}
								className="p-1 text-terminal-text hover:text-terminal-accent transition-colors"
							>
								<X size={18} />
							</button>
						</div>
						<div className="flex-1 overflow-y-auto">
							<Sidebar
								visible={filesVisible}
								activePhase={currentLevel.phase}
								phaseColor={currentLevel.phaseColor}
								progress={progress}
								onReset={() => {
									resetGame();
									setIsMobileSidebarOpen(false);
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
