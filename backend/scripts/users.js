const fs = require('fs');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
const path = __dirname.replace("scripts", "data/");
const cryptokey = "m4C4c0-Qu3r-b4n4N4";

const users = JSON.parse(fs.readFileSync(path+"users.json"));

class User 
{
    constructor(_name, _stage, _slot, _points, _key)
    {
        this.name = _name;
        this.stage = _stage;
        this.slot = _slot;
        this.points = _points;
        this.key = _key;//crypto.randomUUID();
    }

    static Load (data)
    {
        return new User(data.name, data.stage, data.slot, data.points, data.key);
    }
}

function NewUser (_name)
{
    const user = new User();
    user.name = _name;
    user.stage = 0;
    user.slot = 0;
    user.points = 0;
    user.key = crypto.randomUUID();

    users.push(user);
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
    {
        if(err) return res.redirect("../test");//.status(401).end();
        console.log(`${decoded.userid} foi autenticado!`);
        req.userid = decoded.userid;
        next();
    });
}

function CheckUser (_user)
{
    //console.log(users);
    for(let userid = 0; userid < users.length; userid++)
    {
        const user = users[userid];
        if(user.name == _user.user && user.pass == _user.pass)
        {
            console.log(_user);
            return userid;
        }
    }
    return -1;
}

function RequestUser (req, res) 
{
    const user = {user:req.query["user"], pass:req.query["pass"]};
    const id = CheckUser(user);
    console.log(id);
    if(id == -1) {
        res.status(404);
        return;
    }
    CreateSession(id, res);
    
    res.json({p:"Login Sucess"});
}

function CreateUser (req, res) 
{
    const user = {user:req.query["user"], pass:req.query["pass"]};
    res.cookie("userData", {user:JSON.stringify(user), signed:users.CreateCookie(user)});
    
    res.json({p:"Login Sucess"});
}

module.exports = 
{
    users,
    User,
    RequestUser,
    CreateUser,
    CreateSession,
    VerifySession,
};