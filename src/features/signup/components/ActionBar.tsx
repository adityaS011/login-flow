import styled from "styled-components";
import { Button } from "../../../components/Button";
import { bp } from "../../../styles/tokens";

interface ActionBarProps {
  back: () => void;
  next: () => void;
  isFirstStep?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
}

export const ActionBar = ({
  back,
  next,
  isFirstStep = false,
  isLoading = false,
  nextLabel = "Continue",
}: ActionBarProps) => (
  <Bar>
    <Button disabled={isFirstStep} onClick={back} type="button" variant="secondary">
      Back
    </Button>
    <Button isLoading={isLoading} onClick={next} type="button">
      {nextLabel}
    </Button>
  </Bar>
);

const Bar = styled.footer`
  position: absolute;
  right: 24px;
  bottom: 44px;
  left: 24px;
  display: flex;
  justify-content: space-between;
  gap: 14px;

  ${bp.mobile} {
    position: static;
    margin-top: auto;
    padding: 24px 24px 40px;
  }
`;
