const port = 8000;
const path = __dirname;
//console.log(path, root);
const express = require('express');
const cors = require('cors');
const https = require('https');
const rPath = require('path');
const fs = require('fs');
const { verify } = require('crypto');
const { database } = require('./modules/core');
const admin = require(`${__dirname}/modules/database/admin.js`);

//console.log(__dirname);
const root = rPath.dirname(path);
// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync(`${root}/security/cert.key`, 'utf8'),
    cert: fs.readFileSync(`${root}/security/cert.pem`)
};

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
const game = require(`${path}/modules/core`);
const player = game.player;
//Criar usuario
app.post("/newuser", player.register);

//Login usuario
app.post("/login", player.login);

//Dados usuario (vida, estagio, pontos)
app.get("/:sessionData/user", player.verifySession, player.playerData);

app.post("/:sessionData/verifyRecipe", player.verifySession, game.verifyRecipe);

app.get("/admin", admin.getData);

//Ranking usuarios
app.get("/ranking/:top", player.ranking);

//Pegar o estoque em ordem aleatória
app.get("/:sessionData/stock", player.verifySession, game.stock);

//livro
app.get("/:sessionData/book", player.verifySession, game.book);

//dialogo aleatorio
app.get("/:sessionData/dialog/random", player.verifySession, game.randomDialog);

//dica aleatória
app.get("/:sessionData/dialog/tip", player.verifySession, game.randomTip);

https.createServer(options, app).listen(port, () => {console.log(`Servidor iniciado em ${port}`)});

//Recebe os itens e retornando a poção com um valor
/* app.post("/:sessionData/combine", player.verifySession, game.combine); */

/* //Pegar o estoque em ordem aleatória
app.get("/:sessionData/stages", player.verifySession, game.userstages); */

//Iniciar estagio, retornando uma receita temporizada
/* app.get("/:sessionData/stage/prepare", player.verifySession, game.stagePrepare);

//Iniciar estagio, retornando uma receita temporizada
app.get("/:sessionData/stage/", player.verifySession, game.stageStart);

//Finaliza estagio, recebendo os itens e retornando a poção com um valor
app.post("/:sessionData/stage/", player.verifySession, game.stageUpdate); */

//app.listen(port, )/* app.use('/editor', express.static(`${__dirname}/funcao/index4.html`)); */
/* //Pegar receita de itens
app.get("/:sessionData/recipe", player.verifySession, game.createRecipe);

//Checar receita de itens
app.post("/:sessionData/recipe", player.verifySession, game.verifyRecipe);

//Pegar uma poção aleatória
app.get("/:sessionData/potion", player.verifySession, game.sortPotion); */
//Resetar dados usuario
/* app.post("/:sessionData/reset", player.verifySession, player.playerReset); */
//{credentials: true, origin: 'http://localhost:8080'}

//const player = require(`${path}/scripts/player`);