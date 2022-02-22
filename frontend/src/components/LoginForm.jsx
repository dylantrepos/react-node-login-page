import { useState } from 'react';
import { useForm } from 'react-hook-form';
import getAge from '../helpers/getAge';
import { postData } from '../helpers/postData';
import Submitbutton from './SubmitButton';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default function LoginForm () {

    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const [succesForm, setSuccesForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);

    const onSubmit = async data => {
        const datas = await fetch(`http://localhost:5500/users/${data.email.toLowerCase()}`).
                then((data) => data.json()).
                then((res) => {
                    return res["error"] ? false : res
                })  
        if(datas){
            bcrypt.compareSync(data.password, datas.password) ? console.log("yes") : setErrorForm(true);
            
        }
        else {
            console.log("nope")
            setErrorForm(true)
        }
        
    }
    
    const onError = () => {
        setSuccesForm(false)
        setErrorForm(false)
    }

    return <form method='GET' onSubmit={handleSubmit(onSubmit, onError)}>
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
