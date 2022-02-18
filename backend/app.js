const port = 8000;
const path = __dirname;

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/test/', express.static(`${__dirname}/testback/`));

const database = require("./scripts/database.js");
const users = require("./scripts/users.js");

app.get("/", (req, res) => 
{
    console.log(`Conexão ${req.ip} iniciada...`);
    res.json(users.users);
});

app.post("/newuser", users.CreateUser);
app.post("/login", users.RequestUser);
app.get("/user", users.VerifySession, users.UserData);
app.get("/stage", users.VerifySession, (req, res) => 
{
    res.json({userid:req.userid});
});

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})
