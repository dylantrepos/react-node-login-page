import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/signUp.scss';
import { removeCookie } from '../helpers/removeCookie';
import { useForm } from 'react-hook-form';
import getAge from '../helpers/getAge';
import { postData } from '../helpers/postData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastSuccess } from '../helpers/toastify';

export default function Connected() {

  const [loggedin, setLoggedIn] = useState(true)
  const [user, setUser] = useState(false)
  const [load, setLoad] = useState(true)
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const [userForm, setUserForm] = useState({
    password: '',
    name: '',
    dob: '',
    city: ''
  })

  const callAPI = () => {
    fetch('https://test-back-office-api.herokuapp.com/users/login', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(data => data.json())
      .then(data => {
        if(data){
          if(data.authenticated) {
           ( async () => {
            const accountAlreadyExists = await fetch(`https://test-back-office-api.herokuapp.com/users/get/${data.userid}`).
                  then((data) => data.json()).
                  then((user) => (user))
            setUser(accountAlreadyExists)  
            setUserForm({...userForm, 
              name: accountAlreadyExists.name,
              dob: accountAlreadyExists.dob,
              city: accountAlreadyExists.city
            })                
            setLoad(false);
          })()                
          } else {
            setLoggedIn(false)
          } 
          setLoggedIn(true);
        }
      })
  }

  useEffect(() => {
      callAPI()
  }, [])

  const onDisconnect = () => {
    removeCookie();
    window.location.href = "/"
  }

  const onSubmit = async (data) => {
    const userSend = {
                          name: userForm.name,
                          dob: userForm.dob,
                          city: userForm.city
                      };
    if(userForm.password.length > 0) userSend = {...userSend, password: userForm.password}
    const url = `https://test-back-office-api.herokuapp.com/users/${user._id}`;
    postData("PUT", url, userSend);
    toastSuccess("Your modifications has been saved !");
    callAPI();
  }

  const onDelete = async () => {
    const resultat = window.confirm('Are you sure about deleting your account ?')
    const url = `https://test-back-office-api.herokuapp.com/users/${user._id}`;
    if(resultat) {
      postData("DELETE", url, {});
       onDisconnect()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({...userForm, [name]: value});
  }

    return (<div className='connected-block'>
        {(load) ? <h1>Loading ... </h1> : <>
         

          {(loggedin === false) ? <Navigate to='/' /> : ''}
            <div className='connected-header'>
              <h1 className='connected-title'>Welcome <span  className='connected-name'>{user?.name}</span></h1>
              <button href='#' className='btn-logout' onClick={onDisconnect}>Logout</button>
            </div>
            
            <div className="form-group">
            <form method='POST' onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer />
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
                        <input type="date" {...register("dob", {  
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
                   
                    <button type='submit'>Save modification</button>

                </div>
            </form>
            </div>
            <hr style={{margin: "2rem"}} />
            <div className='delete'>
                <h3 style={{marginBottom: "1rem"}}>Delete your account</h3>
                <button className='btn-danger' onClick={onDelete}>Delete</button>
            </div>
          </>}
      </div>
    )
}
