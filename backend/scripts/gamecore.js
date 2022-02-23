const User = require(`${__dirname}/user`);
const Database = require(`${__dirname}/database2`);
const Craft = require(`${__dirname}/craft`);
const jwt = require('jsonwebtoken');

const recipesecret = "R4kunN4-m4Tat4";

function Start (req, res) 
{
    const user = User.Get(req.userid);
    const recipe = Craft.GetRecipe(user);
    //console.log(recipe, Craft.items);
    const itens = Craft.GetIngredients(user, recipe);
    const recipeItem = Craft.items[recipe.item];
    //console.log(recipe, Craft.items);
    //Database.items[int]
    res.json({recipe:{name:recipeItem.name, icon:recipeItem.icon, components:recipe.components}, itens:itens});
}

function End (req, res) 
{
    const user = User.Get(req.userid);
    const itens = req.body;
    //Database.items 
    
    res.json({userid:req.userid});
}

function CreateRecipe (req, res) 
{
    const user = User.Get(req.userid);
    const stage = Database.GetStage(user.stage);
    const recipe = Database.RandomItems(stage.max, user.stock);
    user.recipe = recipe;
    /* const token = jwt.sign({recipe:recipe}, recipesecret, {expiresIn:"1d"});
    res.cookie("recipeData", token); */

    res.json({recipe:Database.GetItem(...recipe)});
}

function SortItem (req, res) 
{
    const user = User.Get(req.userid);
    const stage = Database.GetStage(user.stage);

    const lastRecipe = user.recipe? user.recipe : [];
    console.log(lastRecipe);
    const exclude = lastRecipe ? [lastRecipe[lastRecipe.length-1]] : [];
    const recipe = Database.RandomItems(1, user.stock, exclude);
    lastRecipe.push(...recipe);
    user.recipe = recipe;
    /* const token = jwt.sign({recipe:lastRecipe}, recipesecret, {expiresIn:"1d"});
    res.cookie("recipeData", token); */

    res.json({recipe:Database.GetItem(...lastRecipe)});
}

function SortStock (req, res) 
{
    const user = User.Get(req.userid);
    const stage = Database.GetStage(user.stage);

    const stock = Database.RandomStock(stage.max);
    user.stock = stock;
    //console.log(stock);
    //const token = jwt.sign({stock}, recipesecret, {expiresIn:"1d"});
    //res.cookie("stockData", token);
    const resp = {"stock":stock};
    res.json(resp);
}

function VerifyRecipe (req, res, next)
{
    const token = req.cookies["recipeData"];
    //console.log(token);
    if(!token) {
        next();
        return;
    }
    jwt.verify(token, recipesecret, (err, decoded) => 
    {   //console.log(`${req.ip} : ${users[decoded.userid].name} foi autenticado!`);
        req.recipe = decoded.recipe;
        next();
    });
}

function ClearRecipe (req, res)
{
    const token = jwt.sign({recipe:[]}, cryptokey, {expiresIn:"0"});
    res.cookie("recipeData", token);
}

// ranking() retorna as melhores pontuações como um objeto {classification: , name: , score: } 
function ranking(req, res){
   const theBest = 5;
   const ordened = User.users.sort((a,b) => b.highscore - a.highscore);
   const topRanking = ordened.map(function (element , index){
      if(index < theBest){
         return {classification: index+1 , name: element.name , highscore: element.highscore}
      }
      
   })
 	topRanking.splice(theBest, topRanking.length - theBest);
   res.json(topRanking);
}

module.exports =
{
    Start,
    End,
    ClearRecipe,
    CreateRecipe,
    VerifyRecipe,
    SortItem,
    SortStock,
    ranking
};