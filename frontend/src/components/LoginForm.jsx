import {  useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../helpers/postData';
import { Navigate } from 'react-router-dom';
import Submitbutton from './SubmitButton';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default function LoginForm () {

    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const [succesForm, setSuccesForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);
    const [connected, setConnected] = useState(false)

    useLayoutEffect(() => {
        const test = fetch('http://localhost:5500/users/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        })
            .then(res => res.json())
            .then(res => {
            if(res.authenticated) setConnected(true)
            })
    }, []);
    
    const onSubmit = async data => {
        setErrorForm(false)
        const url = 'http://localhost:5500/users/login/';
        const datas = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({email: data.email.toLowerCase(), password: data.password})
        }, { withCredentials: true }).then((data) => data.json())
          .then((data) => {
              if(data["error"]) setErrorForm(true)
              else {
                  setSuccesForm(true)
                } //console.log('front : ' + JSON.stringify(data))
            })
            .catch(err => console.error(`Error when trying to connect to ${url}. Error message : ${err}`))
    }

    return <>
    {connected ? <Navigate to='/connected'/> : ''}
    <form onSubmit={handleSubmit(onSubmit)}>
            {succesForm ? <Navigate to="/connected" /> : '' }
            {errorForm ? <p className='error-form'>Error, your email or password are not correct. Try again or <a href='/' className='link'>create an account</a>.</p> : '' }
                <div className="form" >
                <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" {...register("email", { required: "This is required.", pattern: {
                                value: /\w*@\w*\.[a-z]*/,
                                message: 'Please enter a valid email address'
                                } })} placeholder="Email..." />
                        <p className='errors'>{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", { required: "This is required." })} placeholder="Password..." />
                        <p className='errors'>{errors.password?.message}</p>
                    </div>
                   
                    <Submitbutton>Login</Submitbutton>

                </div>
            </form>
            </>
}
