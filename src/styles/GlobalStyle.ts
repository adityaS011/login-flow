import { createGlobalStyle } from "styled-components";
import { tokens } from "./tokens";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    color: ${tokens.primary};
    background: ${tokens.default};
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
    background: ${tokens.default};
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  dl,
  dd,
  blockquote,
  figure {
    margin: 0;
  }

  button,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  :focus-visible {
    outline: 2px solid ${tokens.blue};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
