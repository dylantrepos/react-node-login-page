export const postForm = async (data) => {
        
    const response = await fetch('http://localhost:5500/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        console.log("Sended with success !");
    }).
       catch((err) => console.error(`Error creating user with the form : ${err}`));
}