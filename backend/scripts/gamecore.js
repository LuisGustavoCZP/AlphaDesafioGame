const User = require(`${__dirname}/user`);
const Database = require(`${__dirname}/database`);
const Craft = require(`${__dirname}/craft`);
const cryptokey = "R4kunN4-m4Tat4";

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

/* function RequestStage (req, res) 
{
    const user = {user:req.body["user"], pass:req.body["pass"]};
    const id = CheckUser(user);
    //console.log(id);
    if(id == -1) {
        console.log(`${req.ip} : ${user.user} não existe!`);
        res.send("1");
        return;
    }
    if(id == -2) {
        console.log(`${req.ip} : ${user.user} digitou a senha errada!`);
        res.send("2");
        return;
    }
    CreateSession(id, res);
    
    console.log(`${req.ip} : ${user.user} realizou login.`);
    res.send("0");
} */

module.exports =
{
    Start,
    End
};