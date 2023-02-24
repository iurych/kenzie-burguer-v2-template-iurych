import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { useDataContext } from '../../../providers/UserContext';

export type TRegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string | undefined;
};

const schema = yup
  .object({
    name: yup.string().required('* Campo obrigatório!'),
    email: yup
      .string()
      .required('* Campo obrigatório!')
      .email('Digite um email!'),
    password: yup
      .string()
      .required('* Campo obrigatório!')
      .matches(/.{6,}/, 'No mínimo 6 caracteres!'),
    confirmPassword: yup
      .string()
      .required('* Campo obrigatório!')
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais!'),
  })
  .required();

const RegisterForm = () => {
  const { UserRegister } = useDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<TRegisterFormData> = async (data) => {
    delete data.confirmPassword;

    await UserRegister(data);
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Nome'
        id='name'
        type='text'
        error={errors.name?.message}
        register={register('name')}
      />
      <Input
        label='Email'
        id='email'
        type='email'
        error={errors.email?.message}
        register={register('email')}
      />
      <Input
        label='Senha'
        id='password'
        type='password'
        error={errors.password?.message}
        register={register('password')}
      />
      <Input
        label='Confirme a senha'
        id='confirmPassword'
        type='password'
        error={errors.confirmPassword?.message}
        register={register('confirmPassword')}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
