# Claudify Learn

A Claude Code simulation game to learn all Claude Code commands through interactive, story-driven terminal scenarios.

## Prerequisites

- [Bun](https://bun.sh/) (required for package management and running scripts)
- Node.js 18+ (for local development if not using Bun)

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun --bun run dev
```

The app will be available at `http://localhost:3000`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun --bun run dev` | Start development server |
| `bun --bun run build` | Build for production |
| `bun --bun run preview` | Preview production build |
| `bun --bun run format` | Format code with Biome |
| `bun --bun run lint` | Lint code with Biome |
| `bun --bun run check` | Run lint + format checks |

## Tech Stack

- **Framework:** TanStack Start + TanStack Router
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest
- **Linting/Formatting:** Biome

## Project Structure

```
src/
├── routes/           # File-based routing (TanStack Router)
│   ├── __root.tsx    # Root layout
│   └── *.tsx         # Route files
├── components/       # Reusable React components
├── lib/              # Utility functions and helpers
├── styles.css        # Global styles (Tailwind)
└── app.tsx           # App entry point
```

## Contributing

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `bun install`
5. Start the dev server: `bun --bun run dev`

### Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

- Run `bun --bun run check` before committing to catch style/type issues
- The project follows Biome's default rules

### Adding Routes

Routes are file-based. Add a new file in `src/routes/`:

```tsx
// src/routes/my-route.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/my-route')({
  component: MyRouteComponent,
})

function MyRouteComponent() {
  return <div>Hello from my route!</div>
}
```

### Adding Components

Place reusable components in `src/components/`. Use the existing components as reference for naming conventions and patterns.

### Testing

Run tests with:

```bash
bun --bun run test
```

## Learn More

- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Biome](https://biomejs.dev/)

## License

MIT License - see [LICENSE](LICENSE) for details.
