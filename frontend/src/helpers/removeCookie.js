/**
 * Delete cookie from web navigator
 */
export const removeCookie = () => {
    fetch('https://test-back-office-api.herokuapp.com/users/disconnected', {
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include'
            }).catch(err => console.error('Error removing cookie : ' + err))
}
  