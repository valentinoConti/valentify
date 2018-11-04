import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from "redux";
import { Provider } from "react-redux";

import Login from './components/loginView/login';
import App from './App';

ReactDOM.render(
  <BrowserRouter basename="/valentify/">
    <Login />
  </BrowserRouter>,
  document.getElementById('root'),
);
