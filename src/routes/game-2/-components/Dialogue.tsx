import type { DialogueEntry, DialogueEntryType } from "../../../types/game";

interface DialogueProps {
	lines: DialogueEntry[];
	onClose?: () => void;
}

const typeStyles: Record<DialogueEntryType, string> = {
	narrative: "text-gray-200",
	urgent: "text-red-400",
	internal: "text-gray-400 italic",
	slack: "text-green-400",
};

export function Dialogue({ lines, onClose }: DialogueProps) {
	return (
		<div className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-50 pt-4">
			<div className="w-full max-w-2xl mx-4 pointer-events-auto">
				<div className="bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl overflow-hidden">
					<div className="p-3 space-y-2">
						{lines.map((line, idx) => (
							<div
								key={idx}
								className={typeStyles[line.type] || typeStyles.narrative}
							>
								<span className="text-xs uppercase tracking-wider text-[#666] font-semibold">
									{line.speaker}
								</span>
								<p className="mt-0.5 text-sm">{line.text}</p>
							</div>
						))}
					</div>
					{onClose && (
						<button
							onClick={onClose}
							className="w-full py-2 bg-[#252525] hover:bg-[#2a2a2a] text-gray-400 text-xs uppercase tracking-wider border-t border-[#333]"
						>
							Continue
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
