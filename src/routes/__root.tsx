import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Notfound } from "#/components/not-found";
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
				title: "claudeilearn - Terminal Zero → SaaS One",
			},
			{
				name: "description",
				content:
					"An interactive, story-driven terminal simulation for mastering Claude Code commands in a real-world SaaS startup scenario.",
			},
			{
				property: "og:title",
				content: "claudeilearn - Terminal Zero → SaaS One",
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
				content: "claudeilearn - Terminal Zero → SaaS One",
			},
			{
				name: "twitter:description",
				content:
					"An interactive, story-driven terminal simulation for mastering Claude Code commands in a real-world SaaS startup scenario.",
			},
			{
				property: "og:image",
				content: "https://claudeilearn.shamscorner.com/opengraph.jpeg",
			},
			{
				name: "twitter:image",
				content: "https://claudeilearn.shamscorner.com/opengraph.jpeg",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "canonical",
				href: "https://claudeilearn.shamscorner.com",
			},
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				href: "/android-chrome-192x192.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "512x512",
				href: "/android-chrome-512x512.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: Notfound,
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
