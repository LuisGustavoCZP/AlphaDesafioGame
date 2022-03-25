const fs = require('fs');

const path = __dirname + "/data/";
const itens = JSON.parse(fs.readFileSync(path + "ingredients.json"));
const recipes = JSON.parse(fs.readFileSync(path + "recipes.json"));

function getData (req, res)
{
    /* if(req.ip != "127.0.0.1" && req.ip != ".1") {
        res.end();
    } 
    else 
    {} */
    res.json({"items":itens, "recipes":recipes});
}

module.exports = {getData};