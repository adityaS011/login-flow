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

The flow is structured as a self-contained feature module. UI components are kept "dumb" — they receive props and call callbacks. All wizard logic lives in one custom hook.

```
src/
  api/mockApi.ts              # Simulated async API (OTP send/verify, register)
  components/                 # Shared primitives: Button, TextField, Toast
  features/signup/
    components/               # ActionBar, WizardCard, StepRenderer, CompletionModal
    steps/                    # account-type, phone, otp, name, password
    SignupFlow.tsx             # Top-level layout: card + toast + completion modal
    signupReducer.ts          # Pure reducer — all state transitions in one place
    types.ts                  # SignupData, FieldErrors, StepId enum, steps array
    useSignupWizard.ts        # Custom hook: API calls, validation, loading, toast
    validation.ts             # Pure per-step validation functions (no dependencies)
  styles/                     # tokens.ts, GlobalStyle.ts, layout.ts, typography.ts
```

### State layer

All form data and navigation state is managed by a single `useReducer`. The reducer handles four actions — `Patch` (partial field update), `Next`, `Back`, `Complete`, and `Reset` — and nothing else. It is a pure function with no side effects.

`useSignupWizard` wraps the reducer and is the only place that calls `dispatch`. It also owns three pieces of local state that don't belong in the reducer: `isLoading` (transient async flag), `errors` (per-field validation result), and `toast` (notification message). The hook exposes a flat interface to `SignupFlow`:

```
step, data, progress, errors, isLoading, isFirstStep, isLastStep,
completed, summary, toast,
next, back, reset, update, resendOtp, dismissToast
```

### Data flow

```
User input → update(partial) → clears field error → dispatches Patch
Submit     → validateStep()  → setErrors or → API call → dispatches Next/Complete
```

Validation (`validation.ts`) is a pure function — it takes the current step and data, returns an error map, and has no imports from React. Errors are cleared field-by-field as the user types, so stale messages disappear immediately on correction.

### Component layer

`StepRenderer` reads `wizard.step` and renders the matching step component. Each step component receives only the slice of data and callbacks it needs — no wizard object is passed down whole. `ActionBar` owns the Back and Continue/Complete buttons; it only knows about `isLoading`, `isFirstStep`, and `nextLabel`.

`WizardCard` wraps the card shell and progress bar. `CardBody` inside it gets `key={wizard.step}`, which causes React to unmount and remount the content on every step change — this is what triggers the CSS entrance animation without any animation library.

## Key Decisions

**Form submission via `display: contents`** — The card content and footer are wrapped in a `styled.form` with `display: contents`. This keeps the card's flex layout intact while enabling native Enter-key submission on every step with no `onKeyDown` hacks.

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
- OTP boxes have `aria-label="OTP digit N"`; account type options use `role="radio"` / `aria-checked`
- Focus rings are always visible; `prefers-reduced-motion` is respected globally

