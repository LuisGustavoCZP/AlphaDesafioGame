const fs = require('fs');
const jwt = require('jsonwebtoken');
/* const crypto = require('crypto') */
const path = __dirname.replace("scripts", "data/");
const sessionkey = "m4C4c0-Qu3r-b4n4N4";
const passCriptoOption = {
    algoritm: "aes256",
    secret: "aS3Nh4-3H-F0d4",
    type: "hex"
}

const users = JSON.parse(fs.readFileSync(path+"users.json"));
const search = searchConstructor ();

function searchConstructor () {
    function name (name){
        for(let userid = 0; userid < users.length; userid++)
        {
            const user = users[userid];
            //console.log(`${user.name} == ${name} ? ${userid}`);
            if(user.name == name)
            {
                return userid;
            }
        }
        return -1;
    }
    return { name };
}

function saveUsers (callback = (x) => {}){
    fs.writeFile(path+"users.json", JSON.stringify(users), callback);
}

function newUser (_name, _pass)
{
    const user = 
    {
        "name":_name,
        "pass":criptoPass(_pass),
        stage:1,
        lives:3,
        points:0,
        highscore:0
    };

    users.push(user);
    saveUsers((e) => {console.log(`O usuario ${user.name} foi criado`)});
    return user;
}
/* 
function criptoPass (pass)
{
    const cipher = crypto.createCipher(passCriptoOption.algoritm, passCriptoOption.secret);
    cipher.update(pass);
    return cipher.final(passCriptoOption.type);
} */

function createSession (userid, res)
{
    //const cookiedata = { domain: 'localhost:8080', path: '/admin', secure: true, expiresIn:300};
    const token = jwt.sign({userid:userid}, sessionkey); //, { expiresIn:300 }
    res.json({"userData":token});
}

function verifySession (req, res, next)
{
    const token = req.params["userData"];
    //console.log(token);
    jwt.verify(token, sessionkey, (err, decoded) => 
    { 
        if(err) {
            res.json(null);
            return;
        }
        else {
            
            if(decoded.userid >= users.length)
            {
                res.json(null);
            } else {
                console.log(`${req.ip} : ${users[decoded.userid].name} foi autenticado!`);
                req.userid = decoded.userid;
                //CreateSession(req.userid, res);
                next();
            }
        }
    });
}

function checkUser (user)
{
    const userid = search.name(user.user);
    if(userid == -1) return -1;
    if(userid >= users.length) return -1;
    const u = users[userid];
    /* if(u.pass != criptoPass(user.pass))
    {
        return -2;
    } */
    return userid;
}

function requestUser (req, res) 
{
    const user = {user:req.body["user"], pass:req.body["pass"]};
    const id = checkUser(user);
    //console.log(id);
    if(id == -1) {
        console.log(`${req.ip} : ${user.user} não existe!`);
        res.json(1);
        return;
    }
    if(id == -2) {
        console.log(`${req.ip} : ${user.user} digitou a senha errada!`);
        res.json(2);
        return;
    }
    
    console.log(`${req.ip} : ${user.user} realizou login.`);
    createSession(id, res);
    //res.json();
}

function createUser (req, res) 
{
    const user = {name:req.body["user"], pass:req.body["pass"]};
    if(search.name(user.name) != -1)
    {
        console.log(`${req.ip} : ${user.name} já existe!`);
        res.json(1);
        return;
    }

    newUser(user.name, user.pass);
    res.json(0);
}

function get (id)
{
    return users[id];
}

function userData (req, res)
{
    const p = users[req.userid];
    res.json({name:p.name, stage:p.stage, lives:p.lives, points:p.points, highscore:p.highscore});
}

function userReset (req, res)
{
    const p = users[req.userid];
    p.stage = 1;
    p.lives = 3;
    p.points = 0;
    saveUsers();
    res.json({name:p.name, stage:p.stage, lives:p.lives, points:p.points, highscore:p.highscore});
}

module.exports = 
{
    get,
    search,
    requestUser,
    createUser,
    userData,
    userReset,
    createSession,
    verifySession,
    saveUsers,
    users,
};