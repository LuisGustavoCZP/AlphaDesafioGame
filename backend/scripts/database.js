const fs = require('fs');

const stages = JSON.parse(fs.readFileSync("./data/stages.json"));
const itens = JSON.parse(fs.readFileSync("./data/ingredients.json"));
const potions = JSON.parse(fs.readFileSync("./data/potions.json"));
const recipes = JSON.parse(fs.readFileSync("./data/recipes.json"));

function RandomSort (_items)
{
    const numero = _items.length;
    return parseInt(Math.random() * numero);
}

function SortPotions (_stage)
{
    if(_stage >= stages.length) return [];
    const stage = stages[_stage];
    const total_pots = [...stage.potions];
    const sorted_pots = [];
    for(let j = 0; j < stage.quanty; j++)
    {
        const _potionID = RandomSort(total_pots);
        sorted_pots.push(potions[_potionID]);
        total_pots.splice(_potionID, 1);
    }
    return sorted_pots;
}

function SortStage(_stage)
{
    const stage = stages[_stage];
    const _itens = [...itens];
    const pots = [];
    const slots = [];

    for(let i = 0; i < _max; i++)
    {
        const id = RandomSort(_itens);
        slots.push(id);
        _itens.splice(id, 1);
    }

    slots.sort((a,b) => {return (Math.random()*2)-1;});

    return {"potion":"", "itens":slots};
}

module.exports = {itens, RandomSort, SortPotions, SortStage};