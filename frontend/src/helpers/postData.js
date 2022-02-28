/**
 * Helper to send or post data
 */
export const postData = async (type, url, data) => {
        
    const response = await fetch(url, {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(() => {
        type === 'POST' ? console.log("Sended with success !") : console.log("Get with success !");
    }).
       catch((err) => console.error(`Error creating user with the form : ${err}`));
}