/**
 * Delete cookie from web navigator
 */
export const removeCookie = () => {
    fetch('http://localhost:5500/users/disconnected', {
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include'
            }).catch(err => console.error('Error removing cookie : ' + err))
}
  