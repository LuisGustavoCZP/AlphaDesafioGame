const fs = require('fs');
const path = __dirname.replace("scripts", "data/");

//const stages = JSON.parse(fs.readFileSync(path + "stages.json"));
//const recipes = JSON.parse(fs.readFileSync(path + "recipes.json"));
const items = JSON.parse(fs.readFileSync(path + "ingredients.json"));
const potions = JSON.parse(fs.readFileSync(path + "potions.json"));

//potions retorna um array onde cada posição dele contém as poções referentes à um nível 
//Ex: potions[0] = dados das poções do nível 1
// potions[1] = dados das poções do nível 2
// por enquanto só são necessários 3 banco de dados (potions, ingredients, users)


function randomSort(_items) {
   const numero = _items.length;
   return parseInt(Math.random() * numero);
}

// sortPotions retorna um array com um objeto da poção sorteada no formato:
/* [{
  components: [0, 4, 3],
  icon: "resources/ingredients/Potion (1).png",
  potionName: "Poção do Sono"
}] */
function sortPotions(_stage) {
   if (_stage >= potions.length) return [];
   const num_potions = 1;
   const total_pots = [...potions[_stage]];
   const sorted_pots = [];
   for (let j = 0; j < num_potions; j++) {
      const potionID = RandomSort(total_pots);
      sorted_pots.push(total_pots[potionID]);
      total_pots.splice(potionID, 1);
   }
   return sorted_pots;
}


// serach components retorna um array com as informações dos ingredientes no formato:
/* [{
   icon: "resources/ingredients/passionfruit.png",
   name: "Maracujá"
 }, {
   icon: "resources/ingredients/spiderweb.png",
   name: "Teia de Aranha"
 }] */
function searchComponents(potion) {
   const potionSelected = potion[0];
   const componentsId = potionSelected.components;
   const components = componentsId.map(function (element, index){
      return items[element]
   });

  

   return components;
}

module.exports = { searchComponents, randomSort, sortPotions};