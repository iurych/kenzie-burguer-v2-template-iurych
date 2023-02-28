import { Navigate, Outlet } from 'react-router-dom';

export const PrivetRoute = () => {
  const token = localStorage.getItem('@TOKEN');

  return token ? <Outlet /> : <Navigate to='/' />;
};
