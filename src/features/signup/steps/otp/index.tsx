import { Wrap } from "../../../../styles/layout";
import { Heading } from "../../../../styles/typography";
import { Copy, Message, OtpContainer, OtpInput, OtpRow } from "./styles";
import { useOtpInputs } from "./useOtpInputs";

const OTP_LENGTH = 4;

interface OtpStepProps {
  error?: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export const OtpStep = ({ error, value, onChange }: OtpStepProps) => {
  const otp = useOtpInputs({ length: OTP_LENGTH, onChange, value });

  return (
    <Wrap $gap={10}>
      <Heading $mb={36}>OTP Verification</Heading>
      <Copy>An OTP has been sent to your mobile number</Copy>
      <OtpContainer>
        <OtpRow>
          {value.map((digit, index) => (
            <OtpInput
              key={index}
              ref={(el) => {
                otp.inputRefs.current[index] = el;
              }}
              aria-label={`OTP digit ${index + 1}`}
              inputMode="numeric"
              maxLength={OTP_LENGTH}
              value={digit}
              $filled={Boolean(digit)}
              $error={Boolean(error)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => otp.handleKeyDown(index, e)}
              onChange={(e) => otp.handleChange(index, e.target.value)}
              onPaste={otp.handlePaste}
            />
          ))}
        </OtpRow>
        <Message $error={Boolean(error)}>
          {error || (
            <div>
              Did not receive OTP? <button type="button">Resend OTP</button>
            </div>
          )}
        </Message>
      </OtpContainer>
    </Wrap>
  );
};
