import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './app/router/Router';
import App from './app/app';
import { Provider } from 'jotai/react';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Router />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
