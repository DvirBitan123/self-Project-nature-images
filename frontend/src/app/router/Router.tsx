import { Route, Routes, Link } from 'react-router-dom';
import ROUTES from './routes';
import App from '../app';
import HomePage from '../pages/HomePage';


const Router = () => {
  return (
    <Routes>
      <Route path={'/'} element={<App />}>
        <Route index={true} path={ROUTES.HOME} element={<HomePage />} />
      </Route>
      {/* <Route path={ROUTES.DEFAULT} element={<NotFoundPage />} />  */}
    </Routes>
  );
};

export default Router;