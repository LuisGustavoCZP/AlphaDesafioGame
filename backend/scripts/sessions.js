const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sessionkey = "m4C4c0-Qu3r-b4n4N4";
const sessions = [];
let sessionsCount = 0;

function search (key)
{
    let s = undefined;
    sessions.forEach(session => 
    {
        if(session.key == key) {
            s = session;
            return session;
        }
    });
    return s;
}

function create (userid, res)
{
    //const cookiedata = { domain: 'localhost:8080', path: '/admin', secure: true, expiresIn:300};
    
    const session = 
    {
        "id":sessions.length,
        "key":sessionsCount++,
        "userid":userid
    };
    const token = jwt.sign({key:session.key}, sessionkey); //, { expiresIn:300 }
    
    sessions.push(session);
    /* console.log(sessions);
    console.log(token); */
    res.json({"sessionData":token});

    return session;
}

function verify (req, res, next, condition) //req, res, next
{
    const token = req.params["sessionData"];
    
    jwt.verify(token, sessionkey, (err, decoded) => 
    { 
        if(err) {
            res.json(null);
            return;
        }
        else
        {
            /* console.log(decoded.key); */
            const session = search(decoded.key);
            //console.log(session);
            if(session)
            {
                /* console.log(`${session.userid} logou na sessao ${session.key}`); */
                req.session = session;
                next();
            }
            else 
            {
                res.json(null);
            }
        }
    });
}

module.exports = 
{
    verify,
    create
}