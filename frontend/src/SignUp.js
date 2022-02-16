import React from 'react';
import './styles/signUp.scss';
import Form from './components/Form';

function SignUp() {
  return (
    <div className="container">
        <div className="left-block">
            <div className="welcome">
              <h1>Welcome !</h1>
              <p className='text'>First time here ? Let's create your account <strong>quickly</strong> !</p>
              <hr />
              <p className='text'><em>Already a member ? :) </em></p>
              <button className='btn-primary'>Login</button>

            </div>
        </div>
        <div className="right-block">
            <Form />
        </div>
    </div>
  );    
}

export default SignUp;
