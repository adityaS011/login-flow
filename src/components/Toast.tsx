import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { tokens } from "../styles/tokens";

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export const Toast = ({ message, onDismiss }: ToastProps) => {
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  useEffect(() => {
    const timer = setTimeout(() => dismissRef.current(), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return <Wrap role="status">{message}</Wrap>;
};

const fadeSlide = keyframes`
  0%   { opacity: 0; transform: translate(-50%, -6px); }
  12%  { opacity: 1; transform: translate(-50%, 0); }
  80%  { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -6px); }
`;

const Wrap = styled.div`
  position: fixed;
  top: 24px;
  left: 50%;
  z-index: 200;
  padding: 10px 22px;
  border-radius: 999px;
  background: ${tokens.primary};
  color: ${tokens.surface};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(19, 44, 74, 0.18);
  animation: ${fadeSlide} 3s ease forwards;
  pointer-events: none;
`;
