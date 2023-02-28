import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';
import { TRegisterFormData } from '../components/Form/RegisterForm';
import { TLoginFormData } from '../components/Form/LoginForm';

type TUserProps = {
  children: React.ReactNode;
};

export type TUser = {
  name: string;
  email: string;
  id: string;
  confirmPassword?: string;
};

export type TResponseLogin = {
  accessToken: string;
  user: TUser;
};

export type TUserContext = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  UserRegister: (data: TRegisterFormData) => Promise<void>;
  UserLogin: (data: TLoginFormData) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  user: TUser | null;
};

export const UserContext = createContext<TUserContext>({} as TUserContext);

export const UserProvider = ({ children }: TUserProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);

  const navigate = useNavigate();

  const UserRegister = async (data: TRegisterFormData): Promise<void> => {
    try {
      setLoading(true);
      await api.post('/users', data);
      toast.success('Parabéns, cadastro realizado!');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Ops, algo deu errado!');
      }
    } finally {
      setLoading(true);
    }
  };

  const UserLogin = async (data: TLoginFormData): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.post<TResponseLogin>('/login', data);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      navigate('/shop');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Ops, algo deu errado!');
      }
    } finally {
      setLoading(true);
    }
  };

  return (
    <UserContext.Provider
      value={{ loading, setLoading, UserRegister, UserLogin, setUser, user }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useDataContext = () => useContext(UserContext);
