# Orbit Login Flow

A React + TypeScript implementation of the authentication flow from the supplied Figma assignment.

## Links

- Live deployed URL: https://login-flow-phi.vercel.app
- GitHub repository: add your repository URL here after pushing the code
- Figma assignment: https://www.figma.com/design/TpCXUiVzOb2n2l0r7s9eoX/Untitled?node-id=0-1&t=XrNdJbb4GZdeHV77-1

## Stack

- React 19
- TypeScript
- Vite
- styled-components
- lucide-react icons

## Features

- Figma-derived white and blue signup wizard layout
- Multi-step account type, phone, OTP, name, and password flow
- Step validation with accessible field errors
- Hover, focus, active, loading, and success states
- Password visibility toggle
- Completion summary modal
- Real Figma artboard SVG on the left panel
- Small, focused files kept under 100 lines

## Architecture

The app is structured as a small production-style feature module rather than a single large component.

- `src/components` contains reusable primitives such as buttons, text fields, the card shell, and the page shell.
- `src/features/signup` contains the signup wizard, reducer, validation, types, and individual step components.
- `src/styles` contains global styles and design tokens.
- `src/assets/artboard.svg` contains the supplied Figma illustration used in the left panel.
- `src/main.tsx` mounts the React application.

## Design Notes

The direct Figma file route is blocked by CloudFront from this environment and no Figma MCP design extraction tool is available in the session. I used the supplied screenshots and artboard SVG as the visual reference, then matched the visible flow and states.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This project is ready for Vercel or Netlify. For Vercel:

```bash
npx vercel
```
