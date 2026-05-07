import artboard from "../assets/artboard.svg";
import { SignupFlow } from "../features/signup/SignupFlow";
import { AuthLayout } from "../layouts/auth";

export const SignupPage = () => (
  <AuthLayout
    art={artboard}
    kicker="Let's get started"
    subtitle="Follow the steps to create your account"
    title="Create your account"
  >
    <SignupFlow />
  </AuthLayout>
);
