import { ReactNode } from "react";
import styled from "styled-components";
import { bp, tokens } from "../../../styles/tokens";

interface WizardCardProps {
  children: ReactNode;
  progress: number;
}

export const WizardCard = ({ children, progress }: WizardCardProps) => {
  return (
    <Card>
      <Progress>
        <Bar style={{ width: `${progress}%` }} />
      </Progress>
      {children}
    </Card>
  );
};

export const CardBody = styled.div`
  display: grid;
  gap: 18px;
  padding: 24px 52px 0;

  ${bp.mobile} {
    padding: 20px 24px 0;
    gap: 16px;
  }
`;

const Card = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(100%, 568px);
  min-height: min(720px, calc(100dvh - 102px));
  overflow: hidden;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);

  ${bp.mobile} {
    width: 100%;
    min-height: 0;
    flex: 1;
    border-radius: 20px 20px 0 0;
  }
`;

const Progress = styled.div`
  height: 4px;
  margin: 0 72px;
  background: #d8e6ff;

  ${bp.mobile} {
    margin: 0 24px;
  }
`;

const Bar = styled.div`
  height: 100%;
  border-radius: 999px;
  background: ${tokens.blue};
  transition: width 220ms ease;
`;
