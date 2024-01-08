import { Route, Routes, Link } from 'react-router-dom';
import ROUTES from './routes';
import App from '../app';
import HomePage from '../pages/HomePage';
import SignUp from '../components/users/Register/signUp';
// import Register from '../components/users/Register/Register';

const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route index={true} path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.REGISTER} element={<SignUp />} />
        {/* <Route path={ROUTES.REGISTER} element={<Register />} /> */}
      </Route>
      {/* <Route path={ROUTES.DEFAULT} element={<NotFoundPage />} />  */}
    </Routes>
  );
};

export default Router;