import { ReactNode } from "react";
import { Art, Intro, Kicker, Shell, Subtitle, Title } from "./styles";

interface AuthLayoutProps {
  art?: string;
  children: ReactNode;
  kicker?: string;
  subtitle?: string;
  title: string;
}

export const AuthLayout = ({
  art,
  children,
  kicker,
  subtitle,
  title,
}: AuthLayoutProps) => {
  return (
    <Shell>
      <Intro>
        {kicker && <Kicker>{kicker}</Kicker>}
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {art && <Art src={art} alt="" aria-hidden="true" />}
      </Intro>
      {children}
    </Shell>
  );
};
