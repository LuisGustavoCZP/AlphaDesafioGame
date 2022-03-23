const fs = require('fs');

const path = __dirname + "/data/";

let recipeArray = {};
let itemArray = {};
const ingredients = {};
/* {
    i:{
        0:item1,
        2:item2
    }
}; */

/* const recipes = {}; */ ["i0", "i1"]
const results = {};

function resolveID (id)
{
    const cat = id.slice(0, 1);
    const index = id.slice(1);
    return {cat, index};
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
    itemArray = JSON.parse(fs.readFileSync(path + "ingredients.json"));
    itemArray.forEach((item) => 
    {
        addItem(item);
    });
    //console.log(ingredients);

    recipeArray = JSON.parse(fs.readFileSync(path + "recipes.json"));
    recipeArray.forEach((recipe, i) => 
    {
        addItem(recipe);
        results[recipe.ingredients] = recipe;
        results[recipe.ingredients.reverse()] = recipe;
    });
    //console.log(ingredients);
}

/**
 * 
 * @param  {...Item} items 
 * @returns {Item[]}
 */
function itemInfo (...items)
{
    const infos = [];
    items.forEach(item => {
        if(item.id[0] == "r")
        {
            const info = {"item": getItem(item.item, true), "ingredients": getItem(item.ingredients, true)};
            infos.push(info);
        } 
        else 
        {
            const info = Object.assign({}, item);
            delete info.id;
            infos.push(info);
        }
    });
    if(items.length > 1) return infos;
    else return infos[0];
}

function getItem (id, info=false)
{
    const r = resolveID(id);
    const item = ingredients[r.cat][r.index];
    return info? itemInfo(item) : item;
}

/**
 * Exemple (p0, i5, c10...)
 * @param  {...String} ids 
 * @returns {Item[]}
 */
function fromID (...ids)
{
    const infos = [];
    //console.log(ids);
    ids.forEach(id => 
    {
        const r = resolveID(id);
        const item = ingredients[r.cat][r.index];
        infos.push(item);
    });
    if(ids && ids.length == 1) return infos[0];
    return infos;
}

function itemsOf (info=false)
{
    const itens = [];
    const t = ingredients[type];
    if(!t) return itens;

    for(let key in t)
    {
        const item = t[key];
        //console.log(item);
        itens.push(itemInfo(item));
    }
    return itens;
}

function allItems (type = "ip", info=false)
{
    const itens = [];
    for(let key in ingredients)
    {
        itens.push(itemsOf(key, info));
    }
}
/**
 * 
 * @param {Item[]} itens 
 * @returns {Item}
 */
function result (itens)
{
    return results[itens];
}

initiate ();

module.exports = {
    resolveID,
    fromID,
    getItem,
    itemsOf,
    allItems,
    itemInfo,
    result,
    recipeArray,
    itemArray
}