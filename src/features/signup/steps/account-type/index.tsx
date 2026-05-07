import { BriefcaseBusiness, UserRound } from "lucide-react";
import { KeyboardEvent, useRef } from "react";
import { Wrap } from "../../../../styles/layout";
import { CheckIcon, Option, Options, Title } from "./styles";
import { AccountType } from "../../types";

interface AccountTypeStepProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

const choices = [
  { value: AccountType.Personal, label: "Personal", Icon: UserRound },
  { value: AccountType.Business, label: "Business", Icon: BriefcaseBusiness },
];

export const AccountTypeStep = ({ value, onChange }: AccountTypeStepProps) => {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % choices.length;
      onChange(choices[next].value);
      optionRefs.current[next]?.focus();
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + choices.length) % choices.length;
      onChange(choices[prev].value);
      optionRefs.current[prev]?.focus();
    }
  };

  return (
    <Wrap $gap={46}>
      <Title>
        To join us tell us <strong>what type of account</strong>
        <br />
        you are opening
      </Title>
      <Options role="radiogroup" aria-label="Account type">
        {choices.map(({ value: option, label, Icon }, index) => {
          const selected = value === option;
          return (
            <Option
              key={option}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              aria-checked={selected}
              role="radio"
              tabIndex={selected ? 0 : -1}
              $selected={selected}
              onClick={() => onChange(option)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              type="button"
            >
              <Icon size={16} />
              <span>{label}</span>
              {selected && <CheckIcon size={18} />}
            </Option>
          );
        })}
      </Options>
    </Wrap>
  );
};
