import { useState } from 'react';
import { useForm } from 'react-hook-form';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default function Form () {

    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const [succesForm, setSuccesForm] = useState(false);
    const [errorForm, setErrorForm] = useState(false);

    const onSubmit = async data => {
        //console.log(data)
        const test = await fetch(`http://localhost:5500/users/${data.email.toLowerCase()}`).
                then((data) => data.json()).
                then((res) => {
                    return res["error"] ? false : true
                })  

        if(!test){
            sendForm({
                email: data.email.toLowerCase(),
                password: bcrypt.hashSync(data.password, salt),
                name: data.name,
                dob: data.dob,
                city: data.city
            });
            reset();
            setSuccesForm(true);
        }
        else {
            setErrorForm(true)
        }
    
    }

    const onError = () => {
        setSuccesForm(false)
        setErrorForm(false)
    }

    const sendForm = async (data) => {
        
        const response = await fetch('http://localhost:5500/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log(res);
        }).
           catch((err) => console.error(`Error creating user with the form : ${err}`));
    }

    const getAge = (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if(month < 0 || (month === 0 && today.getDate() < birthDate.getDate())){
            age--
        }
        if(age >= 18) return true
        else return false
    }

    return <form method='POST' onSubmit={handleSubmit(onSubmit, onError)}>
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
                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/gm,
                            message: "Name can only contains letters (a-z)."
                        }})} placeholder="Name..." />
                        <p className='errors'>{errors.name?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of birth</label>
                        <input type="date" {...register("dob", { required: "This is required.", 
                        validate: dob => getAge(dob) === true || 'You must be 16+ to sign in.'
                        })} />
                        <p className='errors'>{errors.dob?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input {...register("city", { required: "This is required.", pattern: { 
                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/gm,
                            message: "Name can only contains letters (a-z)."
                        }})} placeholder="City..." />
                        <p className='errors'>{errors.city?.message}</p>
                    </div>
                   

                    <input type="submit" value="Create my account" className='btn-primary' />
                </div>
            </form>
}
