import styled from "styled-components";
import { tokens, bp } from "../../../../styles/tokens";

export const Copy = styled.p`
  color: ${tokens.muted};
  font-size: 12px;
`;

export const OtpRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px;
  max-width: 360px;

  ${bp.mobile} {
    gap: 20px;
  }
`;

export const OtpContainer = styled.div`
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;

  ${bp.mobile} {
    gap: 8px;
  }
`;

export const OtpInput = styled.input<{ $filled: boolean; $error: boolean }>`
  width: 70px;
  height: 70px;
  border: 1.5px solid
    ${({ $error, $filled }) =>
      $error ? tokens.danger : $filled ? tokens.blue : tokens.line};
  border-radius: 14px;
  color: ${tokens.primary};
  background: ${({ $filled }) => ($filled ? "rgba(0,87,255,0.04)" : "#fff")};
  caret-color: ${tokens.blue};
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  outline: none;
  transition: border-color 150ms, box-shadow 150ms;

  &:focus {
    border-color: ${({ $error }) => ($error ? tokens.danger : tokens.blue)};
    box-shadow: 0 0 0 3px
      ${({ $error }) =>
        $error ? "rgba(220,61,42,0.12)" : "rgba(0,87,255,0.1)"};
  }
`;

export const Message = styled.p<{ $error: boolean }>`
  color: ${({ $error }) => ($error ? tokens.danger : tokens.primary)};
  font-size: 14px;

  button {
    border: 0;
    color: ${tokens.blue};
    background: transparent;
    font-weight: 800;

    &:focus-visible {
      outline: 2px solid ${tokens.blue};
      outline-offset: 2px;
      border-radius: 4px;
    }
  }
`;
