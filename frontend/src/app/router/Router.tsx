import { Route, Routes, Link } from 'react-router-dom';
import ROUTES from './routes';
import App from '../app';
import HomePage from '../pages/HomePage';
import SignUp from '../components/users/Register/signUp';
import Login from '../components/users/Login/Login';


const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route index={true} path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.REGISTER} element={<SignUp />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>
      {/* <Route path={ROUTES.DEFAULT} element={<NotFoundPage />} />  */}
    </Routes>
  );
};

export default Router;