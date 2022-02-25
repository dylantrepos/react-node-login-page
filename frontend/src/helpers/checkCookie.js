export const checkCookie = fetch('http://localhost:5500/users/login', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
        })
            .then(res => res.json())
            .then(res => { 
                if(res.user) return (res)
                else  return(false) }
            )       
