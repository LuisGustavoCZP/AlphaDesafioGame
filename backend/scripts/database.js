const fs = require('fs');
const path = __dirname.replace("scripts", "data/");

//const stages = JSON.parse(fs.readFileSync(path + "stages.json"));
//const recipes = JSON.parse(fs.readFileSync(path + "recipes.json"));
const items = JSON.parse(fs.readFileSync(path + "ingredients.json"));
const potions = JSON.parse(fs.readFileSync(path + "potions.json"));
const users = JSON.parse(fs.readFileSync(path + "users.json"));

//potions retorna um array onde cada posição dele contém as poções referentes à um nível 
//Ex: potions[0] = dados das poções do nível 1
// potions[1] = dados das poções do nível 2
// por enquanto só são necessários 3 banco de dados (potions, ingredients, users)


function randomSort(_items) {
   const numero = _items.length;
   return parseInt(Math.random() * numero);
}

// sort components retorna um array com as informações dos ingredientes no formato:
/* [{
   icon: "resources/ingredients/passionfruit.png",
   name: "Maracujá"
 }, {
   icon: "resources/ingredients/spiderweb.png",
   name: "Teia de Aranha"
 }] */
 function sortComponentsAleatory(_stage) {
   const total_components = [...items];
   console.log(total_components)
   const componentsID = [];
   const components = [];
   for(let i=0; i < _stage+2 ; i++){
      componentsID.push(randomSort(total_components));
      while(componentsID[i] === componentsID[i-1]){
         componentsID[i] = (randomSort(total_components));
      }
      components.push(total_components[componentsID[i]]);
    }
    return components;
 }



//função que recebe o nome do usuário e altera o banco de dados se ele passar de fase e verifica a pontuação máxima dele
//retorna os dados:  (name), (points), (stage) e (highscore) do usuário
function upStage(_userid){
   const userId = _userid;
   const database = [...users];
   let userUp = {};
   database.forEach( (element, index) => {
      if(element.id === userId ){
         element.points += 50*element.stage + element.points;
         element.stage += 1;
         
         if(element.points > element.highscore){
            element.highscore = element.points;
         }

         userUp = {name: element.name , points: element.points , stage: element.stage , highscore: element.highscore}
      }
   });
   fs.writeFileSync("database.json", JSON.stringify([...database]));

   return userUp
}

module.exports = { sortComponentsAleatory, randomSort, upStage};
