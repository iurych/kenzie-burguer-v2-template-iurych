import { UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

type TInput = {
  label: string;
  id: string;
  type: string; 
  register: UseFormRegisterReturn;
  error?: string | undefined;
};

const Input = ({ label, id, type, register, error }: TInput) => (
  <fieldset>
    <StyledTextField label={label} type={type} id={id} {...register} />
    {error && <StyledParagraph fontColor='red'>{error}</StyledParagraph>}
  </fieldset>
);

export default Input;
