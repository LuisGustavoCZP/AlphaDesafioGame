const player = require(`${__dirname}/users/player.js`);
const database = require(`${__dirname}/database/database.js`);
const utility = require(`${__dirname}/utility`);
const users = player.users;
const path = __dirname.replace("modules", "");
const fs = require('fs');

function getStock (user)
{
    const t = database.fromID(...user.unlockedItems);
    //console.log(t);
    return t;
}

function getBook (user)
{
    const total = database.fromID(...user.unlockedRecipes);
    console.log(total);
    return total;
}

function getRecipe (recipeID)
{
    const ps = getItem(recipeID);
    const is = [];
    ps.ingredients.forEach(i => {
        const r = getItem(i);
        is.push({item:r.name, icon:r.icon});
    });
    const itm = getItem(ps.item);
    return {item:{"name":itm.name, "icon":itm.icon}, "ingredients":is};
}

function book (req, res)
{
    const p = users[req.session.userid];
    res.json(getBook(p));
}

function stock (req, res)
{
    const p = users[req.session.userid];
    res.json(getStock(p));
}

//insere um novo item na receita caso ele ainda não tenha sido descoberto
function verifyUnlockedRecipes(user, recipe){
   let isUnlocked = false;
   const p = user;
   const recipeArray = database.recipeArray;

   /* const recipeId = recipeArray.filter((element)=>{
      if(element.id === recipe.id){
         return true;
      }
   }) */

   let recipesOnBook = getBook(p);
   if(!recipesOnBook) recipesOnBook = [];
   if(!recipesOnBook.length) recipesOnBook = [recipesOnBook];
   const checkItem = recipesOnBook.filter((element)=>{
      if(element.id === recipe.id){
         return true;
      }
   })
   console.log("ola");
   console.log(checkItem);

   if(JSON.stringify(checkItem) === "[]"){
      p.unlockedRecipes.push(recipe.id);
      p.unlockedItems.push(recipe.item);
      isUnlocked = true;

   }

   //verificar o status está sempre retornado como false
   //falta reescrever o arquivo do usuário corretamente
   player.save(p.id);
   return isUnlocked;
}

function verifyRecipe(req, res){
   const receivedItems = req.body["items"];
   const p = users[req.session.userid]
   const receivedItemsLength = receivedItems.length;
   
   //verifica se está recebendo o array no formato correto
   if(typeof(receivedItems) === "object" && receivedItemsLength === 2){
      console.log("feito");
      const craft = database.result(receivedItems);
      
      
      // verifica se o craft existe
      if(craft)
      {
         const crafted = craft.id;
         const craftedItem = craft.item;
        console.log(crafted + "feito");
         /* const itemsArray = JSON.parse(fs.readFileSync(`${__dirname}/database/data/ingredients.json`));
         const infoCrafted = itemsArray.filter((element)=>{
            if(element === crafted){
               return true;
            }
         }) */
         const infoCrafted = database.getItem(craftedItem);
         const result = {
            result: infoCrafted,
            status: verifyUnlockedRecipes(p, craft) ? 1 : 0
         };
         console.log(result)
         res.json(result);
      }else{
         const result = {
            status: 0
         }
         res.json(result)
      }
      
   }else{
        /* res.status(404); */
      res.json(undefined);
   }
}

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

   let recipeIconsRow = [];
   let recipeIcons = [];
   for (let i = 0; i < recipes.length; i++) {
      const quant = recipes[i].length;
      for (let j = 0; j < quant; j++) {
         items.forEach((element) => {
            if (element.id === recipes[i][j]) {
               recipeIconsRow.push(element.icon);
            }
         });
      }
      recipeIcons.push(recipeIconsRow);
      recipeIconsRow = [];
   }

   potionsAndRecipes.forEach((element, index) => {
      element.recipe = recipeIcons[index];
   })

   console.log(potionsAndRecipes);
   return potionsAndRecipes;

}

//
module.exports = {
    player,
    database,
    book,
    stock,
    verifyRecipe,
  /*   stagePrepare,
    stageStart,
    stageUpdate */
}