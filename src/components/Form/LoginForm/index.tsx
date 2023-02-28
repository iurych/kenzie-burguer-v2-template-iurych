import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { TRegisterFormData } from '../RegisterForm';
import { useDataContext } from '../../../providers/UserContext';

export type TLoginFormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().required('Forneça um email'),
    password: yup.string().required('Digite sua senha'),
  })
  .required();

const LoginForm = () => {
  const { UserLogin } = useDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormData>({
    resolver: yupResolver(schema),
  });
  return (
    <StyledForm onSubmit={handleSubmit(UserLogin)}>
      <Input
        label='Email'
        id='email'
        type='email'
        error={errors.email}
        register={register('email')}
      />
      <Input
        label='Senha'
        id='senha'
        type='password'
        error={errors.password}
        register={register('password')}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
