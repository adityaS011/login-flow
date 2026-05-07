import styled from "styled-components";
import groupBg from "../../assets/group-bg.svg";
import { bp, tokens } from "../../styles/tokens";
import { PageTitle } from "../../styles/typography";

export const Shell = styled.main`
  display: grid;
  height: 100dvh;
  overflow: hidden;
  grid-template-columns: minmax(420px, 47%) minmax(520px, 53%);
  background-color: ${tokens.default};
  background-image: url(${groupBg});
  background-size: cover;
  background-position: center;

  ${bp.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

export const Intro = styled.section`
  position: relative;
  height: 100%;
  padding: 70px 0 52px 64px;
  overflow: hidden;

  ${bp.mobile} {
    height: auto;
    padding: 36px 24px 32px;
  }
`;

export const Kicker = styled.p`
  margin: 0 0 10px;
  color: ${tokens.primary};
  font-size: 24px;

  ${bp.mobile} {
    font-size: 13px;
    margin: 0 0 4px;
  }
`;

export const Title = styled(PageTitle)`
  ${bp.mobile} {
    font-size: 24px;
  }
`;

export const Subtitle = styled.p`
  margin: 18px 0 0;
  color: ${tokens.primary};
  font-size: 16px;

  ${bp.mobile} {
    display: none;
  }
`;

export const Art = styled.img`
  position: absolute;
  left: 62px;
  bottom: 54px;
  width: min(43vw, 486px);
  max-height: 42vh;

  ${bp.mobile} {
    display: none;
  }
`;
