//Função que sorteia um elemento num array
function randomSort(array) 
{
    return parseInt(Math.random() * array.length);
}

function randomKey(obj) 
{
    const keys = Object.keys(obj);
    return keys[parseInt(Math.random() * keys.length)];
}

function randomSort2(_items) {
    const numero = _items.length;
    return parseInt(Math.random() * numero);
}

class Dictionary {
    constructor(...array)
    {
        this.pairs = {};
        this.length = 0;
        array.forEach(value => {
            this.pairs[value.id] = element;
            this.length++;
        });
    }

    forEach (callback)
    {
        for(let key in this.pairs)
        {
            callback(this.pairs[key]);
        }
    }

    Get (key)
    {
        return pairs[id];
    }

    Set (key, value)
    {
        this.pairs[key] = value;
    }

    Del (key)
    {
        if(!this.pairs[item.id]) return false;
        delete this.pairs[item.id];
        return true;
    }
}

module.exports = {randomSort, randomKey, Dictionary};