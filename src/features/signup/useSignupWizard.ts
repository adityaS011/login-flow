import { useMemo, useReducer, useState } from "react";
import {
  SignupActionType,
  initialSignupState,
  signupReducer,
} from "./signupReducer";
import { AccountType, FieldErrors, SignupData, StepId, steps } from "./types";
import { validateStep } from "./validation";

export interface SignupSummary {
  accountType: string;
  email: string;
  name: string;
  phone: string;
}

export interface SignupWizard {
  back: () => void;
  completed: boolean;
  data: SignupData;
  errors: FieldErrors;
  isFirstStep: boolean;
  isLoading: boolean;
  next: () => void;
  progress: number;
  reset: () => void;
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

  const summary = useMemo(
    () => ({
      accountType:
        state.data.accountType === AccountType.Personal ? "Personal" : "Business",
      email: "jo****@example.com",
      name:
        [state.data.firstName, state.data.lastName].filter(Boolean).join(" ") || "-",
      phone: state.data.phone ? `${state.data.countryCode} ${state.data.phone}` : "-",
    }),
    [state.data],
  );

  const update = (payload: Partial<SignupData>) => {
    const changedKeys = Object.keys(payload) as Array<keyof FieldErrors>;
    setErrors((prev) => {
      const next = { ...prev };
      changedKeys.forEach((k) => delete next[k]);
      return next;
    });
    dispatch({ type: SignupActionType.Patch, payload });
  };

  const next = () => {
    const nextErrors = validateStep(state.step, state.data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (state.step === StepId.Password) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        dispatch({ type: SignupActionType.Complete });
      }, 1200);
    } else {
      dispatch({ type: SignupActionType.Next });
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
    isLoading,
    next,
    progress,
    reset,
    step: state.step,
    summary,
    update,
  };
};
