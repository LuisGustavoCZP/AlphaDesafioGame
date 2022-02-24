const User = require(`${__dirname}/user`);
const Database = require(`${__dirname}/database2`);
const jwt = require('jsonwebtoken');

const recipesecret = "R4kunN4-m4Tat4";

function CreateRecipe (req, res) 
{
    const user = User.Get(req.userid);
    const recipe = Database.RandomItems(user.stage, user.stock);
    user.recipe = recipe;
    res.json({recipe:Database.GetItem(...recipe)});
}

function SortItem (req, res) 
{
    const user = User.Get(req.userid);
    const lastRecipe = user.recipe? user.recipe : [];
    console.log(lastRecipe);
    const exclude = lastRecipe ? [lastRecipe[lastRecipe.length-1]] : [];
    const recipe = Database.RandomItems(1, user.stock, exclude);
    lastRecipe.push(...recipe);
    user.recipe = recipe;

    res.json({recipe:Database.GetItem(...lastRecipe)});
}

function SortStock (req, res) 
{
    const user = User.Get(req.userid);
    const stock = Database.RandomStock(9);
    user.stock = stock;
    const resp = {"stock":Database.GetItem(...stock)};
    
    res.json(resp);
}

function CheckRecipe (recipe, itens) 
{
    for (let i = 0; i < Math.min(recipe.length, itens.length); i++)
    {
        if(itens[i] != recipe[i]) return false;
    }
    return true;
}

function VerifyRecipe (req, res)
{
    const user = User.Get(req.userid);
    const response = req.body;
    console.log(response, user.recipe);
    if(CheckRecipe(user.recipe, response))
    {
        user.points += 300;
        user.stage++;
        if(user.points > user.highscore) 
        {
            user.highscore = user.points;
        }
        User.SaveUsers();
        res.json({name:user.name, stage:user.stage, lives:user.lives, points:user.points, highscore:user.highscore});
    } 
    else if(user.lives >= 0)
    {
        user.lives--;
        
        User.SaveUsers();
        res.json(1);
    } 
    else if(user.lives == 0)
    {
        res.json(2);
    }
    
}

function ClearRecipe (req, res)
{
    const token = jwt.sign({recipe:[]}, cryptokey); //, {expiresIn:"0"}
    res.cookie("recipeData", token);
}

// ranking() retorna as melhores pontuações como um objeto {classification: , name: , score: } 
function ranking(req, res){

   function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
   }
   const theBest = Number(req.params.top);
   
   if(isNumber(theBest)){

      if(Number.isInteger(theBest)){
         const ordened = User.users.sort((a,b) => b.highscore - a.highscore);
         const topRanking = ordened.map(function (element , index){
            if(index < theBest){
               return {classification: index+1 , name: element.name , highscore: element.highscore}
            }
         
         })
         topRanking.splice(theBest, topRanking.length - theBest);
         res.json(topRanking);
      }else{
         res.json("The router params is not a intenger");
      }
      
   }else{
      res.json("The router params is not a number");
   }
   
}

module.exports =
{
    ClearRecipe,
    CreateRecipe,
    VerifyRecipe,
    SortItem,
    SortStock,
    ranking
};