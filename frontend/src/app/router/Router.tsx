import { Route, Routes, Link } from 'react-router-dom';
import ROUTES from './routes';
import App from '../app';
import HomePage from '../pages/HomePage';
import SignIn from '../components/signInTailwindTest';


const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route index={true} path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<SignIn />} />
      </Route>
      {/* <Route path={ROUTES.DEFAULT} element={<NotFoundPage />} />  */}
    </Routes>
  );
};

export default Router;