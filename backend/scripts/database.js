const fs = require('fs');

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