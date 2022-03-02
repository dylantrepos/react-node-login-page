import {  useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { testCookie } from '../helpers/checkCookie';
import { toastDanger } from '../helpers/toastify';
export default function LoginForm () {

    const { register, handleSubmit, formState: {errors} } = useForm();
    const [succesForm, setSuccesForm] = useState(false);
    const [connected, setConnected] = useState(false);

    useLayoutEffect(() => {
        testCookie.then(res => res.authenticated ? setConnected(true): setConnected(false));
    }, []);
    
    const onSubmit = async data => {
        const datas = await fetch('https://test-back-office-api.herokuapp.com/users/login/', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({email: data.email.toLowerCase(), password: data.password})
        }, { withCredentials: true })
        .then((data) =>  data.json())
        .then(data => data["error"] ? toastDanger('Error, invalid email and/or password. Try again or create an account.') : setSuccesForm(true))
        .catch(err => console.error(`Error when trying to connect. Error message : ${err}`))
    }

    return <>
    { (succesForm || connected) ? <Navigate to='/connected'/> : '' }
    <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
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
                        <input type="password" {...register("password", { required: "This is required." })} placeholder="Password..." autoComplete='false' />
                        <p className='errors'>{errors.password?.message}</p>
                    </div>
                   
                    <button type='submit'>
                        <span>Login</span>
                    </button>
                </div>
            </form>
            </>
}
