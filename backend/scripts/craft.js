const fs = require('fs');
const Utility = require(`${__dirname}/utility`);
const User = require(`${__dirname}/user`);

const path = __dirname.replace("scripts", "");

const stages = JSON.parse(fs.readFileSync(path + "data2/stages.json"));

const ingredients = {};
const recipes = {};
/* const items = {}; */
const results = {};

function addStage(user)
{
    const stage = {stage:user.stages.length, highscore:0, finished:false};
    user.stages.push(stage);
    return stage;
}

function resolveID (id)
{
    const cat = id.slice(0, 1);
    const index = id.slice(1);
    return {cat, index};
}

function getItem (id)
{
    const r = resolveID(id);
    const item = ingredients[r.cat][r.index];
    return item;
}

function addItem (item)
{
    const id = resolveID(item.id);
    if(!ingredients[id.cat]) ingredients[id.cat] = {};
    ingredients[id.cat][id.index] = item;
    return id;
}

initiate ();
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

function getStages (user)
{
    const last = user.stages.length - 1;
    const lastStage = user.stages[last];
    const currentStage = lastStage && !lastStage.complete ? lastStage : addStage(user);
    //const userStage = stages[lastStage.stage];
    //console.log(lastStage, currentStage);
    const s = [];
    user.stages.forEach(userStage => 
    {
        const stage = stages[userStage.stage];
        const stageD = {stage:stage.stage, potions:[], highscore:user.stages[stage.stage].highscore};
        stage.potions.forEach(recipeID => {
            const recipe = getItem(recipeID);
            const potion = getItem(recipe.item);
            stageD.potions.push({"name":potion.name, "icon":potion.icon})
        });
        s.push(stageD);
    });
    return s;
}

function getStock (user)
{
    const t = [];
    for(let key in ingredients.i)
    {
        t.push(ingredients.i[key]);
    }
    return t;
}

function getBook (user)
{
    const total = [];
    user.stages.forEach(userStage => 
    {
        const stage = stages[userStage.stage];
        stage.potions.forEach(recipeID => 
        {
            const recipe = getItem(recipeID);
            const npotion = getItem(recipe.item);
            const nrecipe = {"item":{"name":npotion.name, "icon":npotion.icon}, "ingredients":[]};
            recipe.ingredients.forEach(ingredientID => {
                const item = getItem(ingredientID);
                const nitem = {"name":item.name, "icon":item.icon};
                nrecipe.ingredients.push(nitem);
            });
            
            total.push(nrecipe);
        });
    });
    return total;
}

function randomPotion (user)
{
    const recipeID = Utility.randomSort(stages[user.stage].recipes);
    const recipe = {potion:getItem(recipeID), ...recipes[recipeID]};
    return recipe;
}

function result (itens)
{
    return results[itens];
}

function book (req, res)
{
    const p = User.get(req.userid);
    res.json(getBook(p));
}

function stock (req, res)
{
    const p = User.get(req.userid);
    res.json(getStock(p));
}

function userstages (req, res)
{
    const p = User.get(req.userid);
    res.json(getStages(p));
}

function craft (req, res)
{
    /* const p = User.get(req.userid);
    res.json(getStages(p)); */
}

//
module.exports = {
    getItem,
    randomPotion,
    result,
    book,
    stock,
    userstages,
    craft
}