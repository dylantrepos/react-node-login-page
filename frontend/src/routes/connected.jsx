import React, { useEffect, useLayoutEffect, useState } from 'react';
import '../styles/signUp.scss';


export default function Connected() {

  const [test, setTest] = useState('')

  useLayoutEffect(() => {
    const test = fetch('http://localhost:5500/users/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
        .then(res => res.json())
        .then(res => {
          if(res.user) setTest(res.user.name)
        })
}, []);

  const handleDisconnect = () => {
    fetch('http://localhost:5500/users/disconnected', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(res => console.log('res'))
  }


  return (
    <div>
      <h1>Welcome {test}</h1>
      <button href='#' className='btn-primary' onClick={handleDisconnect}>Logout</button>
    </div>
  )
}
