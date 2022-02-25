import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/signUp.scss';


export default function Connected() {

  const [loggedin, setLoggedIn] = useState(null)
  const [user, setUser] = useState(false)

  useLayoutEffect(() => {
    const test = fetch('http://localhost:5500/users/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
        .then(res => res.json())
        .then(res => {
          if(res.user) {
            setLoggedIn(true)
            setUser(res.user)
          } else {
            setLoggedIn(false)
          } 
        })
}, []);

  const handleDisconnect = () => {
    fetch('http://localhost:5500/users/disconnected', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
        .then(res => {
          setLoggedIn(false)
        })
  }


  return (<>
      {(loggedin === false) ? <Navigate to='/' /> : ''}
    <div>
      <h1>Welcome {user.name}</h1>
      <button href='#' className='btn-primary' onClick={handleDisconnect}>Logout</button>
    </div>
    </>
  )
}
