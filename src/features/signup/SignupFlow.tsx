import styled from "styled-components";
import { bp } from "../../styles/tokens";
import { ActionBar } from "./components/ActionBar";
import { CompletionModal } from "./components/CompletionModal";
import { StepRenderer } from "./components/StepRenderer";
import { CardBody, WizardCard } from "./components/WizardCard";
import { StepId } from "./types";
import { useSignupWizard } from "./useSignupWizard";

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
    <>
      <Panel>
        <WizardCard progress={wizard.progress}>
          <CardBody>
            <StepRenderer wizard={wizard} />
          </CardBody>
          <ActionBar
            back={wizard.back}
            isFirstStep={wizard.isFirstStep}
            isLoading={wizard.isLoading}
            next={wizard.next}
            nextLabel={wizard.step === StepId.Password ? "Complete" : "Continue"}
          />
        </WizardCard>
      </Panel>
      {wizard.completed && (
        <CompletionModal onDone={wizard.reset} summary={wizard.summary} />
      )}
    </>
  );
};
