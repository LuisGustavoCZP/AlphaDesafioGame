const fs = require('fs');
const Utility = require(`${__dirname}/utility`);
const path = __dirname.replace("scripts", "data/");

const stages = JSON.parse(fs.readFileSync(path + "stages.json"));
const recipes = JSON.parse(fs.readFileSync(path + "recipes.json"));
const items = {};
const results = {};

Initiate ();
function Initiate (){
    const ings = JSON.parse(fs.readFileSync(path + "ingredients2.json"));
    ings.forEach((item) => {
        //items[`${item.id}`] = item;
        items[item.id] = item;
    });

    recipes.forEach((recipe, i) => {
        results[recipe.components] = recipe.item;
    });
}

function GetRecipe (user)
{
    const recipeID = Utility.randomSort(stages[user.stage].recipes);
    const recipe = {id:recipeID, ...recipes[recipeID]};
    return recipe;
}

function GetIngredients (user, recipe)
{
    const total = {...items};//[...];
    const max = Math.min(stages[user.stage].shelf), min = recipe.components.length;
    const array = [];
    
    delete total[recipe.item];

    recipe.components.forEach(itemID => {
        array.push(items[itemID]);
        delete total[itemID];
    });
    
    set.push(RandomItems(max-min, set));

    return Utility.randomizeArray(array);
}

function Result (itens)
{
    return results[itens];
}
//
module.exports = {
    stages,
    recipes,
    items,
    GetRecipe,
    GetIngredients,
    Result,
}