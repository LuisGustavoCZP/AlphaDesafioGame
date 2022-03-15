const fs = require('fs');
const Utility = require(`${__dirname}/utility`);
//const User = require(`${__dirname}/user`);
const player = require(`${__dirname}/player`);
const users = player.users;
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
    const currentStage = lastStage && !lastStage.finished || (last+1 >= stages.length) ? lastStage : addStage(user);
    //const userStage = stages[lastStage.stage];
    //console.log(lastStage, currentStage);
    const s = [];
    user.stages.forEach(userStage => 
    {
        const stage = stages[userStage.stage];
        const stageD = {stage:stage.stage, potions:[], highscore:user.stages[stage.stage].highscore};
        stage.potions.forEach(recipeID => 
        {
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

function nextStage(user, timePass)
{
    const currentStageID = user.currentStage.stage;
    const userStage = user.stages[currentStageID];
    const gstage = stages[currentStageID];
    userStage.finished = true;
    const nscore = timePass * (gstage.time / gstage.points);
    console.log(`O score de ${user.name} foi ${nscore} na fase ${currentStageID+1}`);
    if(nscore > userStage.highscore)
    {
        user.points += nscore - userStage.highscore;
        userStage.highscore = nscore;
        if(nscore > user.highscore)
        {
            user.highscore = nscore;
            player.addRank(user);
        }
    }

    console.log(userStage);
    player.save(user.id);
}

function result (itens)
{
    return results[itens];
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

function userstages (req, res)
{
    const user = users[req.session.userid];
    res.json(getStages(user));
}

async function stageStart (req, res)
{
    const user = users[req.session.userid];
    const stageid = req.query["stage"];
    const oStage = stages[stageid];
    const time = new Date().getTime();
    const tempStage = 
    {
        stage:stageid,
        potion:oStage.potions[Utility.randomSort(oStage.potions)],
        limitTime: (time + (oStage.time*1000)),
    };
    user.currentStage = tempStage;

    const newStage = {...tempStage};
    newStage.potion = getRecipe(tempStage.potion);

    console.log(tempStage, newStage);
    res.json(newStage);
}

async function stageUpdate (req, res)
{
    const user = users[req.session.userid];
    const stage = user.currentStage;
    const time = new Date().getTime();
    const expectedResult = getItem(stage.potion).item;

    const timePass = stage.limitTime - time;
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
        let st = 0;
        if(expectedResult == r) {
            st = 2;
            nextStage(user, timePass);
        }
        const ritem = getItem(r);
        res.json({result:{name:ritem.name, icon:ritem.icon}, status:st});
    }
}

//
module.exports = {
    getItem,
    result,
    book,
    stock,
    userstages,
    stageStart,
    stageUpdate
}