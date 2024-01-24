import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MapPage from '../pages/MapPage';
import UserPage from '../pages/UserPage';
import Layout from '../pages/Layout';
import NotFoundPage from '../pages/NotFoundPage';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.MAP} element={<MapPage />} />
        <Route path={ROUTES.USER} element={<UserPage />} />
        <Route path={ROUTES.DEFAULT} element={<NotFoundPage />} /> 
      </Route>
    </Routes>
  );
};

export default Router;