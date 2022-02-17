const port = 8000;
const path = __dirname;

const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/test', express.static('./testback'));

const database = require("./scripts/database.js");
const users = require("./scripts/users.js");

app.get("/", (req, res) => 
{
    console.log(`Conexão ${req.ip} iniciada...`);
    res.json(users.users);
});

app.get("/newuser", users.CreateUser);
app.get("/login", users.RequestUser);

app.get("/stage", users.VerifySession, (req, res) => 
{
    //console.log(req.params);
    //console.log(req.cookies);
    res.json({userid:req.userid});
    /* if(req.cookies.userData && !users.VerifySession(req.cookies.userData))
    {
        console.log(req.cookies);
        res.status(404);
    } */
    /* return; */
    //res.json({"potions":database.SortPotions(parseInt(req.params["stage"]))});
});

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})
