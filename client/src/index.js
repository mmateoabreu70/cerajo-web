import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const value = {
  appendTo: 'self'
};

root.render(
  <React.StrictMode>
    <PrimeReactProvider value={value}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
