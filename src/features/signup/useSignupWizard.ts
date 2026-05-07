import { useReducer, useState } from "react";
import { mockApi } from "../../api/mockApi";
import {
  SignupActionType,
  initialSignupState,
  signupReducer,
} from "./signupReducer";
import { AccountType, FieldErrors, SignupData, StepId, steps } from "./types";
import { validateStep } from "./validation";

export interface SignupSummary {
  accountType: string;
  name: string;
  phone: string;
}

export interface SignupWizard {
  back: () => void;
  completed: boolean;
  data: SignupData;
  errors: FieldErrors;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  next: () => void;
  progress: number;
  reset: () => void;
  resendOtp: () => void;
  step: StepId;
  summary: SignupSummary;
  update: (payload: Partial<SignupData>) => void;
}

export const useSignupWizard = (): SignupWizard => {
  const [state, dispatch] = useReducer(signupReducer, initialSignupState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const stepIndex = steps.indexOf(state.step);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const summary = {
    accountType:
      state.data.accountType === AccountType.Personal ? "Personal" : "Business",
    name:
      [state.data.firstName, state.data.lastName].filter(Boolean).join(" ") || "-",
    phone: state.data.phone ? `${state.data.countryCode} ${state.data.phone}` : "-",
  };

  const update = (payload: Partial<SignupData>) => {
    const changedKeys = Object.keys(payload) as Array<keyof FieldErrors>;
    setErrors((prev) => {
      const next = { ...prev };
      changedKeys.forEach((k) => delete next[k]);
      return next;
    });
    dispatch({ type: SignupActionType.Patch, payload });
  };

  const next = async () => {
    const nextErrors = validateStep(state.step, state.data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (state.step === StepId.Account || state.step === StepId.Name) {
      dispatch({ type: SignupActionType.Next });
      return;
    }

    setIsLoading(true);
    try {
      switch (state.step) {
        case StepId.Phone:
          await mockApi.sendOtp(`${state.data.countryCode}${state.data.phone}`);
          dispatch({ type: SignupActionType.Next });
          break;
        case StepId.Otp:
          await mockApi.verifyOtp(state.data.otp.join(""));
          dispatch({ type: SignupActionType.Next });
          break;
        case StepId.Password:
          await mockApi.register(state.data);
          dispatch({ type: SignupActionType.Complete });
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    try {
      await mockApi.sendOtp(`${state.data.countryCode}${state.data.phone}`);
      dispatch({ type: SignupActionType.Patch, payload: { otp: ["", "", "", ""] } });
      setErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  const back = () => {
    setErrors({});
    dispatch({ type: SignupActionType.Back });
  };

  const reset = () => {
    setErrors({});
    dispatch({ type: SignupActionType.Reset });
  };

  return {
    back,
    completed: state.completed,
    data: state.data,
    errors,
    isFirstStep: state.step === StepId.Account,
    isLastStep: state.step === StepId.Password,
    isLoading,
    next,
    progress,
    reset,
    resendOtp,
    step: state.step,
    summary,
    update,
  };
};
