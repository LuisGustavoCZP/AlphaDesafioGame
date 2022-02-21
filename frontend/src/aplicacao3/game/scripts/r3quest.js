function R3questSys (redirect = "menu") 
{
    const url = "http://vacsina.servegame.com:8000/";

    function createQuery (infos) {
        let query = "?";
        Object.keys(infos).forEach((key, i) => {
            query += `${i>0?"&":""}${key}=${infos[key]}`;
        });
        console.log(query);
        return query;
    }

    function post (body, callback, error){
        fetch(`${url}login`, 
        {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((resp) => resp.json())
        .then(callback)
        .catch(error);
    }

    function get (path, callback, infos = undefined, error = ()=>{}){
        const query = infos ? createQuery(infos) : "";
        fetch(`${url}${path}${query}`, 
        {
            method: 'get',
            mode: 'cors',
        })
        .then((resp) => resp.json())
        .then(resp => 
        { 
            if(verifySession(resp))
            {
                callback(resp); 
            }
            else 
            {
                throw resp;
            }
        })
        .catch(error);
    }

    function verifySession (resp) 
    {
        console.log(resp);
        if(resp == null) {
            console.log("Redirecionando para o login");
            window.location.replace(`../${redirect}`);
        }
    }

    return { post, get };
}

const R3quest = R3questSys ();

export { R3quest, R3questSys };