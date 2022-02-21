function RequestSys (url="http://vacsina.servegame.com:8000/") 
{
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

    function get (path, callback, error = () => {}, infos = undefined){
        const query = infos ? createQuery(infos) : "";
        fetch(`${url}${path}${query}`, 
        {
            method: 'get',
            mode: 'cors',
        })
        .then((resp) => resp.json())
        .then(resp => 
        {
            if(verifySession(resp)) throw resp;
            callback(resp);
        })
        .catch(resp => { error (resp); });
    }

    function verifySession (resp) 
    {
        console.log(resp);
        if(resp == null) {
            return false;
        }
        return true;
    }

    return { post, get };
}

const Request = RequestSys ();

export { Request, RequestSys };