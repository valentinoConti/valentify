import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/loginView/login';

ReactDOM.render(
  <BrowserRouter basename="/valentify/">
    <Login />
  </BrowserRouter>,
  document.getElementById('root'),
);
