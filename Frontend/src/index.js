import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// i18n configuration - must be imported before App
import './i18n';

import './styles/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

