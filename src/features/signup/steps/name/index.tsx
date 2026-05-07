import { TextField } from "../../../../components/TextField";
import { Wrap } from "../../../../styles/layout";
import { Heading } from "../../../../styles/typography";

interface NameStepProps {
  errors: {
    firstName?: string;
    lastName?: string;
  };
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
}

export const NameStep = (props: NameStepProps) => {
  return (
    <Wrap>
      <Heading $mb={30}>What is your name?</Heading>

      <TextField
        error={props.errors.firstName}
        label="First Name"
        onChange={(event) => props.onFirstNameChange(event.target.value)}
        placeholder="Oliver"
        value={props.firstName}
      />
      <TextField
        error={props.errors.lastName}
        label="Last Name"
        onChange={(event) => props.onLastNameChange(event.target.value)}
        placeholder="Last Name"
        value={props.lastName}
      />
    </Wrap>
  );
};
