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
app.use(cors());//{credentials: true, origin: 'http://localhost:8080'}

/* app.use('/', express.static(`${__dirname}/testback/`)); */

const user = require(`${__dirname}/scripts/user`);
const game = require(`${__dirname}/scripts/gamecore`);

//Criar usuario
app.post("/newuser", user.createUser);

//Login usuario
app.post("/login", user.requestUser);

//Dados usuario (vida, estagio, pontos)
app.get("/:userData/user", user.verifySession, user.userData);

//Resetar dados usuario
app.post("/:userData/reset", user.verifySession, user.userReset);

//Pegar receita de itens
app.get("/:userData/recipe", user.verifySession, game.createRecipe);

//Checar receita de itens
app.post("/:userData/recipe", user.verifySession, game.verifyRecipe);

//Pegar uma poção aleatória
app.get("/:userData/potion", user.verifySession, game.sortPotion);

//Ranking usuarios
app.get("/ranking/:top", game.ranking);

//Pegar o estoque em ordem aleatória
app.get("/:userData/stock", user.verifySession, game.craft.stock);

//livro
app.get("/:userData/book", user.verifySession, game.craft.book);

//Pegar o estoque em ordem aleatória
app.get("/:userData/stages", user.verifySession, game.craft.userstages);

//Iniciar estagio, retornando uma receita temporizada
app.get("/:userData/stage/", user.verifySession, game.craft.stageStart);

//Finaliza estagio, recebendo os itens e retornando a poção com um valor
app.post("/:userData/stage/", user.verifySession, game.craft.stageUpdate);

//app.listen(port, )

https.createServer(options, app).listen(port, () => {console.log(`Servidor iniciado em ${port}`)});