const port = 8000;
const path = __dirname;

const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

//console.log(__dirname);

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync(`${__dirname}/backend.key`),
    cert: fs.readFileSync(`${__dirname}/backend.crt`)
};

const { ranking } = require('./scripts/gamecore');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

/* app.use('/', express.static(`${__dirname}/testback/`)); */

const user = require(`${__dirname}/scripts/user`);
const game = require(`${__dirname}/scripts/gamecore`);

//Criar usuario
app.post("/newuser", user.CreateUser);

//Login usuario
app.post("/login", user.RequestUser);

//Ranking usuarios
app.get("/ranking/:top", game.ranking);

//Dados usuario (vida, estagio, pontos)
app.get("/:userData/user", user.VerifySession, user.UserData);

//Resetar dados usuario
app.post("/:userData/reset", user.VerifySession, user.UserReset);

//Pegar estoque de itens
app.get("/:userData/stock", user.VerifySession, game.SortStock);

//Pegar receita de itens
app.get("/:userData/recipe", user.VerifySession, game.CreateRecipe);

//Checar receita de itens
app.post("/:userData/recipe", user.VerifySession, game.VerifyRecipe);

//Pegar uma poção aleatória
app.get("/:userData/potion", user.VerifySession, game.sortPotion);

//app.listen(port, )

https.createServer(options, app).listen(port, () => {console.log(`Servidor iniciado em ${port}`)});