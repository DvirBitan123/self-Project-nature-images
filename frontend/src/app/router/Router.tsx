import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MapPage from '../pages/MapPage';


const Router = () => {
  return (
    <Routes>
      <Route index={true} path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.MAP} element={<MapPage />} />
      {/* <Route path={ROUTES.DEFAULT} element={<NotFoundPage />} />  */}
    </Routes>
  );
};

export default Router;