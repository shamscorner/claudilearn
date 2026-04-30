import { levels } from "../data/levels";

interface SidebarProps {
	files?: string[];
	logs?: string[];
	currentLevel?: number;
	onReset?: () => void;
}

export function Sidebar({ files, logs, currentLevel, onReset }: SidebarProps) {
	const totalLevels = levels.length;
	const progress = currentLevel
		? Math.round(((currentLevel - 1) / totalLevels) * 100)
		: 0;

	return (
		<div className="w-64 h-full bg-[#0a0a0a] border-l border-[#222] flex flex-col">
			<div className="p-3 border-b border-[#222]">
				<h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
					Progress
				</h3>
				<div className="mt-2">
					<div className="flex justify-between text-xs text-gray-400 mb-1">
						<span>
							Level {currentLevel || 1} / {totalLevels}
						</span>
						<span>{progress}%</span>
					</div>
					<div className="w-full bg-[#1a1a1a] rounded-full h-2">
						<div
							className="bg-[#DE7356] h-2 rounded-full transition-all duration-300"
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>
				{onReset && (
					<button
						onClick={onReset}
						className="mt-3 w-full py-2 px-3 text-xs text-red-400 border border-red-900 rounded hover:bg-red-900/20 transition-colors"
					>
						Start Over
					</button>
				)}
			</div>

			<div className="p-3 border-b border-[#222]">
				<h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
					Files
				</h3>
			</div>
			<div className="flex-1 overflow-auto p-2">
				{files && files.length > 0 ? (
					<div className="space-y-1">
						{files.map((file, idx) => (
							<div
								key={idx}
								className="text-xs text-gray-400 hover:text-[#DE7356] cursor-pointer py-1 px-2 hover:bg-[#151515] rounded"
							>
								{file}
							</div>
						))}
					</div>
				) : (
					<div className="text-xs text-gray-600 italic p-2">
						No files loaded
					</div>
				)}
			</div>

			<div className="p-3 border-t border-[#222]">
				<h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
					Logs
				</h3>
			</div>
			<div className="flex-1 overflow-auto p-2">
				{logs && logs.length > 0 ? (
					<div className="space-y-1">
						{logs.map((log, idx) => (
							<div key={idx} className="text-xs text-gray-500 py-1">
								{log}
							</div>
						))}
					</div>
				) : (
					<div className="text-xs text-gray-600 italic p-2">No logs</div>
				)}
			</div>
		</div>
	);
}
