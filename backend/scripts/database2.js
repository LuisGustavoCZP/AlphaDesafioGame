const fs = require('fs');

const Utility = require(`${__dirname}/utility`);
const path = __dirname.replace("scripts", "data/");

const stages = JSON.parse(fs.readFileSync(path + "stages.json"));
//const recipes = JSON.parse(fs.readFileSync(path + "recipes.json"));
const items = JSON.parse(fs.readFileSync(path + "ingredients.json"));

function GetStage (id)
{
    return stages[id];
}

function GetItem (...ids)
{
    return ids.map((id) => {return items[id]});
}

function RandomItems (count, excludes = [])
{
    const array = [];
    let lastID = -1;
    for(let i = 0; i < count; i++)
    {
        let itemID = -1;

        while (itemID == -1 || lastID == itemID || Utility.Contains(excludes, itemID)){
            itemID = Utility.randomSort(items);
        }

        lastID = itemID;
        array.push(itemID);
    }
    return array;
}

//
module.exports = {
    GetStage,
    GetItem,
    RandomItems
}