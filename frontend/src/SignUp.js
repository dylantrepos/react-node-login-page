import React, { useState } from 'react';
import './styles/signUp.scss';
import { Link, Outlet } from "react-router-dom";
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Submitbutton from './components/SubmitButton';


function SignUp() {
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
      setLogin(!login)
  }

  return (
    <div className="container">
        <div className="left-block">
            <div className="welcome">
              <h1>Welcome !</h1>
              <p className='text'>{login ? "Nice to see you again !" :  "First time here ? Let's create your account quickly !"}</p>
              <hr />
              <p className='text'><em>{ login ? 'No account ? Sign up in 30 seconds' : 'Already have an account ?' } </em></p>
              {/* <Link to="/login" className='btn-primary'>Login</Link> */}
              <button className='btn-primary' onClick={handleLogin}>{ login ? 'Sign up' : 'login' }</button>
            </div>
        </div>
        <div className="right-block">
            { login ? <LoginForm /> : <SignUpForm />}
        </div>
    </div>
  );    
}

export default SignUp;
