import styled from "styled-components";
import { Toast } from "../../components/Toast";
import { bp } from "../../styles/tokens";
import { ActionBar } from "./components/ActionBar";
import { CompletionModal } from "./components/CompletionModal";
import { StepRenderer } from "./components/StepRenderer";
import { CardBody, WizardCard } from "./components/WizardCard";
import { useSignupWizard } from "./useSignupWizard";

const Form = styled.form`
  display: contents;
`;

const Panel = styled.section`
  display: grid;
  place-items: center;
  padding: 62px 52px 40px 0;
  
  ${bp.mobile} {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
  }
`;

export const SignupFlow = () => {
  const wizard = useSignupWizard();

  return (
      <Panel>
        <WizardCard progress={wizard.progress}>
          <Form onSubmit={(e) => { e.preventDefault(); wizard.next(); }}>
            <CardBody key={wizard.step}>
              <StepRenderer wizard={wizard} />
            </CardBody>
            <ActionBar
              back={wizard.back}
              isFirstStep={wizard.isFirstStep}
              isLoading={wizard.isLoading}
              nextLabel={wizard.isLastStep ? "Complete" : "Continue"}
            />
          </Form>
        </WizardCard>
      {wizard.completed && (
        <CompletionModal onDone={wizard.reset} summary={wizard.summary} />
      )}
      {wizard.toast && (
        <Toast message={wizard.toast} onDismiss={wizard.dismissToast} />
      )}
      </Panel>
  );
};
