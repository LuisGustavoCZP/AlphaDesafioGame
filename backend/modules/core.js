const player = require(`${__dirname}/users/player.js`);
const database = require(`${__dirname}/database/database.js`);
const utility = require(`${__dirname}/utility`);
const users = player.users;
const path = __dirname.replace("modules", "");
const fs = require('fs');

function getStock (user)
{
    const t = database.fromID(...user.unlockedItens);
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
function combine (req, res)
{
    const p = users[req.session.userid];
    //req.session.metch?req.session.metch.check
    const itens = req.body["items"];
    const crafted = database.result(itens);
    
    const result = 
    {
        result:crafted,
        status:0
    };
    console.log(result);
    res.json(result);
}

//insere um novo item na receita caso ele ainda não tenha sido descoberto
function verifyUnlockedRecipes(user, item){
    let isUnlocked = false;
   const p = user;
   const recipeArray = JSON.parse(fs.readFileSync(`${__dirname}/database/data/recipes.json`));
   const recipeId = recipeArray.filter((element)=>{
      if(element.item === item){
         return true;
      }
   })
   let recipesOnBook = getBook(p);
   if(!recipesOnBook) recipesOnBook = [];
   if(!recipesOnBook.length) recipesOnBook = [recipesOnBook];
   const checkItem = recipesOnBook.filter((element)=>{
      if(element === recipeId.id){
         return true;
      }
   })
   if(checkItem == []){
      p.unlockedRecipes.push(item);
      p.unlockedItems.push(recipeId.item);
      isUnlocked = true;
   }
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
      const crafted = database.result(receivedItems);
      
      // verifica se o craft existe
      if(crafted)
      {
        console.log(crafted + "feito");
         /* const itemsArray = JSON.parse(fs.readFileSync(`${__dirname}/database/data/ingredients.json`));
         const infoCrafted = itemsArray.filter((element)=>{
            if(element === crafted){
               return true;
            }
         }) */
         const infoCrafted = database.getItem(crafted);
         const result = {
            result: infoCrafted,
            status: verifyUnlockedRecipes(p, crafted) ? 1 : 0
         };
         
         console.log(result)
         res.json(result);
      }
      
   }else{
        /* res.status(404); */
      res.json(undefined);
   }
}

/* async function stagePrepare (req, res)
{
    const user = users[req.session.userid];
    const stageid = req.query["stage"];
    const oStage = stages[stageid];
    const tempStage = 
    {
        stage:stageid,
        potion:oStage.potions[utility.randomSort(oStage.potions)],
        limitTime: oStage.time*1000,
    };
    user.currentStage = tempStage;

    const newStage = {...tempStage};
    newStage.potion = getRecipe(tempStage.potion);

    console.log(tempStage);
    res.json(newStage);
}

async function stageStart (req, res)
{
    const user = users[req.session.userid];
    const time = new Date().getTime();
    const cstage = user.currentStage;
    
    cstage.expiration = time + cstage.limitTime;

    res.json(cstage.expiration);
}

async function stageUpdate (req, res)
{
    const user = users[req.session.userid];
    const stage = user.currentStage;
    const time = new Date().getTime();
    const expectedResult = getItem(stage.potion).item;

    const timePass = stage.expiration - time;
    //console.log(timePass, `${time} - ${stage.limitTime}`);

    if(timePass <= 0) {
        res.json({status:1});
        return;
    }
    const r = result(req.body["items"]);
    //console.log(timePass, `${expectedResult} == ${r}`);
    if(!r) res.json({status:0});
    else 
    {
        const ritem = getItem(r);
        if(expectedResult == r) {
            st = 2;
            const points = nextStage(user, timePass);
            res.json({potion:{name:ritem.name, icon:ritem.icon}, points:points, status:2});
        } else {
            res.json({potion:{name:ritem.name, icon:ritem.icon}, status:0});
        }
        
    }
} */

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