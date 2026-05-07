import styled from "styled-components";
import { tokens } from "../../../../styles/tokens";

export const EyeButton = styled.button`
  position: absolute;
  top: 50%;
  right: 18px;
  display: grid;
  place-items: center;
  border: 0;
  color: ${tokens.muted};
  background: transparent;
  transform: translateY(-50%);
  transition: color 150ms;

  &:hover {
    color: ${tokens.blue};
  }

  &:focus-visible {
    outline: none;
    color: ${tokens.blue};
  }
`;
