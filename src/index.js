import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FrontPage from './FrontPage';
import LoginForm from './LoginForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <LoginForm /> */}
    <FrontPage />
  </React.StrictMode>
);

reportWebVitals();
