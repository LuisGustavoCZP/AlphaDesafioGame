const fs = require('fs');
const crypto = require('crypto');
const session = require('./sessions');
const userpath = __dirname.replace("scripts", "data2/users/");

const users = {};

function loadUserFiles ()
{
    const userFiles = fs.readdirSync(userpath);
    console.log(`Carregando usuarios \n${userFiles}`);
    return userFiles;
}

function loadUsers (..._userFiles)
{
    _userFiles.forEach(file => {
        const user = JSON.parse(fs.readFileSync(userpath+file));    
        users[user.id] = user;
    });
    //console.log(users);
}

loadUsers(...loadUserFiles());

function save (_userid, callback = () => {})
{
    const user = users[_userid];
    fs.writeFile(`${userpath}${user.name}.json`, JSON.stringify(user, null, "\t"), callback);
}

function search (_name){
    for(let userid in users)
    {
        const user = users[userid];
        //console.log(`${user.name} == ${name} ? ${userid}`);
        if(user.name == _name)
        {
            return userid;
        }
    }
    return -1;
}

function add (_user)
{
    const id = search(_user.name);

    if(id >= 0) _user.id = id;
    else _user.id = crypto.randomUUID({});
    
    users[_user.id] = _user;
    save(_user.id, (e) => {console.log(`O usuario "[${_user.id}] ${_user.name}" foi criado`)});
}

function create (_name)
{
    const user = 
    {
        name:_name,
        stages:[],
        stage:0,
        lives:3,
        tutorial:false,
        points:0,
        highscore:0
    };
    
    add(user);
    return user;
}

function criptoPass (pass)
{
    const cipher = crypto.createCipher(passCriptoOption.algoritm, passCriptoOption.secret);
    cipher.update(pass);
    return cipher.final(passCriptoOption.type);
}

function check (user)
{
    const userid = search(user.name);
    if(userid == -1) return -1;
    const u = users[userid];
    if(!u) return -1;
    if(u.pass && u.pass != criptoPass(user.pass))
    {
        return -2;
    }
    return userid;
}

function register (req, res)
{
    const user = {name:req.body["user"]};
    if(search(user.name) != -1)
    {
        console.log(`${req.ip} : ${user.name} já existe!`);
        res.json(1);
        return;
    }

    create(user.name);
    res.json(0);
}

function login (req, res)
{
    const user = {name:req.body["user"], pass:req.body["pass"]};
    const id = check(user);       
    //console.log(id);
    if(id == -1) {
        console.log(`${req.ip} : ${user.name} não existe!`);
        res.json(1);
        return;
    }
    if(id == -2) {
        console.log(`${req.ip} : ${user.name} digitou a senha errada!`);
        res.json(2);
        return;
    }
    
    console.log(`${req.ip} : ${user.name} realizou login.`, session.create(id, res));
    //res.json();
}

function verifySession (req, res, next)
{
    session.verify(req, res, next, (id) => 
    {
        return users[id];
    });
}

function playerData (req, res)
{
    const p = users[req.session.userid];
    res.json({name:p.name, stage:p.stage, lives:p.lives, points:p.points, highscore:p.highscore, tutorial:p.tutorial});
}

function playerReset (req, res)
{
    const p = users[req.session.userid];
    p.stage = 0;
    p.lives = 3;
    p.points = 0;
    saveUsers();
    res.json({name:p.name, stage:p.stage, lives:p.lives, points:p.points, highscore:p.highscore});
}

module.exports = 
{
    users,
    search,
    save,
    register,
    login,
    verifySession,
    playerData,
    playerReset
};