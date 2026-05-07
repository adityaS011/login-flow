import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Wrap } from "../../../../styles/layout";
import { Heading } from "../../../../styles/typography";
import * as S from "./styles";

const COUNTRIES = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "AU" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
];

interface PhoneStepProps {
  code: string;
  error?: string;
  phone: string;
  onCodeChange: (code: string) => void;
  onPhoneChange: (phone: string) => void;
}

export const PhoneStep = (props: PhoneStepProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const errorId = useId();
  const selected = COUNTRIES.find((c) => c.code === props.code) ?? COUNTRIES[0];

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (code: string) => {
    props.onCodeChange(code);
    setOpen(false);
  };

  return (
    <Wrap $gap={46}>
      <Heading>OTP Verification</Heading>
      <S.FieldGroup>
        <S.FieldLabel>
          Mobile Number
          <S.RequiredIndicator aria-label="required">*</S.RequiredIndicator>
        </S.FieldLabel>
        <S.InputRow>
          <S.DropdownWrap ref={dropdownRef}>
            <S.DropdownTrigger
              type="button"
              aria-label="Country code"
              aria-expanded={open}
              $open={open}
              onClick={() => setOpen((v) => !v)}
            >
              <S.Flag>{selected.flag}</S.Flag>
              <S.Code>{selected.code}</S.Code>
              <S.Chevron $open={open}>
                <ChevronDown size={16} />
              </S.Chevron>
            </S.DropdownTrigger>
            {open && (
              <S.DropdownList role="listbox">
                {COUNTRIES.map((country) => (
                  <S.DropdownItem
                    key={country.code}
                    role="option"
                    aria-selected={country.code === props.code}
                    $active={country.code === props.code}
                    onClick={() => handleSelect(country.code)}
                  >
                    <S.Flag>{country.flag}</S.Flag>
                    <span>{country.name}</span>
                    <span>{country.code}</span>
                  </S.DropdownItem>
                ))}
              </S.DropdownList>
            )}
          </S.DropdownWrap>
          <S.PhoneInput
            aria-invalid={Boolean(props.error)}
            aria-required="true"
            aria-describedby={props.error ? errorId : undefined}
            inputMode="numeric"
            maxLength={15}
            placeholder="8343989239"
            value={props.phone}
            onChange={(e) => props.onPhoneChange(e.target.value.replace(/\D/g, ""))}
          />
        </S.InputRow>
        {props.error && <S.ErrorHint id={errorId} role="alert">{props.error}</S.ErrorHint>}
      </S.FieldGroup>
    </Wrap>
  );
};
