function Initiate () 
{
    fetch("http://vacsina.servegame.com:8000/", 
    {
        method: 'get',
        mode: 'cors',
        /* body: JSON.stringify(user), */
        headers: { 'Content-Type': 'application/json' }
    })
    .then((resp) => resp.json())
    .then(function (data) {
        //console.log('Request succeeded with JSON response', data);
        console.log(data);
        //window.parent.SetUserID(data);
        //CreateCookie(data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    }); 
    /* const user = {"user":username, "pass":password};
    fetch("http://vacsina.servegame.com:8000/user", 
    {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((resp) => resp.json())
    .then(function (data) {
        //console.log('Request succeeded with JSON response', data);
        console.log(data);
        window.parent.SetUserID(data);
        //CreateCookie(data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    }); */
}

Initiate ();