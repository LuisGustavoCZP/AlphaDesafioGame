const fs = require('fs');
const crypto = require('crypto');
const userpath = __dirname + "/data/";
const session = require(__dirname+'/sessions');
const prefab = JSON.parse(fs.readFileSync(__dirname+"/starting.json"));
const users = {};
const highscores = [];
const matchs = {
    "4fabe25e-7ef4-4daf-9133-5baf466672b6":
    {
        "userid":"4fabe25e-7ef4-4daf-9133-5baf466672b6",
        "jobs":
        [
            {"potion":"p0", "expire-time":100309},
            {"potion":"p1", "expire-time":100309},
        ],
        "backpack":[],
        "startedTime":0,
        "timeAmount":1
    }
};

/* delete matchs["4fabe25e-7ef4-4daf-9133-5baf466672b6"]; */
function loadUserFiles ()
{
    if(!fs.existsSync(userpath)) fs.mkdirSync(userpath);
    const userFiles = fs.readdirSync(userpath);
    console.log(`Carregando usuarios \n${userFiles}`);
    return userFiles;
}

function loadUsers (..._userFiles)
{
    _userFiles.forEach(file => {
        const user = JSON.parse(fs.readFileSync(userpath+file));    
        users[user.id] = user;
        highscores.push({classification:highscores.length+1, name:user.name, highscore:user.points});
    });
    highscores.sort((a, b) => b.highscore - a.highscore);
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
    const user = {name:_name};
    Object.assign({}, JSON.parse(JSON.stringify(prefab)))
    /* const keys = Object.keys(prefab);
    keys.forEach(key => {
        user[key] = prefab[key];
    }); */
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
    
    console.log(`${req.ip} : ${user.name} realizou login na sessão ${session.create(id, res).id}.`);
    //res.json();
}

function addRank2 (user){
    let n = undefined
    let r = undefined;
    const newRank = {name:user.name, highscore:user.points};
    for(let i = 0; i < highscores.length; i++)
    {
        const rank = highscores[i];
        const higher = newRank.highscore < rank.highscore;
        if(newRank.name == rank.name) r = i;
        if(higher) {
            n = i+1;
        }
        if(!higher && r) break;
    } //highscores[i].highscore = user.highscore;

    highscores.splice(r, 1);

    if(!n) highscores.unshift(newRank);
    else { 
        const rest = highscores.length-(n);
        //console.log(n, rest);
        const lastones = highscores.splice(n, rest, newRank);//
        if(lastones.length > 0) highscores.push(lastones);
    }
}

function addRank (user){
    let n = undefined
    let r = undefined;
    const newRank = {name:user.name, highscore:user.points};
    for(let i = 0; i < highscores.length; i++)
    {
        const rank = highscores[i];
        if(newRank.name == rank.name) {
            r = i;
            highscores.splice(r, 1);
            break;
        }
    } //highscores[i].highscore = user.highscore;

    highscores.push(newRank);
    highscores.sort((a,b) => b.highscore - a.highscore);
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
    res.json({name:p.name, points:p.points, highscore:p.highscore, tutorial:p.tutorial});
}

function playerReset (req, res)
{
    const p = users[req.session.userid];
    p.stage = 0;
    p.points = 0;
    saveUsers();
    res.json({name:p.name, stage:p.stage, points:p.points, highscore:p.highscore});
}

async function ranking (req, res)
{
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    const theBest = Number(req.params.top);
    
    if(isNumber(theBest)){
        if(Number.isInteger(theBest)){
            /* const ordened = users.sort((a,b) => b.highscore - a.highscore);
            const topRanking = ordened.map(function (element , index){
                if(index < theBest){
                return {classification: index+1 , name: element.name , highscore: element.highscore}
                }
            
            })
            topRanking.splice(theBest, topRanking.length - theBest); */
            res.json(highscores.slice(0, theBest));
        }else{
            res.json("The router params is not a intenger");
        }
        
    }else{
        res.json("The router params is not a number");
    }
}
console.log(users)
module.exports = 
{
    users,
    search,
    save,
    register,
    login,
    verifySession,
    playerData,
    playerReset,
    ranking,
    addRank
};