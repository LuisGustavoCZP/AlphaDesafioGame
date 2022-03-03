const fs = require('fs');
const path = __dirname.replace("scripts", "data/");
const Utility = require(`${__dirname}/utility`);

//const recipes = JSON.parse(fs.readFileSync(path + "recipes.json"));
const items = JSON.parse(fs.readFileSync(path + "ingredients.json"));
const potions = JSON.parse(fs.readFileSync(path + "potions.json"));
const users = JSON.parse(fs.readFileSync(path + "users.json"));
const stages = JSON.parse(fs.readFileSync(path + "stages.json"));

//potions retorna um array onde cada posição dele contém as poções referentes à um nível 
//Ex: potions[0] = dados das poções do nível 1
// potions[1] = dados das poções do nível 2
// por enquanto só são necessários 3 banco de dados (potions, ingredients, users)

function getStage(id) {
   return stages[id];
}

function getItem(...ids) {
   return ids.map((id) => { return items[id] });
}

//getbook ainda esta em desenvolvimento
function getBook(userStage) {
   const potionsOfBook = []
   stages.forEach((element) => {
      if (element.stage <= userStage) {
         potionsOfBook.push(...element.potions);
      }
   });
   let recipes = [];
   const potionsAndRecipes = [];
   potions.forEach((element) => {
      potionsOfBook.forEach((item) => {
         if (item === element.name) {
            recipes.push(element.recipe)
            potionsAndRecipes.push({ name: element.name, icon: element.icon, recipe: element.recipe })
         }
      });
   });

   let recipeIcons = [];
   for (let i = 0; i < recipes.length; i++) {
      const quant = recipes[i].length;
      for (let j = 0; j < quant; j++) {
         items.forEach((element) => {
            if (element.id === recipes[i][j]) {
               recipeIcons.push(element.icon);
            }
         });

      }
   }

}

// sortia a poção e retorna um objeto {name: , icon: , recipe: }
function sortPotion(fase) {

   let sortPotion = "";

   stage.forEach((element) => {
      if (element.stage === fase) {
         const potionsStage = element.potions;
         const potionsStageLength = potionsStage.length;
         const sortPotionId = parseInt(Math.random() * potionsStageLength);
         sortPotion = potionsStage[sortPotionId];
         console.log(sortPotionId);
      }
   });

   const potionRecipe = potions.filter((element) => {
      if (element.name === sortPotion) {
         return true;
      }
   })

   return {name: potionRecipe[0].name, icon:potionRecipe[0].icon, recipe: potionRecipe[0].recipe};
}

function randomSort(_items) {
   const numero = _items.length;
   return parseInt(Math.random() * numero);
}



//função que recebe o nome do usuário e altera o banco de dados se ele passar de fase e verifica a pontuação máxima dele
//retorna os dados:  (name), (points), (stage) e (highscore) do usuário
function upStage(_userid) {
   const userId = _userid;
   const database = [...users];
   let userUp = {};
   database.forEach((element, index) => {
      if (element.id === userId) {
         element.points += 50 * element.stage + element.points;
         element.stage += 1;

         if (element.points > element.highscore) {
            element.highscore = element.points;
         }

         userUp = { name: element.name, points: element.points, stage: element.stage, highscore: element.highscore }
      }
   });
   fs.writeFileSync("database.json", JSON.stringify([...database]));

   return userUp
}

module.exports = {
   /* sortComponentsAleatory, */
   randomSort,
   upStage,
   getStage,
   getItem,
   /* randomPotion,
   randomStock, */
   sortPotion,
   getBook
};
