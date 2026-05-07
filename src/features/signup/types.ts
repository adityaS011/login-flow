export enum AccountType {
  Personal = "personal",
  Business = "business",
}

export enum StepId {
  Account = "account",
  Phone = "phone",
  Otp = "otp",
  Name = "name",
  Password = "password",
}

export interface SignupData {
  accountType: AccountType;
  countryCode: string;
  phone: string;
  otp: string[];
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface FieldErrors {
  accountType?: string;
  countryCode?: string;
  phone?: string;
  otp?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
}

export const steps: StepId[] = [
  StepId.Account,
  StepId.Phone,
  StepId.Otp,
  StepId.Name,
  StepId.Password,
];
