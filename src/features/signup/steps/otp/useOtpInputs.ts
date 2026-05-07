import { ClipboardEvent, KeyboardEvent, useRef } from "react";

interface OtpInputConfig {
  length: number;
  onChange: (value: string[]) => void;
  value: string[];
}

export const useOtpInputs = ({ length, onChange, value }: OtpInputConfig) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focus = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...value];
      const target = value[index] || index === 0 ? index : index - 1;
      next[target] = "";
      onChange(next);
      focus(target);
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focus(index - 1);
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      focus(index + 1);
    }
  };

  const applyDigits = (index: number, digits: string) => {
    const next = [...value];
    let lastFilled = index;
    for (let i = 0; i < digits.length && index + i < length; i += 1) {
      next[index + i] = digits[i];
      lastFilled = index + i;
    }
    onChange(next);
    focus(Math.min(lastFilled + 1, length - 1));
  };

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits) applyDigits(index, digits);
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "");
    if (digits) applyDigits(0, digits.slice(0, length));
  };

  return { handleChange, handleKeyDown, handlePaste, inputRefs };
};
