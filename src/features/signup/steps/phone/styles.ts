import styled from "styled-components";
import { tokens } from "../../../../styles/tokens";

export const FieldGroup = styled.div`
  display: grid;
  gap: 8px;
`;

export const FieldLabel = styled.span`
  color: ${tokens.muted};
  font-size: 15px;
`;

export const RequiredIndicator = styled.span`
  color: ${tokens.danger};
  margin-left: 2px;
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: stretch;
  gap: 12px;
`;

export const DropdownWrap = styled.div`
  position: relative;
`;

export const DropdownTrigger = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 61px;
  padding: 0 10px;
  border: 1px solid ${({ $open }) => ($open ? tokens.blue : tokens.line)};
  border-radius: 10px;
  background: #fff;
  outline: none;
  box-shadow: ${({ $open }) =>
    $open ? "0 0 0 3px rgba(0,87,255,0.1)" : "none"};
`;

export const Flag = styled.span`
  font-size: 20px;
  line-height: 1;
`;

export const Code = styled.span`
  flex: 1;
  color: ${tokens.secondary};
  font-size: 14px;
  text-align: left;
`;

export const Chevron = styled.span<{ $open: boolean }>`
  display: flex;
  color: ${tokens.muted};
  transition: transform 150ms ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const DropdownList = styled.ul`
  position: absolute;
  z-index: 10;
  top: calc(100% + 6px);
  left: 0;
  width: 200px;
  margin: 0;
  padding: 6px;
  list-style: none;
  border: 1px solid ${tokens.line};
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(19, 44, 74, 0.12);
`;

export const DropdownItem = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  color: ${tokens.primary};
  background: ${({ $active }) =>
    $active ? "rgba(0,87,255,0.07)" : "transparent"};
  cursor: pointer;
  font-size: 14px;

  span:last-child {
    margin-left: auto;
    color: ${tokens.muted};
  }

  &:hover {
    background: rgba(0, 87, 255, 0.05);
  }
`;

export const PhoneInput = styled.input`
  width: 100%;
  height: 61px;
  border: 1px solid ${tokens.line};
  border-radius: 10px;
  padding: 0 20px;
  color: ${tokens.primary};
  background: #fff;
  font: inherit;
  outline: none;

  &::placeholder {
    color: #d5dce6;
  }

  &:focus {
    border-color: ${tokens.blue};
    box-shadow: 0 0 0 3px rgba(0, 87, 255, 0.1);
  }

  &[aria-invalid="true"] {
    border-color: ${tokens.danger};
  }
`;

export const ErrorHint = styled.small`
  color: ${tokens.danger};
  font-size: 13px;
`;
