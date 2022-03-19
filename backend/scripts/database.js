const fs = require('fs');
const path = __dirname.replace("scripts", "");

const ingredients = {};
/* const recipes = {}; */
const results = {};

function resolveID (id)
{
    const cat = id.slice(0, 1);
    const index = id.slice(1);
    return {cat, index};
}

function itemInfo (item)
{
    if(item.id[0] == "r")
    {
        const info = {"item": getItem(item.item, true), "ingredients": getItem(item.ingredients, true)};
        return info;
    } 
    else 
    {
        const info = Object.assign({}, item);
        delete info.id;
        return info;
    }
}

function getItem (id, info=false)
{
    const r = resolveID(id);
    const item = ingredients[r.cat][r.index];
    return info? itemInfo(item) : item;
}

function getItems (type, info=false)
{
    const itens = [];
    const t = ingredients[type];
    if(!t) return itens;

    for(let key in t)
    {
        const item = t[key];
        itens.push(info? itemInfo(item) : item);
    }
    return itens;
}

function getAllItems (info=false)
{
    const itens = [];
    for(let key in ingredients)
    {
        itens.push(getItems(key, info));
    }
}

function addItem (item)
{
    const id = resolveID(item.id);
    if(!ingredients[id.cat]) ingredients[id.cat] = {};
    ingredients[id.cat][id.index] = item;
    return id;
}

function initiate ()
{
    const itemArray = JSON.parse(fs.readFileSync(path + "data2/ingredients.json"));
    itemArray.forEach((item) => 
    {
        addItem(item);
    });
    //console.log(ingredients);

    const recipeArray = JSON.parse(fs.readFileSync(path + "data2/recipes.json"));
    recipeArray.forEach((recipe, i) => 
    {
        addItem(recipe);
        results[recipe.ingredients] = recipe.item;
    });
    //console.log(ingredients);
}

function result (itens)
{
    return results[itens];
}

initiate ();

module.exports = {
    resolveID,
    getItem,
    getItems,
    getAllItems,
    itemInfo,
    result,
}