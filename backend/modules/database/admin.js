const fs = require('fs');

const path = __dirname + "/data/";
const itens = JSON.parse(fs.readFileSync(path + "ingredients.json"));

function execute (req, res)
{
    if(req.ip == "127.0.0.1" || req.ip == ".1") {
        res.end();
    } 
    else 
    {
        res.json(itens);
    }
}

module.exports = {execute};