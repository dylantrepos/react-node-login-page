import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './routes/login';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />}/>
      <Route path="login" element={<Login />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
