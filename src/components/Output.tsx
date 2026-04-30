import type { Level } from "../types/game";

interface OutputProps {
	output: Level["output"];
}

export function Output({ output }: OutputProps) {
	return (
		<div className="output">
			{Array.isArray(output) ? (
				output.map((line, idx) => (
					<div
						key={idx}
						className="text-[#DE7356] font-mono text-sm my-1 whitespace-pre-wrap"
					>
						{line}
					</div>
				))
			) : (
				<div className="text-[#DE7356] font-mono text-sm my-1 whitespace-pre-wrap">
					{output}
				</div>
			)}
		</div>
	);
}
