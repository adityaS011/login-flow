import { ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { Modal, Overlay } from "../../../styles/layout";
import { tokens } from "../../../styles/tokens";
import { SignupSummary } from "../useSignupWizard";
import successTick from "../../../assets/success_tick.svg";

interface CompletionModalProps {
  onDone: () => void;
  summary: SignupSummary;
}

export const CompletionModal = ({ onDone, summary }: CompletionModalProps) => {
  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDone();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onDone]);

  return (
    <Overlay>
      <Modal ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="done-title" tabIndex={-1}>
        <SuccessIcon src={successTick} alt="Success" />
        <Title id="done-title">You're all set!</Title>
        <Copy>Here's a quick summary of your account details</Copy>
        <SummaryList>
          <dt>Account Type</dt>
          <dd>{summary.accountType}</dd>
          <dt>Name</dt>
          <dd>{summary.name}</dd>
          <dt>Mobile Number</dt>
          <dd>{summary.phone}</dd>
        </SummaryList>
        <Secure>
          <ShieldCheck size={14} color="#22c55e" /> Your account is secured with bank-grade security
        </Secure>
        <Button onClick={onDone} type="button">Go To Dashboard</Button>
      </Modal>
    </Overlay>
  );
};

const SuccessIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  margin: 8px 0 6px;
  color: ${tokens.primary};
`;

const Copy = styled.p`
  margin: 0 0 20px;
  color: ${tokens.muted};
  font-size: 14px;
`;

const SummaryList = styled.dl`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  border-radius: 18px;
  padding: 20px;
  background: ${tokens.page};
  font-size: 12px;

  dt {
    color: ${tokens.muted};
  }

  dd {
    color: ${tokens.primary};
    font-weight: 600;
  }
`;

const Secure = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 18px 0 24px;
  color: ${tokens.muted};
  font-size: 12px;
`;
