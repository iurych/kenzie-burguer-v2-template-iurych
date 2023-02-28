// import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { PrivetRoute } from '../pages/PrivetRoute';
import RegisterPage from '../pages/RegisterPage';
import ShopPage from '../pages/ShopPage';

const Router = () => (
  <Routes>
    <Route path='/' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />

    <Route path='/shop' element={<PrivetRoute />}>
      <Route index element={<ShopPage />} />
    </Route>
  </Routes>
);

export default Router;
