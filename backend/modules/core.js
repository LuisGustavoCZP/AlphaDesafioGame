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
    //console.log(total);
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

// função que retorna o livro para o usuário
function book (req, res)
{
   const p = users[req.session.userid];
   const unlockedRecipes = getBook(p);
   const itemsArray = database.itemArray
   const recipeArray = database.recipeArray;
   console.log(unlockedRecipes)
   

    // relaciona as tabelas dos itens do livro com os itens totais
  const resultForBook = [];
  
  unlockedRecipes.forEach((element)=>{
     itemsArray.forEach((el)=>{
        
        if(element.item === el.id){
           let rcpArr = element.ingredients;
           rcpArr = forItemArray(rcpArr);
           
           //resultForBook.push({name: el.name, icon: el.icon, desc: el.desc, recipe:rcpArr});

           resultForBook.push({item:{name: el.name, icon: el.icon, desc: el.desc}, ingredients: rcpArr})
         }
      })
      
   })
   res.json({resultBook: resultForBook, totalRecipes: recipeArray.length});
}

function forItemArray(array){
   const itemsArray = database.itemArray
   const dataIngredients = [];
   array.forEach((item)=>{
      itemsArray.forEach((el)=>{
         if(el.id === item){
            dataIngredients.push({name: el.name, icon: el.icon, desc: el.desc})
         }
      })
    })
    return dataIngredients;
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
   
   console.log("received = " + receivedItems);

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

         res.json(result);
      }else{
         const result = {
            status: 0
         }
         res.json(result)
      }
      
   }else{
        /* res.status(404); */
      res.json({status:0});
   }
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