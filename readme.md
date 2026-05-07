# Orbit Login Flow

A React + TypeScript multi-step signup wizard built from the supplied Figma assignment.

**Live:** https://login-flow-phi.vercel.app
**Figma:** https://www.figma.com/design/TpCXUiVzOb2n2l0r7s9eoX/Untitled?node-id=0-1&t=XrNdJbb4GZdeHV77-1

## Stack

React 19 · TypeScript · Vite · styled-components v6 · lucide-react

## Getting Started

```bash
npm install
npm run dev
```

---

## Architecture

State lives in a single `useReducer` (`signupReducer.ts`). The `useSignupWizard` hook wraps it, owns all async logic, and exposes a clean interface — components never call `dispatch` directly. This keeps each file small and concerns clearly separated.

```
src/
  api/mockApi.ts              # Simulated async API (OTP send/verify, register)
  components/                 # Shared primitives: Button, TextField, Toast
  features/signup/
    components/               # ActionBar, WizardCard, StepRenderer, CompletionModal
    steps/                    # account-type, phone, otp, name, password
    SignupFlow.tsx             # Top-level layout
    signupReducer.ts          # All state transitions in one place
    useSignupWizard.ts        # Async logic, loading, toast, navigation
    validation.ts             # Pure per-step validation functions
  styles/                     # tokens.ts, GlobalStyle.ts, layout.ts, typography.ts
```

## Key Decisions

**Form submission via `display: contents`** — The card content and footer are wrapped in a `<form style="display:contents">`. This keeps the card's flex layout intact while enabling native Enter-key submission on every step with no `onKeyDown` hacks.

**Step transitions via `key`** — `CardBody` gets `key={wizard.step}`. React remounts it on each step change, which re-triggers the CSS entrance animation automatically — no animation library needed.

**Mock API** — `src/api/mockApi.ts` has three promise-based calls: `sendOtp` (900 ms), `verifyOtp` (700 ms), `register` (1 400 ms). `useSignupWizard` awaits the right one per step, toggling `isLoading` around each call. This drives the button spinner and the OTP resend disabled state.

**Toast** — `Toast.tsx` auto-dismisses after 3 s. It uses a `useRef` to hold the latest `onDismiss` so the timer never re-registers on re-renders. The hook uses `useCallback` for a stable `dismissToast` reference.

**Design tokens** — All colours, shadows, and breakpoints are defined once in `tokens.ts`. No values are hard-coded in component files.

## Animations

Pure CSS keyframes via styled-components — no external library. All animations respect `prefers-reduced-motion` via a global override in `GlobalStyle.ts`.

- **Wizard card** — fade + slide up on page load (360 ms)
- **Step content** — fade + slide up on each step change (220 ms)
- **Completion modal** — overlay fades (200 ms), panel springs in (240 ms, spring curve)
- **TextField hint** — slides down when an error appears (180 ms)
- **Account type check icon** — spring pop on select (200 ms, spring curve)

## Accessibility

- All inputs have associated labels; errors use `role="alert"` and `aria-invalid`
- `aria-describedby` links inputs to their hint text
- OTP boxes have `aria-label="Digit N of 6"`; account type options use `role="radio"` / `aria-checked`
- Focus rings are always visible; `prefers-reduced-motion` is respected globally

