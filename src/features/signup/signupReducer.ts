import { AccountType, SignupData, StepId, steps } from "./types";

export enum SignupActionType {
  Patch = "patch",
  Next = "next",
  Back = "back",
  Complete = "complete",
  Reset = "reset",
}

export type SignupAction =
  | { type: SignupActionType.Patch; payload: Partial<SignupData> }
  | {
      type:
        | SignupActionType.Next
        | SignupActionType.Back
        | SignupActionType.Complete
        | SignupActionType.Reset;
    };

export interface SignupState {
  step: StepId;
  data: SignupData;
  completed: boolean;
}

export const initialSignupState: SignupState = {
  step: StepId.Account,
  completed: false,
  data: {
    accountType: AccountType.Personal,
    countryCode: "+1",
    phone: "",
    otp: ["", "", "", ""],
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  },
};

export const signupReducer = (
  state: SignupState,
  action: SignupAction,
): SignupState => {
  switch (action.type) {
    case SignupActionType.Patch:
      return { ...state, data: { ...state.data, ...action.payload } };

    case SignupActionType.Back: {
      const index = steps.indexOf(state.step);
      return { ...state, step: steps[Math.max(0, index - 1)], completed: false };
    }

    case SignupActionType.Next: {
      const index = steps.indexOf(state.step);
      return { ...state, step: steps[Math.min(steps.length - 1, index + 1)] };
    }

    case SignupActionType.Complete:
      return { ...state, completed: true };

    case SignupActionType.Reset:
      return initialSignupState;
  }
};
