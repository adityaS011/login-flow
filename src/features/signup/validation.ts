import { FieldErrors, SignupData, StepId } from "./types";

export const validateStep = (step: StepId, data: SignupData): FieldErrors => {
  const errors: FieldErrors = {};

  switch (step) {
    case StepId.Phone:
      if (data.phone.replace(/\D/g, "").length < 8) {
        errors.phone = "Enter a valid mobile number.";
      }
      break;

    case StepId.Otp:
      if (data.otp.some((digit) => !digit)) {
        errors.otp = "Enter the 4-digit OTP.";
      }
      break;

    case StepId.Name:
      if (!data.firstName.trim()) errors.firstName = "First name is required.";
      if (!data.lastName.trim()) errors.lastName = "Last name is required.";
      break;

    case StepId.Password:
      if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }
      break;
  }

  return errors;
};
