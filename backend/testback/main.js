function Initiate () 
{
    fetch("http://vacsina.servegame.com:8000/login", 
    {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({user:document.getElementById("username").value, pass:document.getElementById("password").value}),
        headers: { 'Content-Type': 'application/json' }
    })
    //.then((resp) => resp.json())
    .then(function (response) {

        if(response.status!==200 && response.status!==202)
        {
           throw new Error(response.status)
        }
        console.log(response);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}

document.getElementById("login").onclick = Initiate;