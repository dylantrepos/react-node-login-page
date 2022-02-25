import React, { useEffect, useState } from 'react';
import './styles/signUp.scss';
import { Link, Outlet } from "react-router-dom";
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Submitbutton from './components/SubmitButton';

function SignUp() {
  const [loginPage, setLoginPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState({})

  const handleLogin = () => {
      setLoginPage(!loginPage)
  }

  useEffect(() => {
    fetch('http://localhost:5500/users/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
        .then(res => res.json())
  }, []);

  return (
    <div className="container">
        <div className="left-block">
            <div className="welcome">
              <h1>Welcome !</h1>
              <p className='text'>{loginPage ? "Nice to see you again !" :  "First time here ? Let's create your account quickly !"}</p>
              <hr />
              <p className='text'><em>{ loginPage ? 'No account ? Sign up in 30 seconds' : 'Already have an account ?' } </em></p>
              {/* <Link to="/login" className='btn-primary'>Login</Link> */}
              <button className='btn-primary' onClick={handleLogin}>{ loginPage ? 'Sign up' : 'login' }</button>
            </div>
        </div>
        <div className="right-block">
            { loginPage ? <LoginForm /> : <SignUpForm />}
        </div>
    </div>
  );    
}

export default SignUp;
