//Função que sorteia um elemento num array
function randomSort(array) 
{
    return parseInt(Math.random() * array.length);
}

function randomOf(array) 
{
    return array[parseInt(Math.random() * array.length)];
}

function randomKey(obj) 
{
    const keys = Object.keys(obj);
    return keys[parseInt(Math.random() * keys.length)];
}

// Funcao que cria um array randomico com base no array passado e length (tamanho maximo)
function randomizeArray (array, length=array.length)
{
    const narray = [...array].sort((a, b) => {return Math.random() >= .5? 1 : -1;});
    const newArray = [];
    //console.log(narray);
    for(let i = 0; i < Math.min(length, narray.length); i++)
    {
        //newArray.push(narray[i]);
        newArray.push(i);
    }
    console.log(newArray);
    return newArray;
}

function contains (array, item)
{
    let find = false;
    array.forEach(element => 
    {
        if(element == item) {
            //console.log(element, item);
            find = true;
            return;
        }
    });
    return find;
}

function randomSort2(_items) {
    const numero = _items.length;
    return parseInt(Math.random() * numero);
}


// como funciona essa classe
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

module.exports = {randomSort, randomKey, randomizeArray, contains, randomOf, Dictionary};