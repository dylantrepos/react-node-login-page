import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/signUp.scss';
import { checkCookie } from '../helpers/checkCookie';


export default function Connected() {

  const [loggedin, setLoggedIn] = useState(true)
  const [user, setUser] = useState(false)
  const [load, setLoad] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5500/users/login', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(data => data.json())
      .then(data => {
        setLoad(false);
        (data.authenticated) ? setUser(data.user) : setLoggedIn(false);
      })
  }, []);

  const handleDisconnect = () => {
    fetch('http://localhost:5500/users/disconnected', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    }).then(() => setLoggedIn(false))
  }


    return (<>
        {(load) ? <h1>Loading ... </h1> : <>
          {(loggedin === false) ? <Navigate to='/' /> : ''}
            <div>
              <h1>Welcome {user?.name}</h1>
              <button href='#' className='btn-primary' onClick={handleDisconnect}>Logout</button>
            </div></>}
      </>
    )
}
