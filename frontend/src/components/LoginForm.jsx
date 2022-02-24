import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { postData } from '../helpers/postData';
import Submitbutton from './SubmitButton';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default function LoginForm () {

    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const [succesForm, setSuccesForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);

    
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
        }).then((data) => data.json())
          .then((data) => {
              if(data["error"]) setErrorForm(true)
              else console.log('front : ' + JSON.stringify(data))
            })
            .catch(err => console.error(`Error when trying to connect to ${url}. Error message : ${err}`))
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
            {succesForm ? <p className='success-form'>Success ! Your account has been created.</p> : '' }
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
}
