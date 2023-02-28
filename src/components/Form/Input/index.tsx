import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

type TInput = {
  label: string;
  id: string;
  type: 'text' | 'email' | 'password';
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
};

const Input = ({ label, id, type, register, error }: TInput) => (
  <fieldset>
    <StyledTextField label={label} type={type} id={id} {...register} />
    {error && <StyledParagraph fontColor='red'>{error.message}</StyledParagraph>}
  </fieldset>
);

export default Input;
