import { ButtonHTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";
import { bp, tokens } from "../styles/tokens";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export const Button = ({
  variant = "primary",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => (
  <StyledButton
    $variant={variant}
    $loading={isLoading}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading ? <Spinner /> : children}
  </StyledButton>
);

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.65s linear infinite;
`;

const StyledButton = styled.button<{
  $variant: "primary" | "secondary";
  $loading: boolean;
}>`
  display: inline-flex;
  height: 40px;
  width: 250px;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ $variant }) => ($variant === "primary" ? tokens.blue : "#d7e0e8")};
  border-radius: 999px;
  color: ${({ $variant }) =>
    $variant === "primary" ? tokens.surface : tokens.blue};
  background: ${({ $variant }) =>
    $variant === "primary" ? tokens.blue : tokens.surface};
  font-size: 12px;
  font-weight: 800;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;

  &:hover:not(:disabled) {
    background: ${({ $variant }) =>
      $variant === "primary" ? tokens.blueDark : "#f8fbff"};
    box-shadow: ${({ $variant }) =>
      $variant === "primary" ? "0 12px 22px rgba(0, 87, 255, .2)" : "none"};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 87, 255, 0.3);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  ${bp.mobile} {
    width: auto;
    flex: 1;
    height: 48px;
  }
`;
