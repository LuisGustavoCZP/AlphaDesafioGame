##README

## Game Project Backend

## DATABASE

* potions.json -> Array em que cada posição representa a fase do jogo EX: potions[0] é a fase mais fácil, e cada posição do array temos outro array com as poçoes, os diretorios dos seus respectivos ícones, e um array contendo o index de seus componentes que estão no banco de dados ingredients.

* ingredients.json -> contém um banco de dados com todos os ingredientes possíveis para fazer as poções do jogo, e os diretorios para seus respectivos ícones

* users.json -> 

## ROUTES

# app.get("/initialpage") 
-> 

# app.post("/newuser", users.CreateUser)
-> Requisição do tipo POST para cadastrar um novo usuário no banco de dados.

# app.get("/login", users.RequestUser) 
-> Requisição do tipo GET para fazer o login do jogo. retornando um objeto {stage: "", slot: "", points: ""} do usuário com o sucesso da requisição.

# app.get("/playgame", users.RequestUser) 
-> Requisição do tipo GET para requisitar aleatoriamente as poções e itens referentes a elas de acordo com cada fase, a rota deve retornar um array com o nome das poções, ingredientes e diretorios de cada um, no formato: (A Definir)
[{
  components: [0, 4, 3],
  icon: "resources/ingredients/Potion (1).png",
  potionName: "Poção do Sono"
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

# app.post("/playgame", users.RequestUser) 
-> Requisição do tipo POST para alterar os dados de pontuação e fase da base de dados users.json

# app.get("/ranking", users.RequestUser)
-> requisição do tipo GET para obter as 5 maiores pontuações do banco de dados users.json

## OBS:






