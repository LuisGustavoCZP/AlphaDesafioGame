var pontuacao = 0;

const baseitens = 
[
    {"name": "Maracujá", "icon": `resources/ingredients/passionfruit.png`},
    {"name": "Abóbora", "icon": `resources/ingredients/pumpkin1.png`},
    {"name": "Alface", "icon": `resources/ingredients/salad-leaves.png`},
    {"name": "Tomate", "icon": `resources/ingredients/sliced-tomato.png`},
    {"name": "Teia de Aranha", "icon": `resources/ingredients/spiderweb.png`},
];

const crafts = 
[
    {"name": "Poção do Sono", "icon": `resources/ingredients/Potion (1).png`, needs:[0, 4, 3]},
    {"name": "Poção do Sumiço", "icon": `resources/ingredients/Potion (2).png`, needs:[1, 2, 3]},
    {"name": "Poção do Amor", "icon": `resources/ingredients/Potion (3).png`, needs:[0, 3, 4]},
];

function RandomSort (_items)
{
    const numero = _items.length - 1;
    return parseInt(Math.random() * numero);
}

function SortItems(_id, _max, _items)
{
    const exclude = [];
    const slots = [];
    _crafts[_id].needs.forEach(id => 
    {
        slots.push(id);
        _items.splice(id, 1);
    });

    for(let i = 0; i < _max; i++)
    {
        
        const id = RandomSort(_items);
        slots.push(id);
        _items.splice(id, 1);
    }
    return slots.sort((a,b)=>{return (Math.random()*2)-1;});
}

