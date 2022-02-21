/* import { json } from "express"; */

function RequestSys (url="http://vacsina.servegame.com:8000/") 
{
    function createQuery (infos) {
        if(!infos) return "";
        const infokeys = Object.keys(infos);
        if(infokeys.length == 0) return "";
        let query = "?";
        infokeys.forEach((key, i) => 
        {
            query += `${i>0?"&":""}${key}=${infos[key]}`;
        });
        console.log(query);
        return query;
    }

    function createParams (infos) {
        
        console.log(infos);
        if(!infos) return "";
        const infokeys = Object.keys(infos);
        if(infokeys.length == 0) return "";
        let params = "";
        infokeys.forEach((key, i) => 
        {
            params += `${infos[key]}`;
        });
        console.log(params);
        return params;
    }

    function post (body, onsucess, onerror){
        fetch(`${url}login`, 
        {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((resp) => resp.json())
        .then(onsucess)
        .catch(onerror);
    }

    function get (path, info, onsucess, onfail)
    {
        const urlFinal = info ? `${url}${createParams(info.params)}/${path}/${createQuery(info.query)}` : `${url}${path}/`;
        console.log(urlFinal);
        fetch(urlFinal, 
        {
            method: 'get',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((resp) => resp.json())
        .then(resp => 
        {
            if(verifySession(resp)) { 
                console.log(resp);
                onsucess(resp); 
            } else onfail (resp);
        })
        .catch(resp => { console.log(resp);});
    }

    function verifySession (resp) 
    {
        //console.log(resp);
        if(resp == null) {
            return false;
        }
        return true;
    }

    return { post, get };
}

const Request = RequestSys ();

export { Request, RequestSys };