import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TestHello from './TestHello';
import TestState from './TestState';
import Pokemon from './Pokemon';

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login1 from './Login1';
import Home1 from './Home1';
import Signup1 from './Signup1';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <Pokemon/>
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login1 />} />
      <Route path = "home" element = {<Home1 />} />
      <Route path = "signup" element = {<Signup1 />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
