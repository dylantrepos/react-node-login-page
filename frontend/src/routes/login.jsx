import React from 'react';
import { Link } from "react-router-dom";
import '../styles/signUp.scss';
import SignUpForm from '../components/SignUpForm';

const Login = () => {
    return (
        <div className="container">
            <div className="left-block">
                <div className="welcome">
                <h1>Login</h1>
                <p className='text'>You can log into your account with your <strong>username/email</strong> and your <strong>password</strong></p>
                <hr />
                <p className='text'><em>You don't have an account ? </em></p>
                <Link to="/" className='btn-primary'>Sign up</Link>
                </div>
            </div>
            <div className="right-block">
                <SignUpForm />
            </div>
        </div>
    );
}

export default Login;
