import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
	return (
		<div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
			<div className="absolute inset-0 opacity-20">
				<div className="absolute top-20 left-10 w-2 h-2 bg-[#DE7356] rounded-full animate-pulse" />
				<div className="absolute top-40 right-20 w-1 h-1 bg-[#DE7356] rounded-full animate-pulse" />
				<div className="absolute bottom-40 left-1/4 w-2 h-2 bg-[#DE7356] rounded-full animate-pulse" />
				<div className="absolute top-1/2 right-1/3 w-1 h-1 bg-[#DE7356] rounded-full animate-pulse" />
			</div>

			<div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(222,115,86,0.03)_50%)] bg-[length:100%_4px]" />

			<div className="min-h-screen flex items-center justify-center p-8 relative z-10">
				<div className="flex flex-col items-center gap-16">
					<div className="text-center">
						<div className="mb-4 text-[#DE7356] text-sm font-mono tracking-[0.3em]">
							_/root/terminal_
						</div>
						<h1 className="text-7xl font-bold text-white tracking-tight">
							Claude<span className="text-[#DE7356]">Learn</span>
						</h1>
						<div className="mt-4 h-px w-48 bg-gradient-to-r from-transparent via-[#DE7356] to-transparent mx-auto" />
						<p className="mt-6 text-gray-400 text-lg font-mono">
							Master CLI commands through interactive gameplay
						</p>
					</div>

					<div className="flex flex-col gap-4 w-80">
						<span className="group relative px-8 py-5 text-xl font-bold text-gray-500 border-2 border-gray-800 rounded overflow-hidden cursor-not-allowed opacity-50">
							<span className="relative z-10 flex items-center justify-between">
								<span className="font-mono">▲ COMING SOON</span>
								<span className="opacity-50 text-sm">v2.0</span>
							</span>
						</span>
						<a
							href="/game"
							className="group relative px-8 py-5 text-xl font-bold text-[#DE7356] border-2 border-[#DE7356] rounded overflow-hidden transition-all duration-300 hover:bg-[#DE7356] hover:text-black"
						>
							<span className="absolute inset-0 bg-[#DE7356]/10 animate-pulse opacity-0 group-hover:opacity-100" />
							<span className="relative z-10 flex items-center justify-between font-mono">
								<span>▶ PLAY NOW</span>
								<span className="text-sm">v1.0</span>
							</span>
						</a>
					</div>

					<div className="mt-8 font-mono text-xs text-gray-600">
						<span className="text-[#DE7356]">▸</span> Select option to begin_
						<span className="animate-pulse">█</span>
					</div>
				</div>
			</div>

			<div className="absolute bottom-4 left-4 font-mono text-xs text-gray-700">
				SYSTEM: ONLINE | MEM: 847MB | UPTIME: 14h 23m
			</div>
		</div>
	);
}
