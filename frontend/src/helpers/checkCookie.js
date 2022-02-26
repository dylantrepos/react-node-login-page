/**
 * Check if a cookie exists for the user
 */
 export const testCookie = fetch('http://localhost:5500/users/login', {
  headers: {
      'Content-Type': 'application/json'
  },
  credentials: 'include'
  })
      .then(res => res.json())
      .then(res => (res))