const port = 8000;
const path = __dirname;

const express = require('express');
const cors = require('cors');
/* const cookieParser = require('cookie-parser'); */
const { ranking } = require('./scripts/gamecore');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
/* app.use(cookieParser()); */


app.use('/', express.static(`${__dirname}/testback/`));

const user = require(`${__dirname}/scripts/user`);
const game = require(`${__dirname}/scripts/gamecore`);

app.post("/newuser", user.CreateUser);
app.post("/login", user.RequestUser);

app.get("/ranking/:top", game.ranking);

app.get("/:userData/user", user.VerifySession, user.UserData);
app.post("/:userData/reset", user.VerifySession, user.UserReset);
app.get("/:userData/stock", user.VerifySession, game.SortStock);
app.get("/:userData/recipe", user.VerifySession, game.CreateRecipe);
app.post("/:userData/recipe", user.VerifySession, game.VerifyRecipe);
app.get("/:userData/item", user.VerifySession, game.VerifyRecipe, game.SortItem);
app.get("/:userData/potion", user.VerifySession, game.VerifyRecipe, game.sortPotion);

app.listen(port, () => {console.log(`Servidor iniciado em ${port}`)})
