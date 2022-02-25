/**
 * Check if a cookie exists for the user
 */
export const checkCookie =  fetch('http://localhost:5500/users/login', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(data => data.json())
      .then(data => (data))
  