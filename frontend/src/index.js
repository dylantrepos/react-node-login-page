import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './SignUp';
import Login from './routes/login';
import Connected from './routes/connected';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />}/>
      <Route path="login" element={<Login />}/>
      <Route path="connected" element={<Connected />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
