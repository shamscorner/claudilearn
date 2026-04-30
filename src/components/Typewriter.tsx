import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
	text: string;
	speed?: number;
	onComplete?: () => void;
	className?: string;
}

export function Typewriter({
	text,
	speed = 20,
	onComplete,
	className,
}: TypewriterProps) {
	const [displayed, setDisplayed] = useState("");
	const [isComplete, setIsComplete] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		setDisplayed("");
		setIsComplete(false);

		let index = 0;
		const chars = text.split("");

		const typeChar = () => {
			if (index < chars.length) {
				setDisplayed((prev) => prev + chars[index]);
				index++;
				timeoutRef.current = setTimeout(typeChar, speed);
			} else {
				setIsComplete(true);
				onComplete?.();
			}
		};

		typeChar();

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [text, speed, onComplete]);

	const lines = displayed.split("\n");

	return (
		<div className={className}>
			{lines.map((line, idx) => (
				<div key={idx} className="whitespace-pre-wrap">
					{line}
					{idx === lines.length - 1 && !isComplete && (
						<span className="inline-block w-2 h-4 bg-[#DE7356] ml-0.5 animate-pulse" />
					)}
				</div>
			))}
		</div>
	);
}
