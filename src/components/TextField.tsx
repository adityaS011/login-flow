import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { tokens, bp } from "../styles/tokens";

const hintIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helper?: string;
  label: string;
  action?: ReactNode;
}

export const TextField = ({
  error,
  helper,
  label,
  action,
  ...props
}: TextFieldProps) => {
  const hintId = useId();
  const hint = error || helper;

  return (
    <Field>
      <Label>{label}</Label>
      <InputField>
        <Input
          aria-invalid={Boolean(error)}
          aria-describedby={hint ? hintId : undefined}
          {...props}
        />
        {action}
      </InputField>
      {hint && (
        <Hint id={hintId} role={error ? "alert" : undefined} $error={Boolean(error)}>
          {hint}
        </Hint>
      )}
    </Field>
  );
};

const Field = styled.label`
  display: grid;
  gap: 8px;
`;

const Label = styled.span`
  color: ${tokens.muted};
  font-size: 18px;
`;

const InputField = styled.span`
  position: relative;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  height: 61px;
  border: 1px solid ${tokens.line};
  border-radius: 10px;
  padding: 0 20px;
  color: ${tokens.primary};
  background: #fff;
  outline: none;
  font-size: 16px;
  transition: border-color 150ms, box-shadow 150ms;
  
  &::placeholder {
    color: #d5dce6;
  }

  &:hover {
    border-color: #6b9fff;
  }

  &:focus {
    border-color: ${tokens.blue};
    box-shadow: 0 0 0 3px rgba(0, 87, 255, 0.1);
  }

  &[aria-invalid="true"] {
    border-color: ${tokens.danger};
    box-shadow: none;

    &:focus {
      box-shadow: 0 0 0 3px rgba(220, 61, 42, 0.12);
    }
  }
`;

const Hint = styled.small<{ $error: boolean }>`
  color: ${({ $error }) => ($error ? tokens.danger : tokens.muted)};
  font-size: 16px;
  animation: ${hintIn} 180ms ease;
`;
