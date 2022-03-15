const port = 8000;
const path = __dirname;
const root = path.slice(0, path.lastIndexOf("\\"));
//console.log(path, root);
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

//console.log(__dirname);

// Carrega o certificado e a key necessários para a configuração.
const options = {
    key: fs.readFileSync(`${root}/security/cert.key`, 'utf8'),
    cert: fs.readFileSync(`${root}/security/cert.pem`)
};

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());//{credentials: true, origin: 'http://localhost:8080'}

/* app.use('/', express.static(`${__dirname}/testback/`)); */

const player = require(`${path}/scripts/player`);
const game = require(`${path}/scripts/gamecore`);

//Criar usuario
app.post("/newuser", player.register);

//Login usuario
app.post("/login", player.login);

//Dados usuario (vida, estagio, pontos)
app.get("/:sessionData/user", player.verifySession, player.playerData);

//Resetar dados usuario
app.post("/:sessionData/reset", player.verifySession, player.playerReset);

//Pegar receita de itens
app.get("/:sessionData/recipe", player.verifySession, game.createRecipe);

//Checar receita de itens
app.post("/:sessionData/recipe", player.verifySession, game.verifyRecipe);

//Pegar uma poção aleatória
app.get("/:sessionData/potion", player.verifySession, game.sortPotion);

//Ranking usuarios
app.get("/ranking/:top", game.ranking);

//Pegar o estoque em ordem aleatória
app.get("/:sessionData/stock", player.verifySession, game.craft.stock);

//livro
app.get("/:sessionData/book", player.verifySession, game.craft.book);

//Pegar o estoque em ordem aleatória
app.get("/:sessionData/stages", player.verifySession, game.craft.userstages);

//Iniciar estagio, retornando uma receita temporizada
app.get("/:sessionData/stage/", player.verifySession, game.craft.stageStart);

//Finaliza estagio, recebendo os itens e retornando a poção com um valor
app.post("/:sessionData/stage/", player.verifySession, game.craft.stageUpdate);

//app.listen(port, )

https.createServer(options, app).listen(port, () => {console.log(`Servidor iniciado em ${port}`)});