const fs = require('fs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = __dirname.replace("scripts", "data/");
const cryptokey = "m4C4c0-Qu3r-b4n4N4";

const users = JSON.parse(fs.readFileSync(path+"users.json"));
const search = Search ();
function Search () {
    function Name (name){
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
    return { Name };
}

function NewUser (_name, _pass)
{
    const user = 
    {
        "name":_name,
        "pass":_pass,
        stage:0,
        slot:0,
        points:0
    };

    users.push(user);
    fs.writeFile(path+"users.json", JSON.stringify(users), (e) => {console.log(`O usuario ${user.name} foi criado`)});
    return user;
}

function CreateSession (userid, res)
{
    const token = jwt.sign({userid:userid}, cryptokey, {expiresIn:300});
    res.cookie("userData", token);
}

function VerifySession (req, res, next)
{
    const token = req.cookies["userData"];
    //console.log(token);
    jwt.verify(token, cryptokey, (err, decoded) => 
    { // //
        if(err) return res.json({});//redirect("../test/login.html");//.status(401).end();
        console.log(`${req.ip} : ${users[decoded.userid].name} foi autenticado!`);
        req.userid = decoded.userid;
        CreateSession(req.userid, res);
        next();
    });
}

function CheckUser (user)
{
    const userid = search.Name(user.user);
    if(userid == -1) return -1;
    const u = users[userid];
    if(u.pass != user.pass)
    {
        return -2;
    }
    return userid;
}

function RequestUser (req, res) 
{
    const user = {user:req.body["user"], pass:req.body["pass"]};
    const id = CheckUser(user);
    //console.log(id);
    if(id == -1) {
        //res.status(404).end();
        
        console.log(`${req.ip} : ${user.user} não existe!`);
        res.json(1);
        /* res.redirect("../test/register.html"); */
        return;
    }
    if(id == -2) {
        //res.status(404).end();
        
        console.log(`${req.ip} : ${user.user} digitou a senha errada!`);
        res.json(2);
        return;
    }
    CreateSession(id, res);
    //res.redirect("/stage");
    res.json(0);
    //res.json({p:"Login Sucess"});
}

function CreateUser (req, res) 
{
    const user = {name:req.body["user"], pass:req.body["pass"]};
    if(search.Name(user.name) != -1)
    {
        console.log(`${req.ip} : ${user.name} já existe!`);
        res.json(1);
        return;
    }

    NewUser(user.name, user.pass);
    res.json(0);
}

module.exports = 
{
    users,
    search,
    RequestUser,
    CreateUser,
    CreateSession,
    VerifySession,
};