export const handleDisconnect = fetch('http://localhost:5500/users/disconnected', {
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include'
                }).then(res => { return ({disconnected: true}) })
  