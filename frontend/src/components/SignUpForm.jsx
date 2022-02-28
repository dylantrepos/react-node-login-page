import { useForm } from 'react-hook-form';
import getAge from '../helpers/getAge';
import { postData } from '../helpers/postData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastDanger, toastSuccess } from '../helpers/toastify';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default function SignUpForm () {

    const { register, handleSubmit, reset, formState: {errors} } = useForm();

    const onSubmit = async data => {
        const accountAlreadyExists = await fetch(`http://localhost:5500/users/get/${data.email.toLowerCase()}`).
                then((data) => data.json()).
                then((res) => {
                    return res["error"] ? false : true
                })  
        if(accountAlreadyExists) toastDanger('This email already exists ! Please choose another one.');
        else {
            postData("POST", 'http://localhost:5500/users', {
                email: data.email.toLowerCase(),
                password: bcrypt.hashSync(data.password, salt),
                name: data.name,
                dob: data.dob,
                city: data.city
            });
            reset();
            toastSuccess('Success ! Your account has been created.');
        }
        
    }

    return <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                <ToastContainer />
                <div className="form" >
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email..." {...register("email", { required: "This is required.", pattern: {
                                value: /\w*@\w*\.[a-z]*/,
                                message: 'Please enter a valid email address'
                                }})} />
                        <p className='errors'>{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", { required: "This is required.", 
                            minLength: {
                                value: 8,
                                message: "Min length is 8" }, 
                            pattern: {
                                value: /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))((?=.*[A-Z])(?=.*[0-9]))(?=.*[!@#$%^&*]))/,
                                message: "Password must contains at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character"
                        }})} placeholder="Password..." autoComplete='false'/>
                        <p className='errors'>{errors.password?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input placeholder="Name..."  {...register("name", { required: "This is required.", pattern: { 
                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/gm,
                            message: "Name can only contains letters (a-z)."
                        }})} />
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
                        <input placeholder="City..." {...register("city", { required: "This is required.", pattern: { 
                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/gm,
                            message: "Name can only contains letters (a-z)."
                        }})} />
                        <p className='errors'>{errors.city?.message}</p>
                    </div>
                    <button type='submit'> Create my account</button>
                </div>
            </form>
}
