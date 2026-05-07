import { Check } from "lucide-react";
import styled from "styled-components";
import { tokens } from "../../../../styles/tokens";

export const Title = styled.h2`
  margin: 0;
  color: ${tokens.primary};
  font-size: 20px;
  font-weight: 500;
  line-height: 1.35;

  strong {
    font-weight: 800;
  }
`;

export const Options = styled.div`
  display: grid;
  gap: 14px;
`;

export const Option = styled.button<{ $selected: boolean }>`
  display: grid;
  height: 62px;
  grid-template-columns: 22px 1fr 22px;
  align-items: center;
  gap: 12px;
  border: 1px solid ${({ $selected }) => ($selected ? tokens.blue : "#d9e2ea")};
  border-radius: 12px;
  padding: 0 22px;
  color: ${({ $selected }) => ($selected ? tokens.blue : tokens.primary)};
  background: ${({ $selected }) => ($selected ? "rgba(0,87,255,0.03)" : "#fff")};
  box-shadow: ${tokens.shadow};
  font-size: 14px;
  font-weight: 800;
  text-align: left;
  transition: border-color 150ms, background 150ms, color 150ms;

  &:hover:not([aria-checked="true"]) {
    border-color: #a0bfff;
    background: #fafbff;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 87, 255, 0.2);
  }
`;

export const CheckIcon = styled(Check)`
  padding: 3px;
  border-radius: 50%;
  color: #fff;
  background: ${tokens.blue};
`;
