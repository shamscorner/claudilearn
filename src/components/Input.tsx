import { useEffect, useRef } from "react";

interface InputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	disabled?: boolean;
	placeholder?: string;
}

export function Input({
	value,
	onChange,
	onSubmit,
	disabled,
	placeholder,
}: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const isFirstMount = useRef(true);

	useEffect(() => {
		if (isFirstMount.current) {
			isFirstMount.current = false;
			if (inputRef.current) {
				inputRef.current.focus();
			}
		} else if (!disabled && inputRef.current) {
			inputRef.current.focus();
		}
	}, [disabled]);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !disabled) {
			onSubmit();
		}
	};

	return (
		<div className="flex items-center gap-2 mt-4">
			<span className="text-[#DE7356] font-mono text-lg">&gt;</span>
			<input
				ref={inputRef}
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={handleKeyDown}
				disabled={disabled}
				placeholder={placeholder || "Type a command..."}
				className="flex-1 bg-transparent border-none outline-none text-[#DE7356] font-mono text-lg placeholder:text-[#666] placeholder:font-bold placeholder:text-base caret-[#DE7356]"
				autoComplete="off"
				spellCheck={false}
			/>
		</div>
	);
}
