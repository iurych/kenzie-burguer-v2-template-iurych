/* eslint-disable no-param-reassign */
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDataContext } from '../../../providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

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
    console.log(data)

    await UserRegister(data);
  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Nome'
        id='name'
        type='text'
        error={errors.name}
        register={register('name')}
      />
      <Input
        label='Email'
        id='email'
        type='email'
        error={errors.email}
        register={register('email')}
      />
      <Input
        label='Senha'
        id='password'
        type='password'
        error={errors.password}
        register={register('password')}
      />
      <Input
        label='Confirme a senha'
        id='confirmPassword'
        type='password'
        error={errors.confirmPassword}
        register={register('confirmPassword')}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
