const player = require(`${__dirname}/player`);
const database = require(`${__dirname}/database`);
const utility = require(`${__dirname}/utility`);
const users = player.users;
const path = __dirname.replace("scripts", "");

function getStock (user)
{
    const t = [];
    
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

async function stagePrepare (req, res)
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
}

//
module.exports = {
    book,
    stock,
    stagePrepare,
    stageStart,
    stageUpdate
}