##README

## Game Project Backend

## DATABASE

* potions.json -> Array em que cada posição representa a fase do jogo EX: potions[0] é a fase mais fácil, e cada posição do array temos outro array com as poçoes, os diretorios dos seus respectivos ícones, e um array contendo o index de seus componentes que estão no banco de dados ingredients.
- Nome de item, ingredientes e diretorios de cada um, no formato: (A Definir)
[{
  components: [0, 4, 3],
  icon: "resources/ingredients/Potion (1).png",
  potionName: "Poção do Sono"
  *onfinish: (finish) => {}
},
{
  icon: "resources/ingredients/passionfruit.png",
  name: "Maracujá"
}, {
  icon: "resources/ingredients/spiderweb.png",
  name: "Teia de Aranha"
}, {
  icon: "resources/ingredients/sliced-tomato.png",
  name: "Tomate"
}]

* ingredients.json -> contém um banco de dados com todos os ingredientes possíveis para fazer as poções do jogo, e os diretorios para seus respectivos ícones

* users.json -> 

## ROUTES

# app.get("/initialpage") 
-> 

# app.post("/newuser", user.CreateUser)
-> Requisição do tipo POST para cadastrar um novo usuário no banco de dados, resposta 0 = sucesso e 1 = fracasso.
Ex: {"name":"nome","pass":"1234","stage":0,"slot":0,"points":0}

# app.get("/login", user.RequestUser) 
-> Requisição do tipo GET para fazer o login do jogo. retornando um valor do usuário com o sucesso ou fracasso da requisição (0 = sucesso / 1 = nao existe / 2 = senha incorreta).

# app.get("/userData", user.VerifySession, user.UserData) 
-> Requisição do tipo GET para receber os dados de nome (*e título?) da base de dados users.json

# app.get("/userData", user.VerifySession, user.UserData) 
-> Requisição do tipo GET para receber os dados de stagio, rodada e pontuação e poção atual do usuario

# app.get("/recipe", user.VerifySession, game.Start) 
-> Requisição do tipo GET para requisitar aleatoriamente a poção e itens referentes a ela de acordo com cada fase, a rota deve retornar um objeto com a poção e os itens sorteados

# app.post("/result", user.VerifySession, game.Check) 
-> Requisição do tipo POST para checar a sequencia recebida e alterar os dados de pontuação do usuario

# app.get("/ranking/:top", users.RequestUser)
-> requisição do tipo GET para obter as (top = 5) 5 maiores pontuações do banco de dados users.json

# app.get("/:userData/item", user.VerifySession, game.VerifyRecipe, game.SortItem);


# app.get("/:userData/potion", user.VerifySession, game.VerifyRecipe, game.sortPotion);
-> requisição do tipo GET para obter um objeto com as características e rota da poção sorteada;

# app.get("/book", user.VerifySession, game.userBook);
-> Requisição do tipo GET para obter o nome das poções, a rota do icone da poção, e um array com os ícones dos ingredientes de cada poção

## OBS:






