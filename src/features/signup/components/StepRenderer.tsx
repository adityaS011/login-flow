import { AccountTypeStep } from "../steps/account-type";
import { NameStep } from "../steps/name";
import { OtpStep } from "../steps/otp";
import { PasswordStep } from "../steps/password";
import { PhoneStep } from "../steps/phone";
import { StepId } from "../types";
import { SignupWizard } from "../useSignupWizard";

interface StepRendererProps {
  wizard: SignupWizard;
}

export const StepRenderer = ({ wizard }: StepRendererProps) => {
  const { data, errors, update } = wizard;

  switch (wizard.step) {
    case StepId.Account:
      return (
        <AccountTypeStep
          onChange={(accountType) => update({ accountType })}
          value={data.accountType}
        />
      );

    case StepId.Phone:
      return (
        <PhoneStep
          code={data.countryCode}
          error={errors.phone}
          onCodeChange={(countryCode) => update({ countryCode })}
          onPhoneChange={(phone) => update({ phone })}
          phone={data.phone}
        />
      );

    case StepId.Otp:
      return (
        <OtpStep
          error={errors.otp}
          isLoading={wizard.isLoading}
          onChange={(otp) => update({ otp })}
          onResend={wizard.resendOtp}
          value={data.otp}
        />
      );

    case StepId.Name:
      return (
        <NameStep
          errors={errors}
          firstName={data.firstName}
          lastName={data.lastName}
          onFirstNameChange={(firstName) => update({ firstName })}
          onLastNameChange={(lastName) => update({ lastName })}
        />
      );

    case StepId.Password:
      return (
        <PasswordStep
          confirmPassword={data.confirmPassword}
          errors={errors}
          onConfirmPasswordChange={(confirmPassword) =>
            update({ confirmPassword })
          }
          onPasswordChange={(password) => update({ password })}
          password={data.password}
        />
      );
  }
};
