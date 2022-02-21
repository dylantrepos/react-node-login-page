import { useState } from 'react';
import { useForm } from 'react-hook-form';
import getAge from '../helpers/getAge';
import { postForm } from '../helpers/postForm';
import Submitbutton from './SubmitButton';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default function LoginForm () {

    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const [succesForm, setSuccesForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);

    const onSubmit = async data => {
        const test = await fetch(`http://localhost:5500/users/${data.email.toLowerCase()}`).
                then((data) => data.json()).
                then((res) => {
                    return res["error"] ? false : true
                })  

        if(!test){
            setErrorForm(false)
            postForm({
                email: data.email.toLowerCase(),
                password: bcrypt.hashSync(data.password, salt),
            });
            reset();
            setSuccesForm(true);
        }
        else {
            setSuccesForm(false);
            setErrorForm(true)
        }
    
    }

    const onError = () => {
        setSuccesForm(false)
        setErrorForm(false)
    }

    return <form method='GET' onSubmit={handleSubmit(onSubmit, onError)}>
            {succesForm ? <p className='success-form'>Success ! Your account has been created.</p> : '' }
            {errorForm ? <p className='error-form'>Ho, this account already exists... ! Try with a different email.</p> : '' }
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
