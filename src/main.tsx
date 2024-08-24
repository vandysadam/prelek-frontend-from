import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRouter from './../router/app-router';
import { Provider } from 'react-redux';
import { persistor, store } from './../store';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
