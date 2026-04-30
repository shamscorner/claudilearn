import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "ClaudiLearn - Terminal Zero → SaaS One",
			},
			{
				name: "description",
				content:
					"An interactive, story-driven terminal simulation for mastering Claude Code commands in a real-world SaaS startup scenario.",
			},
			{
				property: "og:title",
				content: "ClaudiLearn - Terminal Zero → SaaS One",
			},
			{
				property: "og:description",
				content:
					"An interactive, story-driven terminal simulation for mastering Claude Code commands in a real-world SaaS startup scenario.",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				name: "theme-color",
				content: "#1a1a2e",
			},
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "ClaudiLearn - Terminal Zero → SaaS One",
			},
			{
				name: "twitter:description",
				content:
					"An interactive, story-driven terminal simulation for mastering Claude Code commands in a real-world SaaS startup scenario.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "canonical",
				href: "https://claudilearn.example.com",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
