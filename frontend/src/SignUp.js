import React from 'react';
import './styles/signUp.scss';
import FormSignUp from './components/FormSignUp';
import { Link, Outlet } from "react-router-dom";

function SignUp() {
  return (
    <div className="container">
        <div className="left-block">
            <div className="welcome">
              <h1>Welcome !</h1>
              <p className='text'>First time here ? Let's create your account <strong>quickly</strong> !</p>
              <hr />
              <p className='text'><em>Already a member ? :) </em></p>
              <Link to="/login" className='btn-primary'>Login</Link>
            </div>
        </div>
        <div className="right-block">
            <FormSignUp />
        </div>
    </div>
  );    
}

export default SignUp;
