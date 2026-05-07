import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { TextField } from "../../../../components/TextField";
import { Wrap } from "../../../../styles/layout";
import { Heading } from "../../../../styles/typography";
import { EyeButton } from "./styles";

interface PasswordStepProps {
  confirmPassword: string;
  errors: { password?: string; confirmPassword?: string };
  onConfirmPasswordChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  password: string;
}

export const PasswordStep = (props: PasswordStepProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <Wrap>
      <Heading $mb={30}>Create a password for your account</Heading>
      <TextField
        action={
          <EyeButton
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            onClick={() => setPasswordVisible((v) => !v)}
            type="button"
          >
            {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </EyeButton>
        }
        error={props.errors.password}
        helper="Must be at least 6 characters"
        label="Enter new password"
        onChange={(e) => props.onPasswordChange(e.target.value)}
        placeholder="Enter new password"
        type={passwordVisible ? "text" : "password"}
        value={props.password}
      />
      <TextField
        action={
          <EyeButton
            aria-label={confirmVisible ? "Hide password" : "Show password"}
            onClick={() => setConfirmVisible((v) => !v)}
            type="button"
          >
            {confirmVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </EyeButton>
        }
        helper="Both passwords must match"
        error={props.errors.confirmPassword}
        label="Confirm password"
        onChange={(e) => props.onConfirmPasswordChange(e.target.value)}
        placeholder="Confirm password"
        type={confirmVisible ? "text" : "password"}
        value={props.confirmPassword}
      />
    </Wrap>
  );
};
