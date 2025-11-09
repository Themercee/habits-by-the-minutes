# Project Overview

This is a desktop application for managing and timing habit loops. It is built with Tauri, React, TypeScript, and Vite. The application allows users to create, manage, and time "loops," which are sequences of activities. The data is stored in the browser's `localStorage`.

The frontend is built with React and TypeScript, using `react-router-dom` for routing and `@tanstack/react-query` for data fetching. The UI is built with `shadcn/ui` components.

The backend is a Tauri application, which provides the desktop container for the web application.

# Building and Running

## Development

To run the application in a web browser for development, use the following command:

```bash
bun run dev
```

To run the application with Tauri for development, use the following command:

```bash
bun run tauri dev
```

## Production

To build the application for production, use the following command:

```bash
bun run build
```

This will create a production-ready build of the web application in the `dist` directory.

To build the desktop application with Tauri, use the following command:

```bash
bun run tauri build
```

This will create a desktop application for your platform in the `src-tauri/target/release` directory.

# Development Conventions

## Code Style

The project uses ESLint for code linting. The configuration can be found in the `.eslintrc.cjs` file. The project also uses Prettier for code formatting, which is configured in the `.prettierrc` file.

## Testing

There are no testing frameworks configured in the project.

## Contribution Guidelines

There are no contribution guidelines specified in the project.

## Sound Feature

A sound notification feature has been implemented. The `SoundManager` class in `src/components/SoundManager.ts` handles playing sounds for activity completion and loop completion. Sound files are located in `public/sounds/`.
