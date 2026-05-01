export function Footer() {
	return (
		<div className="flex py-5 px-5 md:px-8 flex-col md:flex-row items-center gap-4 justify-between">
			<div className="font-mono text-xs text-gray-700">
				SYSTEM: ONLINE | MEM: 847MB | UPTIME: 14h 23m
			</div>
			<div className="font-mono text-xs text-gray-600 flex items-center gap-2">
				<span>Powered by</span>
				<a
					href="https://github.com/shamscorner"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#DE7356] hover:underline"
				>
					Shamscorner
				</a>
			</div>
		</div>
	);
}
