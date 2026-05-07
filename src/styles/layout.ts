import styled, { keyframes } from "styled-components";
import { tokens, bp } from "./tokens";

const overlayIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const modalIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`;

export const Wrap = styled.div<{ $gap?: number }>`
  display: grid;
  gap: ${({ $gap = 16 }) => $gap}px;

  ${bp.mobile} {
    gap: ${({ $gap = 8 }) => $gap}px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.56);
  animation: ${overlayIn} 200ms ease;
`;

export const Modal = styled.section`
  display: grid;
  width: 384px;
  justify-items: center;
  border-radius: 12px;
  padding: 28px 20px;
  background: ${tokens.surface};
  outline: none;
  animation: ${modalIn} 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
`;
