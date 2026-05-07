import styled from "styled-components";
import { tokens } from "./tokens";

export const Wrap = styled.div<{ $gap?: number }>`
  display: grid;
  gap: ${({ $gap = 16 }) => $gap}px;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.56);
`;

export const Modal = styled.section`
  display: grid;
  width: 384px;
  justify-items: center;
  border-radius: 12px;
  padding: 28px 20px;
  background: ${tokens.surface};
  outline: none;
`;
