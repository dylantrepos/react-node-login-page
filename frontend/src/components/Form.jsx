import { useState } from 'react';
import { appendErrors, useForm } from 'react-hook-form';

export default function Form () {

    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const [form, setForm] = useState({});
    const onSubmit = data => {
        setForm({data})
        console.log(data)
    }
    
    // console.log(watch("firstname"));

    return <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form" >
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input {...register("username", { required: "This is required.", 
                            minLength: {  
                                value: 5,
                                message: 'Username must be at least 5 characters.'
                            }})} placeholder="Username..." />
                        <p className='errors'>{errors.username?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", { required: "This is required.", minLength: {
                            value: 8,
                            message: "Min length is 8"
                        }, pattern: {
                            value: /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))((?=.*[A-Z])(?=.*[0-9]))(?=.*[!@#$%^&*]))/,
                            message: "Password must contains at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character"
                        }})} placeholder="Password..." />
                        <p className='errors'>{errors.password?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input {...register("name", { required: "This is required.", pattern: { 
                            value: /^[a-zA-Z]+$/gm,
                            message: "Name can only contains letters (a-z)."
                        }})} placeholder="Name..." />
                        <p className='errors'>{errors.name?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" {...register("email", { required: "This is required.", pattern: {
                                value: /\w*@\w*\.[a-z]*/,
                                message: 'Please enter a valid email address'
                                } })} placeholder="Email..." />
                        <p className='errors'>{errors.email?.message}</p>
                    </div>

                    <input type="submit" value="Create my account" className='btn-primary' />
                </div>
            </form>
}
