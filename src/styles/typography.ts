import styled from "styled-components";
import { tokens } from "./tokens";

export const PageTitle = styled.h1`
  color: ${tokens.primary};
  font-size: 48px;
  line-height: 1.15;
`;

export const Heading = styled.h2<{ $mb?: number }>`
  margin-bottom: ${({ $mb = 0 }) => $mb}px;
  color: ${tokens.primary};
  font-size: 20px;
`;
