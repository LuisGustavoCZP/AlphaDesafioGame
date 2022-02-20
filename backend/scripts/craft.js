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
    const set = [];
    
    delete total[recipe.item];

    recipe.components.forEach(itemID => {
        set.push(items[itemID]);
        delete total[itemID];
    });
    
    for(let i = 0; i < (max-min); i++)
    {
        let empty = Object.keys(total).length == 0;
        if(empty) break;

        let item;
        while (item == undefined){
            let itemID = Utility.randomKey(total);
            item = total[itemID];
        }
        set.push(item);
        delete total[item.id];
    }
    return set.sort((a, b) => {return Math.random() >= .5? 1 : -1;});
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