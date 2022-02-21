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


app.use('/', express.static(`${__dirname}/testback/`));

const user = require(`${__dirname}/scripts/user`);
const game = require(`${__dirname}/scripts/gamecore`);

/* app.get("/", (req, res) => 
{
    console.log(`Conexão ${req.ip} iniciada...`);
    res.json(user.users);
}); */

app.post("/newuser", user.CreateUser);
app.post("/login", user.RequestUser);

app.get("/user", user.VerifySession, user.UserData);

/* 
app.get("/stage", user.VerifySession, game.Start);
app.post("/stage", user.VerifySession, game.VerifyRecipe, game.End); */

app.get("/stock", user.VerifySession, game.SortStock);
app.get("/recipe", user.VerifySession, game.CreateRecipe);
app.get("/item", user.VerifySession, game.VerifyRecipe, game.SortItem);

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})
