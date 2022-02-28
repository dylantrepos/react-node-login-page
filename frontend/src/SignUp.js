import React, { useState } from 'react';
import './styles/signUp.scss';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

function SignUp() {
  const [loginPage, setLoginPage] = useState(false);

  const handleLogin = () => {
      setLoginPage(!loginPage)
  }

  return (
    <div className="container">
        <div className="left-block">
            <div className="welcome">
              <h1>Welcome !</h1>
              <p className='text'>{loginPage ? "Nice to see you again !" :  "First time here ? Let's create your account quickly !"}</p>
              <hr />
              <p className='text'><em>{ loginPage ? 'No account ? Sign up in 30 seconds' : 'Already have an account ?' } </em></p>
              <button  onClick={handleLogin}>{ loginPage ? 'Sign up' : 'login' }</button>
            </div>
        </div>
        <div className='form-block'> <div className="right-block">
            { loginPage ? <LoginForm /> : <SignUpForm />}
        </div></div>
    </div>
  );    
}

export default SignUp;
