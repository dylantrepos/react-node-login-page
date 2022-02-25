import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/signUp.scss';
import { checkCookie } from '../helpers/checkCookie';
import { removeCookie } from '../helpers/removeCookie';
import { useForm } from 'react-hook-form';
import getAge from '../helpers/getAge';
import Submitbutton from '../components/SubmitButton';

export default function Connected() {

  const [loggedin, setLoggedIn] = useState(true)
  const [user, setUser] = useState(false)
  const [load, setLoad] = useState(true)
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const [succesForm, setSuccesForm] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [userForm, setUserForm] = useState({
    password: '',
    name: '',
    dob: '',
    city: ''
  })


  useEffect(() => {
    checkCookie.then(data => {
      if(data){
        setLoad(false);
        (data.authenticated) ? setUser(data.user) : setLoggedIn(false);
        setUserForm({...userForm, 
          name: data.user.name,
          dob: data.user.dob,
          city: data.user.city
        })
      }
    })

  }, [])

  const onDisconnect = () => {
    removeCookie();
    setLoggedIn(false)
  }

  const onError = () => {
    setSuccesForm(false)
    setErrorForm(false)
  }

  const onSubmit = () => {}

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserForm({...userForm, [name]: value})
    console.log(value)
  }


    return (<>
        {(load) ? <h1>Loading ... </h1> : <>
          {(loggedin === false) ? <Navigate to='/' /> : ''}
            <div>
              <h1>Welcome {user?.name}</h1>
              <button href='#' className='btn-primary' onClick={onDisconnect}>Logout</button>
            </div>
            
            <form method='POST' onSubmit={handleSubmit(onSubmit, onError)}>
            {succesForm ? <p className='success-form'>Success ! Your modifications have been saved.</p> : '' }
                <div className="form" >
                  <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input type="email" placeholder={user.email} disabled={true} style={{background: 'rgb(218 218 218)'}}/>
                      </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" {...register("password", { minLength: {
                            value: 8,
                            message: "Min length is 8"
                        }, pattern: {
                            value: /^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))((?=.*[A-Z])(?=.*[0-9]))(?=.*[!@#$%^&*]))/,
                            message: "Password must contains at least 1 lowercase, 1 uppercase, 1 numeric, 1 special character"
                        }})} placeholder="***********" autoComplete='false'/>
                        <p className='errors'>{errors.password?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input {...register("name", { pattern: { 
                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/gm,
                            message: "Name can only contains letters (a-z)."
                        }})} placeholder="Name..." value={userForm.name} onChange={handleChange} />
                        <p className='errors'>{errors.name?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of birth</label>
                        <input type="date" {...register("dob", { required: "This is required.", 
                        validate: dob => getAge(dob) === true || 'You must be 16+ to sign in.'
                        })} value={userForm.dob} onChange={handleChange}/>
                        <p className='errors'>{errors.dob?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input {...register("city", { pattern: { 
                            value: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/gm,
                            message: "Name can only contains letters (a-z)."
                        }})} placeholder="City..." value={userForm.city} onChange={handleChange}/>
                        <p className='errors'>{errors.city?.message}</p>
                    </div>
                   
                    <Submitbutton>Save modification</Submitbutton>

                </div>
            </form>
          </>}
      </>
    )
}
